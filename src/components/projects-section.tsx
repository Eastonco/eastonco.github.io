'use client';

import { motion } from 'framer-motion';
import { Section, Container, AnimatedContainer, GradientText } from './ui/layout';
import { AnimatedOrb } from './ui/animated-backgrounds';
import { typography, colors } from '../lib/design-system';

// Projects data structure
interface Project {
  id: string;
  title: string;
  description: string;
  link?: string;
  tags: string[];
  featured?: boolean;
  comingSoon?: boolean;
}

const projects: Project[] = [
  {
    id: "red-button",
    title: "The Big Red Button",
    description: "Basically cookie clicker with friends",
    link: "/red-button",
    tags: ["Supabase", "Next.js"],
    featured: true
  },
  {
    id: "dumpster-dive",
    title: "Dumpster Dive",
    description: "A place to dump your thoughts (and maybe find some others)",
    link: "/dumpster-dive",
    tags: [],
    comingSoon: false
  },
  {
    id: "project-3", 
    title: "Idk I'm out of ideas",
    description: "check back later i guess",
    tags: [],
    comingSoon: true
  }
];

export default function ProjectsSection() {
  const featuredProject = projects.find(p => p.featured);
  const normal = projects.filter(p => !p.featured && !p.comingSoon);
  const upcomingProjects = projects.filter(p => p.comingSoon);
  
  return (
    <Section size="medium">
      {/* Projects-specific subtle accent */}
      <AnimatedOrb
        size="small"
        position={{ right: '25%', top: '33%' }}
        colors="from-[#ec4899]/15 to-[#4f46e5]/15"
        opacity={0.1}
        duration={8}
      />
      
      <Container>
        <AnimatedContainer variant="fadeInUp">
          <GradientText 
            as="h2" 
            className={`mb-12 text-center md:text-left ${typography.heading.h2}`}
            gradient="from-[#0ea5e9] to-[#ec4899]"
          >
            Projects
          </GradientText>

          <AnimatedContainer variant="scaleIn" delay={0.2}>
            {/* Featured Project */}
            {featuredProject && (
              <motion.div 
                className={`flex min-h-[300px] flex-col md:flex-row items-center justify-between rounded-xl p-8 mb-8 ${colors.backgrounds.card}`}
                whileHover={{ 
                  boxShadow: "0 25px 50px -12px rgba(79, 70, 229, 0.15)"
                }}
                animate={{ boxShadow: "0 0 0 0 rgba(79, 70, 229, 0)" }}
                onClick={() => featuredProject.link && window.open(featuredProject.link, '_blank')}
                style={{ cursor: featuredProject.link ? 'pointer' : 'default' }}
              >
                <div className="flex-1 text-center md:text-left mb-6 md:mb-0">
                  <motion.div
                    className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-gradient-to-br from-[#4f46e5] to-[#8b5cf6] text-white mx-auto md:mx-0"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                    </svg>
                  </motion.div>
                  
                  <h3 className={`${typography.heading.h3} text-white mb-3`}>
                    {featuredProject.title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {featuredProject.description}
                  </p>
                  {featuredProject.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      {featuredProject.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-3 py-1 text-xs bg-gradient-to-r from-[#4f46e5]/20 to-[#8b5cf6]/20 text-[#a78bfa] rounded-full border border-[#4f46e5]/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                
              </motion.div>
            )}


            {/* Projects Grid */}
            {(normal.length > 0 || upcomingProjects.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Normal Projects */}
                {normal.map((project) => (
                  <motion.div
                    key={project.id}
                    className={`flex min-h-[250px] flex-col rounded-xl p-6 ${colors.backgrounds.card}`}
                    initial={{ boxShadow: "0 0 0 0 rgba(79, 70, 229, 0)" }}
                    whileHover={{ 
                      boxShadow: "0 25px 50px -12px rgba(79, 70, 229, 0.15)"
                    }}
                    transition={{ duration: 0.2 }}
                    onClick={() => project.link && window.open(project.link, '_blank')}
                    style={{ cursor: project.link ? 'pointer' : 'default' }}
                  >
                    <motion.div
                      className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white"
                      whileHover={{ 
                        rotate: [0, -10, 10, -10, 0],
                        scale: 1.1 
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                      </svg>
                    </motion.div>
                    
                    <h3 className={`${typography.heading.h4} text-white mb-3`}>
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-4 flex-1">
                      {project.description}
                    </p>
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="px-3 py-1 text-xs bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 rounded-full border border-blue-600/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Coming Soon Projects */}
                {upcomingProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    className={`flex min-h-[250px] flex-col items-center justify-center rounded-xl p-6 ${colors.backgrounds.card}`}
                    initial={{ boxShadow: "0 0 0 0 rgba(79, 70, 229, 0)" }}
                    whileHover={{ 
                      boxShadow: "0 25px 50px -12px rgba(79, 70, 229, 0.1)"
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-600 to-gray-700 text-white"
                      whileHover={{ 
                        rotate: [0, -10, 10, -10, 0],
                        scale: 1.1 
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </motion.div>
                    
                    <h3 className={`${typography.heading.h4} text-gray-400 mb-2 text-center`}>
                      {project.title}
                    </h3>
                    <span className="text-sm text-gray-500 bg-gray-800/50 px-3 py-1 rounded-full">
                      {project.description}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatedContainer>
        </AnimatedContainer>
      </Container>
    </Section>
  );
}
