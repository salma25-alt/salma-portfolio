import { motion } from 'framer-motion';
import { Briefcase, Calendar, Globe, CheckCircle2 } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import { usePortfolio } from '../../context/PortfolioContext';

export default function ExperienceSection() {
  const { experience } = usePortfolio();

  return (
    <section
      id="experience"
      className="py-20 sm:py-24 border-t border-[#1F2433]/60 bg-[#0D1017]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="06 // Experience"
          title="Practical Learning & Internship Experience"
          subtitle="Hands-on virtual internship experience researching real-world problems and prototyping solutions."
        />

        <div className="max-w-4xl space-y-6">
          {experience.map((exp, idx) => (
            <motion.div
              key={exp._id || exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="card-surface card-surface-hover p-6 sm:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-[#1F2433]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-xs text-violet-400">
                      {exp.type}
                    </span>
                    <h3 className="mt-1 text-xl font-semibold text-slate-100">
                      {exp.role}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-slate-300">
                      {exp.organization}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2 font-mono text-xs text-slate-400">
                  {exp.duration && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B0D12] border border-[#1F2433]">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{exp.duration}</span>
                    </span>
                  )}
                  {exp.mode && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B0D12] border border-[#1F2433]">
                      <Globe className="w-3.5 h-3.5 text-violet-400" />
                      <span>{exp.mode}</span>
                    </span>
                  )}
                </div>
              </div>

              <ul className="mt-5 space-y-3">
                {(exp.points || []).map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2.5 text-sm sm:text-base text-slate-300 leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
