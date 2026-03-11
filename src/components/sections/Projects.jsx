import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { projects } from '../../assets/data/projects';
import { fadeInUp, staggerContainer } from '../animations/motionVariants';
import { getPodiumColor } from '../../utils/helpers';

/**
 * Projects Section - Grand Prix Races
 */
const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-f1-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Section Title */}
          <motion.h2
            className="section-title mb-4"
            variants={fadeInUp}
          >
            GRAND PRIX SHOWCASE
          </motion.h2>
          
          <motion.p
            className="text-gray-400 mb-16 max-w-2xl"
            variants={fadeInUp}
          >
            Championship-winning projects crossing the finish line
          </motion.p>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col">
                  {/* Podium Position Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <div 
                      className="px-3 py-1 rounded font-bold text-sm"
                      style={{ 
                        backgroundColor: getPodiumColor(project.position),
                        color: '#000'
                      }}
                    >
                      P{project.position}
                    </div>
                    <div className="text-sm text-f1-red font-mono">
                      {project.lapTime}
                    </div>
                  </div>

                  {/* Project Image Placeholder */}
                  <div className="aspect-video bg-f1-gray rounded mb-4 flex items-center justify-center text-4xl">
                    🏁
                  </div>

                  {/* Project Info */}
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4 flex-grow">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-f1-gray border border-f1-red/30 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    <Button 
                      variant="secondary" 
                      size="sm"
                      icon={FiGithub}
                      className="flex-1"
                      as="a"
                      href={project.github}
                      target="_blank"
                    >
                      Code
                    </Button>
                    <Button 
                      variant="primary" 
                      size="sm"
                      icon={FiExternalLink}
                      className="flex-1"
                      as="a"
                      href={project.live}
                      target="_blank"
                    >
                      Live
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* View All Projects CTA */}
          <motion.div
            className="text-center mt-12"
            variants={fadeInUp}
          >
            <Button variant="secondary" size="lg">
              View All Projects →
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
