-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  thumbnail_url TEXT,
  tags TEXT[] DEFAULT '{}',
  category TEXT NOT NULL DEFAULT 'UI/UX',
  project_type TEXT NOT NULL DEFAULT 'Web',
  external_link TEXT,
  case_study_link TEXT,
  thinking_process TEXT,
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blogs table
CREATE TABLE public.blogs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT,
  cover_image_url TEXT,
  category TEXT NOT NULL DEFAULT 'Design',
  publish_date DATE NOT NULL DEFAULT CURRENT_DATE,
  read_time_minutes INTEGER DEFAULT 5,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact_messages table for form submissions
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Public read access for published projects
CREATE POLICY "Anyone can view published projects" 
ON public.projects 
FOR SELECT 
USING (is_published = true);

-- Public read access for published blogs
CREATE POLICY "Anyone can view published blogs" 
ON public.blogs 
FOR SELECT 
USING (is_published = true);

-- Anyone can submit contact messages
CREATE POLICY "Anyone can submit contact messages" 
ON public.contact_messages 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blogs_updated_at
BEFORE UPDATE ON public.blogs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample projects
INSERT INTO public.projects (title, description, tags, category, project_type, thinking_process, display_order) VALUES
('HealthSync Dashboard', 'A comprehensive health management platform that helps users track their wellness journey through intuitive data visualization and personalized insights.', ARRAY['UX Research', 'UI Design', 'Design System', 'Figma'], 'Product Design', 'Healthcare', 'The challenge was making complex health data accessible. I focused on progressive disclosure—showing essential metrics first, with deeper insights available on demand. This reduced cognitive load while maintaining depth.', 1),
('FinFlow Mobile App', 'A mobile banking experience that simplifies financial management for young professionals, featuring smart budgeting tools and seamless transaction flows.', ARRAY['Mobile Design', 'User Research', 'Prototyping', 'React Native'], 'UI/UX Design', 'Fintech', 'Users felt overwhelmed by traditional banking apps. I prioritized the 3-tap principle—any common action should be completable in three taps or less. This dramatically improved task completion rates.', 2),
('EduLearn Platform', 'An interactive learning platform connecting students with mentors, featuring real-time collaboration tools and progress tracking.', ARRAY['React', 'TypeScript', 'Node.js', 'PostgreSQL'], 'Full Stack', 'EdTech', 'Learning is personal. I designed flexible learning paths that adapt to individual pace while maintaining engagement through gamification elements without being distracting.', 3),
('ShopEase E-commerce', 'A modern e-commerce platform with seamless checkout experience, product recommendations, and inventory management system.', ARRAY['Next.js', 'Stripe', 'Tailwind CSS', 'Supabase'], 'Web Development', 'E-commerce', 'Cart abandonment was the biggest challenge. I streamlined the checkout to just 3 steps and added trust signals at each stage, resulting in a 25% improvement in conversion.', 4);

-- Insert sample blogs
INSERT INTO public.blogs (title, summary, content, category, publish_date, read_time_minutes) VALUES
('The Psychology of Color in UI Design', 'How color choices influence user behavior and create emotional connections in digital products.', 'Full article content here...', 'Design', '2025-01-10', 5),
('Building Accessible Design Systems', 'A practical guide to creating inclusive component libraries that work for everyone.', 'Full article content here...', 'Development', '2025-01-05', 8),
('From Figma to Code: Bridging the Gap', 'How designers and developers can collaborate more effectively for better products.', 'Full article content here...', 'Workflow', '2024-12-28', 6),
('User Research on a Budget', 'Practical techniques for gathering meaningful user insights without breaking the bank.', 'Full article content here...', 'Research', '2024-12-20', 7);