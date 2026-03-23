import { motion } from 'framer-motion';
import Card from '../ui/Card';
import { fadeInUp, staggerContainer } from '../animations/motionVariants';

const certifications = [
  {
    id: 1,
    title: 'Cloud Computing',
    organization: 'NPTEL ONLINE CERTIFICATION',
    date: 'Oct 2025',
    file: 'cert1.pdf',
  },
  {
    id: 2,
    title: 'Build Generative Al Apps and Solutions with No-Code Tools',
    organization: 'Infosys Springboard ',
    date: 'Aug 2025',
    file: 'cert2.pdf',
  },
  {
    id: 3,
    title: 'ChatGPT-4 Prompt Engineering: ChatGPT, Generative Al & LLM',
    organization: 'Infosys Springboard',
    date: 'Aug 2025',
    file: 'cert3.pdf',
  },
  {
    id: 4,
    title: 'Computational Theory: Language Principle & Finite Automata Theory',
    organization: 'Infosys Springboard',
    date: 'Aug 2025',
    file: 'cert4.pdf',
  },
];

/**
 * Certifications Section - Trophy Cabinet
 */
const Certifications = () => {
  return (
    <section
      id="certifications"
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
            CERTIFICATIONS
          </motion.h2>

          <motion.p
            className="text-gray-400 mb-16 max-w-2xl"
            variants={fadeInUp}
          >
            Professional certifications and credentials demonstrating expertise
          </motion.p>

          {/* Certifications Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={fadeInUp}
          >
            {certifications.map((cert, index) => (
              <Card key={cert.id} className="h-full flex flex-col">
                {/* Header */}
                <div className="mb-4 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-f1-black/70 border border-f1-silver/30 text-[10px] font-semibold uppercase tracking-wide text-f1-red">
                      {cert.organization}
                    </span>
                    {cert.date && (
                      <span className="text-[11px] text-gray-400 font-mono whitespace-nowrap">
                        {cert.date}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base md:text-lg font-semibold leading-snug text-white">
                    {cert.title}
                  </h3>
                </div>

                {/* Header / Preview Divider */}
                <div className="h-px w-full bg-f1-silver/20 mb-4" />

                {/* PDF Preview */}
                <div className="mb-4">
                  <div className="relative w-full h-40 bg-f1-black/60 border border-f1-silver/30 rounded-md overflow-hidden">
                    <object
                      data={`/certificates/${cert.file}#toolbar=0&navpanes=0&scrollbar=0`}
                      type="application/pdf"
                      className="w-full h-full"
                    >
                      <div className="flex items-center justify-center w-full h-full text-xs text-gray-400">
                        PDF preview not available
                      </div>
                    </object>
                  </div>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Actions */}
                <div className="mt-4">
                  <a
                    href={`/certificates/${cert.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center px-4 py-2 bg-f1-red text-white text-sm font-semibold uppercase tracking-wide hover:bg-red-700 transition-all"
                  >
                    View Certificate
                  </a>
                </div>
              </Card>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
