import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { fadeInUp, staggerContainer } from '../animations/motionVariants';
import { SOCIAL_LINKS } from '../../utils/constants';

/**
 * Contact Section - Pit Wall Communication
 */
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: false });

    try {
      // EmailJS parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      };

      // Debug: Check if env variables are loaded
      console.log('Service ID:', import.meta.env.VITE_EMAILJS_SERVICE_ID);
      console.log('Template ID:', import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
      console.log('Public Key:', import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      console.log('EmailJS Success:', result);
      setStatus({ loading: false, success: true, error: false });
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus({ loading: false, success: false, error: false });
      }, 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      console.error('Error Text:', error.text);
      console.error('Error Status:', error.status);
      setStatus({ loading: false, success: false, error: true });
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setStatus({ loading: false, success: false, error: false });
      }, 5000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-f1-black/60 backdrop-blur-md relative overflow-hidden">
      {/* Background */}
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
            PIT WALL RADIO
          </motion.h2>
          
          <motion.p
            className="text-gray-400 mb-16 max-w-2xl"
            variants={fadeInUp}
          >
            Box box! Let's discuss your next project
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div variants={fadeInUp}>
              <div className="space-y-6">
                <Card>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-f1-red/20 border border-f1-red rounded-full flex items-center justify-center">
                      <FiMail className="text-f1-red text-xl" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Email</div>
                      <a href={`mailto:${SOCIAL_LINKS.email}`} className="hover:text-f1-red transition-colors">
                        {SOCIAL_LINKS.email}
                      </a>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-f1-red/20 border border-f1-red rounded-full flex items-center justify-center">
                      <FiMapPin className="text-f1-red text-xl" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Location</div>
                      <div>Remote / Global</div>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-f1-red/20 border border-f1-red rounded-full flex items-center justify-center">
                      <FiPhone className="text-f1-red text-xl" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Response Time</div>
                      <div>Within 24 Hours</div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Fun Racing Quote */}
              <motion.div
                className="mt-8 p-6 border-l-4 border-f1-red bg-f1-gray/30"
                whileHover={{ x: 10 }}
              >
                <p className="text-lg italic mb-2">
                  "If everything seems under control, you're not going fast enough."
                </p>
                <p className="text-sm text-gray-400">- Mario Andretti</p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={fadeInUp}>
              <Card>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Driver Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-f1-black border-2 border-f1-silver/20 rounded focus:border-f1-red focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Radio Frequency (Email)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-f1-black border-2 border-f1-silver/20 rounded focus:border-f1-red focus:outline-none transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Strategy Briefing
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-f1-black border-2 border-f1-silver/20 rounded focus:border-f1-red focus:outline-none transition-colors resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={status.loading}
                  >
                    {status.loading ? 'Sending... 📡' : 'Send Message 📡'}
                  </Button>

                  {/* Status Messages */}
                  {status.success && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-green-500/20 border border-green-500 rounded text-green-500 text-center"
                    >
                      ✅ Message sent successfully! I'll get back to you soon.
                    </motion.div>
                  )}

                  {status.error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-500/20 border border-red-500 rounded text-red-500 text-center"
                    >
                      ❌ Failed to send message. Please try again or email me directly.
                    </motion.div>
                  )}
                </form>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
