import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import { fadeInUp, staggerContainer } from '../animations/motionVariants';

/**
 * About Section - Driver Profile
 */
const About = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);

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
            {/* Project Preview */}
            <motion.div
              className="relative"
              variants={fadeInUp}
            >
              <div className="aspect-square bg-f1-black rounded-lg overflow-hidden border-4 border-f1-red shadow-2xl">
                <div className="w-full h-full relative">
                  <iframe
                    src="https://freaky-travellers.vercel.app"
                    title="FreakyTravellers Project"
                    className="absolute inset-0 w-full h-full"
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    onLoad={() => setIframeLoaded(true)}
                  />
                  {/* Loading overlay */}
                  {!iframeLoaded && (
                    <motion.div 
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center bg-f1-black pointer-events-none"
                    >
                      <div className="text-center">
                        <div className="text-6xl mb-4 animate-bounce">🏎️</div>
                        <p className="text-gray-400">Loading FreakyTravellers...</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-32 h-32 border-4 border-f1-red -z-10" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border-4 border-f1-silver -z-10" />
            </motion.div>

            {/* Content */}
            <motion.div variants={fadeInUp}>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Building the <span className="text-f1-red">Future</span> One Line at a Time
              </h3>
              
              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  I'm a passionate full-stack developer with a love for creating meaningful web applications.
                  Like an F1 driver learning the track, I'm constantly pushing myself to master new technologies 
                  and improve my craft with every project.
                </p>
                
                <p className="text-lg leading-relaxed">
                  Currently focused on the MERN stack, I've built FreakyTravellers—a full-stack travel platform
                  that showcases my ability to turn ideas into reality. From frontend animations to backend APIs,
                  I enjoy every aspect of bringing a project from concept to deployment.
                </p>
                
                <p className="text-lg leading-relaxed">
                  When I'm not coding, you'll find me exploring new frameworks, contributing to open source,
                  or planning my next big project. I believe in learning by doing and growing through challenges.
                </p>
              </div>

              {/* Driver Stats */}
              <div className="grid grid-cols-2 gap-6 mt-8">
                <Card className="text-center">
                  <div className="text-3xl font-bold text-f1-red mb-2">💻</div>
                  <div className="text-2xl font-bold">1</div>
                  <div className="text-sm text-gray-400">Major Project Deployed</div>
                </Card>
                
                <Card className="text-center">
                  <div className="text-3xl font-bold text-f1-red mb-2">⚡</div>
                  <div className="text-2xl font-bold">10+</div>
                  <div className="text-sm text-gray-400">Technologies Learned</div>
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
