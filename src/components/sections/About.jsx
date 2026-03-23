import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import { fadeInUp, staggerContainer } from '../animations/motionVariants';

/**
 * About Section - Professional Overview
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
            ABOUT ME
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
                Crafting <span className="text-f1-red">Excellence</span> Through Code
              </h3>
              
              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  I'm a full-stack developer passionate about building robust, scalable web applications.
                  With a strong foundation in modern technologies, I continuously pursue excellence and innovation
                  in every project I undertake.
                </p>
                
                <p className="text-lg leading-relaxed">
                  Currently proficient in the MERN stack, I've developed FreakyTravellers—a comprehensive travel platform
                  that demonstrates my capability to deliver end-to-end solutions. From responsive user interfaces to reliable backend systems,
                  I take pride in every phase of the development lifecycle.
                </p>
                
                <p className="text-lg leading-relaxed">
                  Beyond coding, I'm committed to continuous learning, exploring emerging technologies, and contributing to meaningful projects.
                  I believe in solving problems systematically and delivering solutions that make a real impact.
                </p>
              </div>

              {/* Professional Stats */}
              <div className="grid grid-cols-2 gap-6 mt-8">
                <Card className="text-center">
                  <div className="text-3xl font-bold text-f1-red mb-2">💻</div>
                  <div className="text-2xl font-bold">1</div>
                  <div className="text-sm text-gray-400">Full-Stack Project Deployed</div>
                </Card>
                
                <Card className="text-center">
                  <div className="text-3xl font-bold text-f1-red mb-2">⚡</div>
                  <div className="text-2xl font-bold">10+</div>
                  <div className="text-sm text-gray-400">Technologies Mastered</div>
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
