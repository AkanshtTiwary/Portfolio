import { motion } from 'framer-motion';
import Card from '../ui/Card';
import { fadeInUp, staggerContainer } from '../animations/motionVariants';

/**
 * About Section - Driver Profile
 */
const About = () => {
  return (
    <section id="about" className="py-20 bg-f1-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Section Title */}
          <motion.h2
            className="section-title mb-16"
            variants={fadeInUp}
          >
            DRIVER PROFILE
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <motion.div
              className="relative"
              variants={fadeInUp}
            >
              <div className="aspect-square bg-gradient-to-br from-f1-black via-f1-gray to-f1-black rounded-lg overflow-hidden border-4 border-f1-red/30">
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  🏎️
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-32 h-32 border-4 border-f1-red -z-10" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border-4 border-f1-silver -z-10" />
            </motion.div>

            {/* Content */}
            <motion.div variants={fadeInUp}>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Driving <span className="text-f1-red">Innovation</span> at Top Speed
              </h3>
              
              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  Just like an F1 driver pushes their car to the limit, I push code to perfection. 
                  With championship-level dedication and pole position skills, I craft digital 
                  experiences that leave the competition in the dust.
                </p>
                
                <p className="text-lg leading-relaxed">
                  Every project is a new Grand Prix—carefully strategized, flawlessly executed, 
                  and optimized for maximum performance. From the formation lap to the checkered flag, 
                  I bring precision engineering to every line of code.
                </p>
                
                <p className="text-lg leading-relaxed">
                  When I'm not racing through sprints, you'll find me fine-tuning my tech stack, 
                  analyzing performance metrics, or mentoring the next generation of developers 
                  in the paddock.
                </p>
              </div>

              {/* Driver Stats */}
              <div className="grid grid-cols-2 gap-6 mt-8">
                <Card className="text-center">
                  <div className="text-3xl font-bold text-f1-red mb-2">🏆</div>
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm text-gray-400">Championships Won</div>
                </Card>
                
                <Card className="text-center">
                  <div className="text-3xl font-bold text-f1-red mb-2">⚡</div>
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-sm text-gray-400">Client Satisfaction</div>
                </Card>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
