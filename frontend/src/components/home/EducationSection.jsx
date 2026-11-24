import { motion } from 'framer-motion';
import { GraduationCap, MapPin } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import { usePortfolio } from '../../context/PortfolioContext';

export default function EducationSection() {
  const { education } = usePortfolio();

  return (
    <section
      id="education"
      className="py-20 sm:py-24 border-t border-[#1F2433]/60 bg-[#0D1017]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="04 // Education"
          title="Academic Background"
          subtitle="Undergraduate computer applications training building core software engineering foundations."
        />

        <div className="max-w-3xl space-y-5">
          {education.map((edu, idx) => (
            <motion.div
              key={edu._id || edu.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              whileHover={{ x: 4 }}
              className="card-surface card-surface-hover p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-100">
                    {edu.degree}
                  </h3>
                  <p className="mt-1 text-base text-slate-300 font-medium">
                    {edu.institution}
                  </p>
                  <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-mono text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{edu.location}</span>
                  </p>
                </div>
              </div>

              <span className="self-start sm:self-center px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 font-mono text-xs text-cyan-300">
                {edu.statusLabel}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
