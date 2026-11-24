import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  FolderGit2,
  ExternalLink,
  Clock,
  Eye,
  X,
  CheckCircle2,
} from 'lucide-react';
import { GitHubIcon } from '../common/SocialIcons';
import SectionHeader from '../common/SectionHeader';
import { usePortfolio } from '../../context/PortfolioContext';

export default function ProjectsSection() {
  const { projects } = usePortfolio();
  const [selectedTech, setSelectedTech] = useState('All');
  const [previewProject, setPreviewProject] = useState(null);

  const allTechs = [
    'All',
    ...new Set(projects.flatMap((p) => p.technologies || [])),
  ];

  const filteredProjects =
    selectedTech === 'All'
      ? projects
      : projects.filter((p) => (p.technologies || []).includes(selectedTech));

  return (
    <section id="projects" className="py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="03 // Featured Projects"
          title="Projects I've Built & Am Building"
          subtitle="Filter by technology or open a quick preview to inspect confirmed features."
        />

        {/* Interactive Technology Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-8">
          {allTechs.map((tech) => {
            const active = selectedTech === tech;
            return (
              <button
                key={tech}
                type="button"
                onClick={() => setSelectedTech(tech)}
                className={`relative px-3.5 py-1.5 rounded-xl font-mono text-xs transition-colors ${
                  active
                    ? 'text-white'
                    : 'bg-[#12151E] border border-[#1F2433] text-slate-400 hover:text-slate-200'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="activeProjectTech"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-xl bg-brand-gradient -z-0"
                  />
                )}
                <span className="relative z-10">{tech}</span>
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.article
                layout
                key={project._id || project.id || project.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                whileHover={project.isPlaceholder ? {} : { y: -6 }}
                className={`group card-surface flex flex-col justify-between overflow-hidden ${
                  project.isPlaceholder
                    ? 'border-dashed border-slate-700/80 bg-[#10131B]'
                    : 'card-surface-hover'
                }`}
              >
                <div>
                  {project.screenshotUrl ? (
                    <div className="overflow-hidden border-b border-[#1F2433] relative">
                      <img
                        src={project.screenshotUrl}
                        alt={`${project.title} preview`}
                        loading="lazy"
                        className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="h-44 px-6 bg-gradient-to-br from-[#151926] via-[#12151E] to-[#0E1118] border-b border-[#1F2433] flex flex-col items-center justify-center text-center">
                      <div className="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-2.5 transition-transform duration-300 group-hover:scale-110">
                        {project.isPlaceholder ? (
                          <Clock className="w-5 h-5 text-cyan-400" />
                        ) : (
                          <FolderGit2 className="w-5 h-5" />
                        )}
                      </div>
                      <span className="font-mono text-xs text-slate-400">
                        {project.statusLabel}
                      </span>
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-slate-100 group-hover:text-violet-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-slate-400 leading-relaxed">
                      {project.shortDescription}
                    </p>

                    {project.technologies && project.technologies.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg bg-[#0B0D12] border border-[#1F2433] font-mono text-xs text-cyan-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-[#1F2433] bg-[#0E1118]/60 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setPreviewProject(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                    <span className="text-slate-700">|</span>
                    <Link
                      to={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-mono text-violet-400 hover:text-violet-300 transition-colors"
                    >
                      <span>Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} GitHub repository`}
                        className="p-2 rounded-lg bg-[#12151E] border border-[#1F2433] text-slate-400 hover:text-white hover:border-violet-500/40 transition-colors"
                      >
                        <GitHubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} Live Demo`}
                        className="p-2 rounded-lg bg-[#12151E] border border-[#1F2433] text-slate-400 hover:text-white hover:border-cyan-500/40 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Interactive Quick Preview Modal */}
      <AnimatePresence>
        {previewProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewProject(null)}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl rounded-2xl bg-[#12151E] border border-[#1F2433] shadow-2xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-[#1F2433] flex items-center justify-between">
                <span className="font-mono text-xs text-cyan-400">
                  {previewProject.statusLabel}
                </span>
                <button
                  type="button"
                  onClick={() => setPreviewProject(null)}
                  aria-label="Close modal"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#181C28]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
                {previewProject.screenshotUrl && (
                  <img
                    src={previewProject.screenshotUrl}
                    alt={`${previewProject.title} screenshot`}
                    className="w-full h-48 object-cover rounded-xl border border-[#1F2433]"
                  />
                )}

                <div>
                  <h3 className="text-2xl font-bold text-slate-100">
                    {previewProject.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-slate-300 leading-relaxed">
                    {previewProject.fullDescription}
                  </p>
                </div>

                {previewProject.technologies && previewProject.technologies.length > 0 && (
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {previewProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-[#0B0D12] border border-[#1F2433] font-mono text-xs text-cyan-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {previewProject.features && previewProject.features.length > 0 && (
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                      Confirmed Features
                    </h4>
                    <ul className="space-y-2">
                      {previewProject.features.map((feat, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-slate-200"
                        >
                          <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-4 border-t border-[#1F2433] flex flex-wrap items-center justify-between gap-3">
                  <Link
                    to={`/projects/${previewProject.slug}`}
                    onClick={() => setPreviewProject(null)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-400 hover:text-violet-300"
                  >
                    <span>Open Full Project Page</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>

                  <div className="flex items-center gap-2.5">
                    {previewProject.githubUrl && (
                      <a
                        href={previewProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0B0D12] border border-[#1F2433] hover:border-violet-500/40 text-xs font-mono text-slate-200"
                      >
                        <GitHubIcon className="w-3.5 h-3.5 text-violet-400" />
                        <span>GitHub</span>
                      </a>
                    )}
                    {previewProject.liveDemoUrl && (
                      <a
                        href={previewProject.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-gradient text-xs font-mono text-white"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
