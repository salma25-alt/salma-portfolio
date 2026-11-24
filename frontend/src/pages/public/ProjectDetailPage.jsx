import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  FolderGit2,
  Clock,
} from 'lucide-react';
import { GitHubIcon } from '../../components/common/SocialIcons';
import { usePortfolio } from '../../context/PortfolioContext';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const { projects } = usePortfolio();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24 text-center space-y-5">
        <h1 className="text-3xl font-bold text-slate-100">Project Not Found</h1>
        <p className="text-slate-400">
          The project you are looking for does not exist or has not been published yet.
        </p>
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-gradient text-sm font-medium text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>
      </div>
    );
  }

  return (
    <article className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-sm font-mono text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>

        <div className="card-surface p-6 sm:p-10 space-y-8">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-500/30 font-mono text-xs text-violet-300">
              {project.isPlaceholder ? (
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
              ) : (
                <FolderGit2 className="w-3.5 h-3.5" />
              )}
              <span>{project.statusLabel}</span>
            </span>

            <h1 className="text-3xl sm:text-4xl font-bold text-slate-100">
              {project.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {project.screenshotUrl ? (
            <div className="overflow-hidden rounded-xl border border-[#1F2433]">
              <img
                src={project.screenshotUrl}
                alt={`${project.title} screenshot`}
                className="w-full max-h-[420px] object-cover"
              />
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-[#1F2433] bg-[#0B0D12] p-8 text-center">
              <p className="font-mono text-xs text-slate-400">
                Project screenshot preview can be uploaded via Admin Dashboard.
              </p>
            </div>
          )}

          {project.technologies && project.technologies.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-mono uppercase tracking-wider text-slate-400">
                Technologies Used
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 rounded-xl bg-[#0B0D12] border border-[#1F2433] font-mono text-xs text-cyan-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.features && project.features.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-mono uppercase tracking-wider text-slate-400">
                Key Features
              </h2>
              <ul className="space-y-2.5">
                {project.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2.5 text-sm sm:text-base text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-1" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(project.githubUrl || project.liveDemoUrl) && (
            <div className="pt-6 border-t border-[#1F2433] flex flex-wrap gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0B0D12] border border-[#1F2433] hover:border-violet-500/40 text-sm font-medium text-slate-100 transition-colors"
                >
                  <GitHubIcon className="w-4 h-4 text-violet-400" />
                  <span>View Source Code</span>
                </a>
              )}
              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-gradient text-sm font-medium text-white hover:opacity-95 transition-opacity"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Live Demo</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
