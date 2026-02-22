
-- Create site_content table for CMS-managed content
CREATE TABLE public.site_content (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key text NOT NULL UNIQUE,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Public can read all content
CREATE POLICY "Anyone can view site content"
ON public.site_content
FOR SELECT
USING (true);

-- Only admins can modify
CREATE POLICY "Admins can insert site content"
ON public.site_content
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update site content"
ON public.site_content
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete site content"
ON public.site_content
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_site_content_updated_at
BEFORE UPDATE ON public.site_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed default content
INSERT INTO public.site_content (section_key, content) VALUES
('hero', '{
  "headline": "Hey there!",
  "subheadline": "I''m thrilled to tell you a bit about myself. I have over a year of hands-on experience, specializing in UX/UI Design, Product Design, and Software Development. If you''re in need of a motivated designer who thinks like a developer, let''s connect!",
  "stats": [
    {"icon": "Briefcase", "number": "30+", "label": "Projects Completed"},
    {"icon": "Rocket", "number": "10+", "label": "Live Projects"},
    {"icon": "Users", "number": "22+", "label": "Happy Clients"}
  ]
}'::jsonb),
('about', '{
  "paragraphs": [
    "I''m Abdullah Al Jamil, a passionate UX/UI designer and software developer with over a year of hands-on experience. I specialize in creating user-centered designs that not only look beautiful but also solve real problems and deliver exceptional user experiences.",
    "My approach combines creative design thinking with technical expertise to build digital solutions that make a meaningful impact. I believe in the power of good design to transform businesses and improve lives.",
    "When I''m not designing or coding, you''ll find me exploring new design trends, contributing to open-source projects, or sharing my knowledge through writing and mentoring."
  ],
  "what_i_do": [
    {"title": "Product Design", "description": "End-to-end product design from research and ideation to high-fidelity prototypes and design systems."},
    {"title": "UI/UX Design", "description": "Creating intuitive, accessible interfaces that delight users and achieve business goals."},
    {"title": "Web Development", "description": "Building modern, responsive web applications using React, TypeScript, and other cutting-edge technologies."},
    {"title": "Backend Development", "description": "Developing robust server-side solutions with Python, Node.js, and database management."}
  ]
}'::jsonb),
('resume', '{
  "experiences": [
    {"title": "Sr. UX/UI Designer", "company": "BDCalling IT Ltd.", "location": "Dhaka, Bangladesh", "period": "Present", "description": "Leading design initiatives for enterprise-level applications. Creating comprehensive design systems and conducting user research to improve product experiences."},
    {"title": "UX/UI Designer Intern", "company": "CPSD Technology IT", "location": "Dhaka, Bangladesh", "period": "2023 - 2024", "description": "Designed intuitive interfaces for mobile and web applications. Collaborated with development teams to implement pixel-perfect UI components."},
    {"title": "Python Django Intern", "company": "EDGE Project (BCC, ICT Division)", "location": "Dhaka, Bangladesh", "period": "2023", "description": "Developed web applications using Python Django framework. Gained hands-on experience in full-stack development and database management."}
  ],
  "education": [
    {"degree": "B.Sc. in Computer Science & Engineering", "institution": "Green University of Bangladesh", "period": "2020 - 2024", "gpa": "2.88/4.00", "description": "Focused on software engineering, human-computer interaction, and modern web technologies."},
    {"degree": "Higher Secondary Certificate (HSC)", "institution": "Gaffargaon Govt. College", "period": "2017 - 2019", "gpa": "5.00/5.00", "description": "Science group with focus on Physics, Chemistry, and Mathematics."},
    {"degree": "Secondary School Certificate (SSC)", "institution": "Rostom Ali Golundaz School", "period": "2015 - 2017", "gpa": "5.00/5.00", "description": "Science group with excellent academic performance."}
  ],
  "achievements": [
    {"title": "30+ Projects Completed", "description": "Successfully delivered various design and development projects"},
    {"title": "10+ Live Projects", "description": "Currently maintaining and supporting live applications"},
    {"title": "22+ Happy Clients", "description": "Building lasting relationships through quality work"}
  ]
}'::jsonb),
('contact', '{
  "email": "aljamil248@gmail.com",
  "phone": "+880 1580881664",
  "location": "Dhaka, Bangladesh",
  "availability": "Open for freelance projects 24/7",
  "maps_link": "https://maps.app.goo.gl/9NoaEa57XRUWAQKe9",
  "intro_text": "Have a project in mind? Let''s work together to bring your ideas to life. I''m always open to discussing new opportunities."
}'::jsonb),
('profile', '{
  "name": "Abdullah Al Jamil",
  "title": "Product Designer • UX/UI Designer • Developer",
  "social_links": [
    {"platform": "Behance", "url": "https://www.behance.net/abdullahaljamil1"},
    {"platform": "Instagram", "url": "https://www.instagram.com/al.jamil.9022?igsh=MWViYXdhNGQ3NGMzdg=="},
    {"platform": "Facebook", "url": "https://www.facebook.com/share/1AAiyinQkK/"},
    {"platform": "LinkedIn", "url": "https://www.linkedin.com/in/al-jamil-b817442a2/"}
  ]
}'::jsonb),
('skills', '{
  "core_skills": [
    {"name": "UX/UI Design", "percentage": 90, "icon": "Palette"},
    {"name": "Graphic Design", "percentage": 40, "icon": "Figma"},
    {"name": "Frontend Development", "percentage": 75, "icon": "Code2"},
    {"name": "Python", "percentage": 50, "icon": "Terminal"},
    {"name": "AI / Machine Learning", "percentage": 65, "icon": "Brain"}
  ],
  "soft_skills": [
    {"icon": "Lightbulb", "label": "Creative Thinking"},
    {"icon": "MessageCircle", "label": "Communication"},
    {"icon": "Users", "label": "Teamwork"},
    {"icon": "Search", "label": "Problem Solving"},
    {"icon": "Clock", "label": "Time Management"}
  ],
  "core_capabilities": [
    {"icon": "Palette", "title": "UI/UX Design", "description": "Crafting intuitive, accessible, and visually refined interfaces"},
    {"icon": "Code2", "title": "Development", "description": "Building robust, scalable applications with modern technologies"},
    {"icon": "Search", "title": "User Research", "description": "Understanding real user needs through research-driven insights"},
    {"icon": "Sparkles", "title": "Brand Identity", "description": "Creating cohesive, meaningful brand experiences"}
  ]
}'::jsonb);
