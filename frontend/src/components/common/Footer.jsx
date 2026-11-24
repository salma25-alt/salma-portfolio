import { Mail } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './SocialIcons';
import { profileData } from '../../data/portfolioData';

export default function Footer() {
  return (
    <footer className="border-t border-[#1F2433] bg-[#090B0F] mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="font-mono text-sm text-slate-200">
            {profileData.name} <span className="text-slate-500">•</span>{' '}
            <span className="text-slate-400">{profileData.title}</span>
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Built with React, Tailwind CSS & Node.js
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={profileData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2.5 rounded-xl bg-[#12151E] border border-[#1F2433] text-slate-400 hover:text-white hover:border-violet-500/40 transition-colors"
          >
            <GitHubIcon className="w-4 h-4" />
          </a>
          <a
            href={profileData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2.5 rounded-xl bg-[#12151E] border border-[#1F2433] text-slate-400 hover:text-white hover:border-blue-500/40 transition-colors"
          >
            <LinkedInIcon className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${profileData.email}`}
            aria-label="Send Email"
            className="p-2.5 rounded-xl bg-[#12151E] border border-[#1F2433] text-slate-400 hover:text-white hover:border-cyan-500/40 transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}