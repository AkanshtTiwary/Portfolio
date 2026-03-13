import { motion } from 'framer-motion';
import Card from '../ui/Card';
import { experience } from '../../assets/data/experience';
import { fadeInUp, staggerContainer } from '../animations/motionVariants';
import { RESUME_FILE_PATH } from '../../utils/constants';

/**
 * Experience Section - Career Laps
 */
const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-gradient-to-b from-transparent via-f1-black/40 to-transparent backdrop-blur-sm relative">
      {/* Background Elements */}
      <div className="absolute inset-0 telemetry-grid opacity-5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            CAREER TIMELINE
          </motion.h2>
          
          <motion.p
            className="text-gray-400 mb-16 max-w-2xl"
            variants={fadeInUp}
          >
            Racing through the seasons with championship teams
          </motion.p>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-f1-red/30 -translate-x-1/2 hidden md:block" />

            <div className="space-y-12">
              {experience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 ${
                    index % 2 === 0 ? '' : 'md:flex-row-reverse'
                  }`}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.2 }}
                >
                  {/* Left/Right Content */}
                  <div className={index % 2 === 0 ? 'md:text-right' : 'md:col-start-2'}>
                    <Card>
                      {/* Team Background Image */}
                      <div 
                        className="absolute inset-0 rounded-lg opacity-30 bg-cover bg-center bg-no-repeat z-0"
                        style={{
                          backgroundImage: exp.id === 1 
                            ? 'url(https://images.unsplash.com/photo-1651341050677-c5f8a5d604b8?w=800&q=80)'
                            : exp.id === 2 
                            ? 'url(https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80)'
                            : 'url(https://images.unsplash.com/photo-1701177486990-48b8b0ef7e15?w=800&q=80)',
                          filter: 'brightness(0.5) saturate(1.2)'
                        }}
                      />

                      {/* Team Color Bar */}
                      <div 
                        className="absolute top-0 left-0 w-full h-2 rounded-t-lg z-20"
                        style={{ backgroundColor: exp.color }}
                      />

                      {/* Period Badge */}
                      <div className="inline-block px-4 py-2 bg-f1-red/20 border border-f1-red rounded-full text-sm font-mono mb-4 font-bold">
                        {exp.period}
                      </div>

                      {/* Team & Role */}
                      <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">{exp.team}</h3>
                      <p className="text-xl text-f1-red mb-2 font-semibold">{exp.role}</p>
                      <p className="text-gray-400 mb-6 text-base">{exp.location}</p>

                      {/* Achievements */}
                      <div className="space-y-3 mb-6">
                        {exp.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm">
                            <span className="text-f1-red mt-1">▸</span>
                            <span className="text-gray-300">{achievement}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-f1-black/50 border border-f1-silver/20 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </Card>
                  </div>

                  {/* Center Dot */}
                  <div className="hidden md:block absolute left-1/2 top-8 -translate-x-1/2">
                    <motion.div
                      className="w-6 h-6 rounded-full border-4 border-f1-red bg-f1-black"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.3 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Download Resume CTA */}
          <motion.div
            className="text-center mt-16"
            variants={fadeInUp}
          >
            <a
              href={RESUME_FILE_PATH}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-f1-red text-white font-bold uppercase tracking-wider hover:bg-red-700 transition-all"
            >
              Download Resume / CV 📄
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
