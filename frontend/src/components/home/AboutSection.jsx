import { motion } from 'framer-motion';
import { Code2, Layers, Cpu } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import SpotlightCard from '../common/SpotlightCard';
import { usePortfolio } from '../../context/PortfolioContext';

const focusAreas = [
  {
    icon: Code2,
    title: 'Frontend Engineering',
    description:
      'Building clean, responsive interfaces with HTML, CSS, JavaScript, and React.',
    color: 'text-violet-400',
  },
  {
    icon: Layers,
    title: 'Backend & APIs',
    description:
      'Developing RESTful backend services using Node.js, Express.js, and MongoDB.',
    color: 'text-cyan-400',
  },
  {
    icon: Cpu,
    title: 'AI Integration & Problem Solving',
    description:
      'Connecting web interfaces to AI APIs like Google Gemini while practicing structured problem solving.',
    color: 'text-blue-400',
  },
];

export default function AboutSection() {
  const { profile } = usePortfolio();

  return (
    <section id="about" className="py-20 sm:py-24 border-t border-[#1F2433]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="01 // About Me"
          title="Building Practical Web Applications"
          subtitle="Focused on strong engineering fundamentals, readable code, and real-world software problem solving."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 card-surface p-6 sm:p-8 space-y-5"
          >
            {(profile.aboutParagraphs || []).map((paragraph, index) => (
              <p
                key={index}
                className="text-slate-300 leading-relaxed text-base sm:text-[17px]"
              >
                {paragraph}
              </p>
            ))}

            <div className="pt-3 border-t border-[#1F2433] flex flex-wrap gap-6 font-mono text-xs text-slate-400">
              <div>
                <span className="text-slate-500 block">University</span>
                <span className="text-slate-200">Eternal University, Baru Sahib</span>
              </div>
              <div>
                <span className="text-slate-500 block">Program</span>
                <span className="text-slate-200">Bachelor of Computer Applications (BCA)</span>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-5 space-y-4">
            {focusAreas.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <SpotlightCard className="p-5 flex items-start gap-4">
                    <div
                      className={`p-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2433] ${item.color} shrink-0`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-100">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
