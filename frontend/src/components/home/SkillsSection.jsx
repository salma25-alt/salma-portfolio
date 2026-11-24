import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, BookOpen } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import SpotlightCard from '../common/SpotlightCard';
import { usePortfolio } from '../../context/PortfolioContext';

const categoryStyles = {
  'Currently Using': {
    icon: Sparkles,
    badgeColor: 'text-cyan-400 bg-cyan-950/50 border-cyan-500/30',
    pillHover: 'hover:border-cyan-500/50 hover:text-cyan-200',
  },
  'Used in Projects': {
    icon: CheckCircle2,
    badgeColor: 'text-violet-400 bg-violet-950/50 border-violet-500/30',
    pillHover: 'hover:border-violet-500/50 hover:text-violet-200',
  },
  'Currently Learning': {
    icon: BookOpen,
    badgeColor: 'text-blue-400 bg-blue-950/50 border-blue-500/30',
    pillHover: 'hover:border-blue-500/50 hover:text-blue-200',
  },
};

export default function SkillsSection() {
  const { skills: skillsData } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState(null);

  const tabs = ['All', ...skillsData.map((g) => g.category)];

  const visibleGroups =
    selectedCategory === 'All'
      ? skillsData
      : skillsData.filter((g) => g.category === selectedCategory);

  return (
    <section
      id="skills"
      className="py-20 sm:py-24 border-t border-[#1F2433]/60 bg-[#0D1017]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="02 // Technical Skills"
          title="Technologies & Learning Focus"
          subtitle="Filter by status or click any technology chip to inspect how I apply it."
        />

        {/* Interactive Animated Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter skills by category"
          className="flex flex-wrap gap-2 mb-8"
        >
          {tabs.map((tab) => {
            const isActive = selectedCategory === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(tab)}
                className={`relative px-4 py-2 rounded-xl font-mono text-xs transition-colors ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-400 hover:text-slate-200 bg-[#12151E] border border-[#1F2433]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeSkillTab"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-xl bg-brand-gradient -z-0"
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            );
          })}
        </div>

        {/* Skill Cards Grid */}
        <motion.div
          layout
          className={`grid grid-cols-1 ${
            visibleGroups.length === 1 ? 'md:grid-cols-1 max-w-2xl' : 'md:grid-cols-3'
          } gap-6`}
        >
          <AnimatePresence mode="popLayout">
            {visibleGroups.map((group) => {
              const style =
                categoryStyles[group.category] ||
                categoryStyles['Used in Projects'];
              const Icon = style.icon;

              return (
                <motion.div
                  layout
                  key={group.category}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                >
                  <SpotlightCard className="p-6 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border ${style.badgeColor}`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {group.category}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed mb-6">
                        {group.description}
                      </p>

                      <div className="flex flex-wrap gap-2.5">
                        {group.items.map((skill) => {
                          const isSelected = selectedSkill?.name === skill;
                          return (
                            <motion.button
                              key={skill}
                              type="button"
                              onClick={() =>
                                setSelectedSkill(
                                  isSelected
                                    ? null
                                    : {
                                        name: skill,
                                        category: group.category,
                                        note: group.description,
                                      }
                                )
                              }
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.96 }}
                              transition={{
                                type: 'spring',
                                stiffness: 360,
                                damping: 20,
                              }}
                              className={`px-3.5 py-2 rounded-xl border text-sm font-medium transition-colors ${
                                isSelected
                                  ? 'bg-violet-500/20 border-violet-400 text-white shadow-sm shadow-violet-950/40'
                                  : `bg-[#0B0D12] border-[#1F2433] text-slate-200 ${style.pillHover}`
                              }`}
                            >
                              {skill}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Interactive Skill Inspector Bar */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-6 p-4 rounded-2xl bg-[#12151E] border border-violet-500/35 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="text-sm">
                <span className="font-mono font-semibold text-cyan-400">
                  {selectedSkill.name}
                </span>{' '}
                <span className="text-slate-500">•</span>{' '}
                <span className="font-mono text-xs text-violet-300">
                  {selectedSkill.category}
                </span>
                <p className="text-xs text-slate-400 mt-1">
                  {selectedSkill.note}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSkill(null)}
                className="self-start sm:self-center text-xs font-mono text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-[#0B0D12] border border-[#1F2433]"
              >
                Clear
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}