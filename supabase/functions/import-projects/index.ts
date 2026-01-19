import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import * as XLSX from 'https://esm.sh/xlsx@0.18.5'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ProjectRow {
  project_name: string;
  category: string;
  project_type: string;
  progress_status: string;
  completion_date: string;
  live_link: string;
}

interface ImportResult {
  success: boolean;
  imported: number;
  skipped: number;
  errors: string[];
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get auth token
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    // Verify user is admin
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check admin role
    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle();

    if (roleError || !roleData) {
      console.log('Admin check failed:', roleError, roleData);
      return new Response(JSON.stringify({ error: 'Admin access required' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get form data with file
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate file type
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
    ];
    if (!validTypes.includes(file.type) && !file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      return new Response(JSON.stringify({ error: 'Invalid file format. Please upload an Excel file (.xlsx or .xls)' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Read file content
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });

    // Get first sheet
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert to JSON
    const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

    console.log('Raw data rows:', rawData.length);
    console.log('First row (header):', rawData[0]);

    // Find column indices by searching header row
    const headerRow = rawData[0] || [];
    const columnMap: Record<string, number> = {};
    
    headerRow.forEach((cell: any, index: number) => {
      const cellValue = String(cell || '').toLowerCase().trim();
      if (cellValue.includes('project name') || cellValue === 'project name') {
        columnMap.project_name = index;
      } else if (cellValue === 'category') {
        columnMap.category = index;
      } else if (cellValue === 'type') {
        columnMap.type = index;
      } else if (cellValue === 'progress' || cellValue.includes('progress')) {
        columnMap.progress = index;
      } else if (cellValue === 'live link' || cellValue.includes('live link') || cellValue.includes('live_link')) {
        columnMap.live_link = index;
      } else if (cellValue === 'deadline' || cellValue.includes('deadline') || cellValue.includes('completion')) {
        columnMap.deadline = index;
      }
    });

    console.log('Column mapping:', columnMap);

    // Validate required columns exist
    if (columnMap.project_name === undefined) {
      return new Response(JSON.stringify({ 
        error: 'Missing required column: Project Name. Please ensure your Excel file has a "Project Name" column.' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get existing project titles to prevent duplicates
    const { data: existingProjects } = await supabase
      .from('projects')
      .select('title');
    
    const existingTitles = new Set(
      (existingProjects || []).map(p => p.title?.toLowerCase().trim())
    );

    // Process data rows (skip header)
    const result: ImportResult = {
      success: true,
      imported: 0,
      skipped: 0,
      errors: [],
    };

    const projectsToInsert: any[] = [];

    for (let i = 1; i < rawData.length; i++) {
      const row = rawData[i];
      if (!row || row.length === 0) continue;

      const projectName = String(row[columnMap.project_name] || '').trim();
      
      // Skip empty project names
      if (!projectName) {
        continue;
      }

      // Check for duplicates
      if (existingTitles.has(projectName.toLowerCase())) {
        result.skipped++;
        result.errors.push(`Row ${i + 1}: "${projectName}" already exists, skipped.`);
        continue;
      }

      // Extract other fields
      const category = columnMap.category !== undefined 
        ? String(row[columnMap.category] || 'General').trim() 
        : 'General';
      
      const projectType = columnMap.type !== undefined 
        ? String(row[columnMap.type] || 'Web').trim() 
        : 'Web';
      
      const progressStatus = columnMap.progress !== undefined 
        ? String(row[columnMap.progress] || 'Processing').trim() 
        : 'Processing';
      
      const liveLink = columnMap.live_link !== undefined 
        ? String(row[columnMap.live_link] || '').trim().replace(/^<|>$/g, '') 
        : '';
      
      const deadline = columnMap.deadline !== undefined 
        ? String(row[columnMap.deadline] || '').trim() 
        : '';

      projectsToInsert.push({
        title: projectName,
        description: `${category} project`,
        category: category,
        project_type: projectType,
        progress_status: progressStatus,
        live_link: liveLink || null,
        completion_date: deadline || null,
        tags: [projectType, category].filter(Boolean),
        is_published: true,
        display_order: 1000 + i, // High order so they appear at the end
      });

      // Add to existing set to prevent duplicates within same import
      existingTitles.add(projectName.toLowerCase());
    }

    console.log('Projects to insert:', projectsToInsert.length);

    // Batch insert projects
    if (projectsToInsert.length > 0) {
      const { error: insertError } = await supabase
        .from('projects')
        .insert(projectsToInsert);

      if (insertError) {
        console.error('Insert error:', insertError);
        return new Response(JSON.stringify({ 
          error: `Failed to insert projects: ${insertError.message}` 
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      result.imported = projectsToInsert.length;
    }

    console.log('Import result:', result);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Import error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'An unexpected error occurred' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
