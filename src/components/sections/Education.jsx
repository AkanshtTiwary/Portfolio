import { motion } from 'framer-motion';
import Card from '../ui/Card';
import { fadeInUp, staggerContainer } from '../animations/motionVariants';
import { education } from '../../assets/data/education';

/**
 * Education Section - Academic Background
 */
const Education = () => {
  return (
    <section
      id="education"
      className="py-20 bg-gradient-to-b from-transparent via-f1-black/40 to-transparent backdrop-blur-sm relative"
    >
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
          <motion.h2 className="section-title mb-4" variants={fadeInUp}>
            EDUCATION
          </motion.h2>

          <motion.p
            className="text-gray-400 mb-16 max-w-2xl"
            variants={fadeInUp}
          >
            Academic background and qualifications
          </motion.p>

          {/* Education Timeline */}
          <motion.div
            className="space-y-6"
            variants={fadeInUp}
          >
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 border-l-4" style={{ borderLeftColor: edu.status === 'pursuing' ? '#E10600' : '#FFD700' }}>
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="text-4xl flex-shrink-0">{edu.icon}</div>

                    {/* Content */}
                    <div className="flex-grow">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">
                            {edu.institution}
                          </h3>
                          <p className="text-f1-red font-semibold text-base">
                            {edu.degree}
                          </p>
                          <p className="text-gray-400 text-sm mt-1">
                            {edu.field}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-f1-red/20 border border-f1-red/50 text-xs font-semibold uppercase tracking-wide text-f1-red">
                            {edu.status === 'pursuing' ? '🔴 Currently Pursuing' : '✓ Completed'}
                          </span>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="h-px w-full bg-f1-silver/20 mb-4" />

                      {/* Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Score</p>
                          <p className="text-gray-200 font-semibold">{edu.score}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Location</p>
                          <p className="text-gray-200">{edu.location}</p>
                        </div>
                      </div>

                      {/* Duration */}
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Duration</p>
                        <p className="text-gray-200 font-mono">
                          {edu.startDate} - {edu.endDate}
                        </p>
                      </div>

                      {/* Highlights */}
                      <div className="space-y-2 pt-2 border-t border-f1-silver/10">
                        {edu.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-f1-red font-bold text-lg leading-none mt-0.5">
                              •
                            </span>
                            <span className="text-gray-300 text-sm">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
