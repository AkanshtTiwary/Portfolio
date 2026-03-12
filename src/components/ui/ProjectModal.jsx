import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiExternalLink, FiGithub } from 'react-icons/fi';
import { useEffect } from 'react';
import Button from './Button';

/**
 * Project Preview Modal
 */
const ProjectModal = ({ project, isOpen, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-f1-black border-4 border-f1-red z-50 rounded-lg overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-f1-gray border-b-2 border-f1-red p-4 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                <p className="text-sm text-gray-400">{project.description}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={FiGithub}
                  as="a"
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  Code
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  icon={FiExternalLink}
                  as="a"
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  Open
                </Button>
                <button
                  onClick={onClose}
                  className="ml-2 p-2 hover:bg-f1-red/20 rounded-full transition-colors"
                  aria-label="Close"
                >
                  <FiX className="text-2xl text-white" />
                </button>
              </div>
            </div>

            {/* iframe Preview */}
            <div className="flex-1 relative bg-white">
              <iframe
                src={project.live}
                title={project.title}
                className="absolute inset-0 w-full h-full"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
              
              {/* Loading indicator */}
              <div className="absolute inset-0 flex items-center justify-center bg-f1-black pointer-events-none">
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-bounce">🏎️</div>
                  <p className="text-gray-400">Loading project...</p>
                </div>
              </div>
            </div>

            {/* Footer Info */}
            <div className="bg-f1-gray border-t-2 border-f1-red p-4">
              <div className="flex flex-wrap gap-2">
                <span className="text-gray-400 text-sm">Tech Stack:</span>
                {project.tech.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-f1-black border border-f1-red/30 rounded text-xs text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 6 && (
                  <span className="text-gray-400 text-xs py-1">
                    +{project.tech.length - 6} more
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
