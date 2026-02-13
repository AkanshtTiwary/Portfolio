import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { SOCIAL_LINKS } from '../../utils/constants';

/**
 * F1-themed footer with social links
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialIcons = [
    { Icon: FiGithub, href: SOCIAL_LINKS.github, label: 'GitHub' },
    { Icon: FiLinkedin, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
    { Icon: FiMail, href: `mailto:${SOCIAL_LINKS.email}`, label: 'Email' },
  ];

  return (
    <footer className="bg-f1-black/80 backdrop-blur-md border-t-2 border-f1-red/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Branding */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-12 bg-f1-red flex items-center justify-center font-bold text-2xl">
                F1
              </div>
              <div>
                <div className="font-bold text-lg">F1 PORTFOLIO</div>
                <div className="text-xs text-gray-400">Full Throttle Developer</div>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Racing through code at championship speeds.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 text-f1-red">QUICK LINKS</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <a href="#about" className="block hover:text-white transition-colors">Driver Profile</a>
              <a href="#skills" className="block hover:text-white transition-colors">Telemetry</a>
              <a href="#projects" className="block hover:text-white transition-colors">Grand Prix</a>
              <a href="#contact" className="block hover:text-white transition-colors">Pit Wall</a>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-bold mb-4 text-f1-red">CONNECT</h3>
            <div className="flex gap-4">
              {socialIcons.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-f1-gray border border-f1-silver/20 rounded flex items-center justify-center hover:bg-f1-red hover:border-f1-red transition-all"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-f1-silver/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {currentYear} F1 Portfolio. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

        {/* Racing Stripe */}
        <div className="mt-8 h-1 bg-gradient-to-r from-transparent via-f1-red to-transparent" />
      </div>
    </footer>
  );
};

export default Footer;
