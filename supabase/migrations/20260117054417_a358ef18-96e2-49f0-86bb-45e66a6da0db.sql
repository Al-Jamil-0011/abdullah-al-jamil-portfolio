-- Add INSERT and DELETE policies for projects (admin dashboard)
CREATE POLICY "Allow public insert for projects" 
ON public.projects 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public delete for projects" 
ON public.projects 
FOR DELETE 
USING (true);

CREATE POLICY "Allow public update for projects" 
ON public.projects 
FOR UPDATE 
USING (true);

-- Add INSERT and DELETE policies for blogs (admin dashboard)
CREATE POLICY "Allow public insert for blogs" 
ON public.blogs 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public delete for blogs" 
ON public.blogs 
FOR DELETE 
USING (true);

CREATE POLICY "Allow public update for blogs" 
ON public.blogs 
FOR UPDATE 
USING (true);