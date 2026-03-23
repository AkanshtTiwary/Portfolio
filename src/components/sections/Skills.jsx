import { motion } from 'framer-motion';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import { skills } from '../../assets/data/skills';
import { fadeInUp, staggerContainer } from '../animations/motionVariants';

/**
 * Skills Section - Technical Skills Dashboard
 */
const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-transparent via-f1-black/40 to-transparent backdrop-blur-sm relative">
      {/* Background Grid */}
      <div className="absolute inset-0 telemetry-grid opacity-10" />

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
            TECHNICAL SKILLS
          </motion.h2>
          
          <motion.p
            className="text-gray-300 text-lg mb-16 max-w-2xl leading-relaxed"
            variants={fadeInUp}
          >
            Core competencies and technical expertise across modern web technologies
          </motion.p>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((category, index) => (
              <motion.div
                key={category.category}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-4xl">{category.icon}</span>
                    <h3 className="text-xl font-bold text-white">{category.category}</h3>
                  </div>

                  {/* Skills */}
                  <div className="space-y-4">
                    {category.items.map((skill) => (
                      <div key={skill.name}>
                        <ProgressBar
                          label={skill.name}
                          value={skill.level}
                          color={skill.color}
                        />
                        {/* Soft Skills Parameters */}
                        {skill.proficiency && (
                          <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                            <span>{skill.proficiency}</span>
                            <span>{skill.yearsExp} experience</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Performance Summary */}
          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={fadeInUp}
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-f1-red mb-2">15+</div>
              <div className="text-sm text-gray-400">Core Technologies</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-f1-red mb-2">500+</div>
              <div className="text-sm text-gray-400">Hours of Development</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-f1-red mb-2">100%</div>
              <div className="text-sm text-gray-400">Commitment to Quality</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-f1-red mb-2">♾️</div>
              <div className="text-sm text-gray-400">Continuous Learning</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
