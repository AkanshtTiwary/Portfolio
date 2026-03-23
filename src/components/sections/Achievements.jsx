import { motion } from 'framer-motion';
import Card from '../ui/Card';
import { fadeInUp, staggerContainer } from '../animations/motionVariants';
import { achievements } from '../../assets/data/achievements';

/**
 * Achievements Section - Notable Accomplishments
 */
const Achievements = () => {
  return (
    <section
      id="achievements"
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
            ACHIEVEMENTS
          </motion.h2>

          <motion.p
            className="text-gray-400 mb-16 max-w-2xl"
            variants={fadeInUp}
          >
            Notable accomplishments and recognitions in events and competitions
          </motion.p>

          {/* Achievements Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={fadeInUp}
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col p-6">
                  {/* Header with Icon and Category */}
                  <div className="mb-4 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="text-4xl">{achievement.icon}</div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-f1-red/20 border border-f1-red/50 text-xs font-semibold uppercase tracking-wide text-f1-red">
                        {achievement.category}
                      </span>
                    </div>
                    
                    {/* Organization and Date */}
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-f1-red font-semibold">
                        {achievement.organization}
                      </p>
                      {achievement.date && (
                        <p className="text-xs text-gray-400 mt-1">{achievement.date}</p>
                      )}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full bg-f1-silver/20 mb-4" />

                  {/* Description */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-grow">
                    {achievement.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2">
                    {achievement.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="text-f1-red font-bold text-lg leading-none mt-0.5">
                          •
                        </span>
                        <span className="text-gray-200 text-sm">{highlight}</span>
                      </div>
                    ))}
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

export default Achievements;
