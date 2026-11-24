import { motion } from 'framer-motion';
import { Code2, ExternalLink, Clock } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../common/SocialIcons';
import SectionHeader from '../common/SectionHeader';
import { profileData } from '../../data/portfolioData';

export default function CodingProfilesSection() {
  const profiles = [
    {
      name: 'GitHub',
      handle: '@salma25-alt',
      description: 'Explore my code repositories, web projects, and version history.',
      url: profileData.socials.github,
      icon: GitHubIcon,
      accent: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
    },
    {
      name: 'LinkedIn',
      handle: 'in/salma25',
      description: 'Connect with me for internships, learning updates, and developer networking.',
      url: profileData.socials.linkedin,
      icon: LinkedInIcon,
      accent: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    },
    {
      name: 'CodeChef',
      handle: profileData.socials.codechef ? 'View Profile' : 'Profile URL Pending',
      description: 'Competitive programming practice and problem-solving milestones.',
      url: profileData.socials.codechef,
      icon: Code2,
      accent: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    },
  ];

  return (
    <section id="profiles" className="py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="07 // Coding Profiles"
          title="Where to Find My Code & Profile"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {profiles.map((profile, idx) => {
            const Icon = profile.icon;
            const hasUrl = Boolean(profile.url);

            return (
              <motion.div
                key={profile.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="card-surface card-surface-hover p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl border ${profile.accent}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-slate-400">
                      {profile.handle}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-slate-100">
                    {profile.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                    {profile.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1F2433]">
                  {hasUrl ? (
                    <a
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-200 hover:text-cyan-400 transition-colors"
                    >
                      <span>Visit {profile.name}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Link editable via Admin Dashboard</span>
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}