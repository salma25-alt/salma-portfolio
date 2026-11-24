import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, MapPin, Sparkles } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../common/SocialIcons';
import SpotlightCard from '../common/SpotlightCard';
import { usePortfolio } from '../../context/PortfolioContext';

const rotatingTaglines = [
  'Full-Stack Developer',
  'React & Node.js Builder',
  'BCA Student @ Eternal University',
];

export default function HeroSection() {
  const { profile } = usePortfolio();
  const [activeTab, setActiveTab] = useState('profile');
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [resumeNotice, setResumeNotice] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % rotatingTaglines.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const handleResumeClick = (e) => {
    if (!profile.resumeUrl) {
      e.preventDefault();
      setResumeNotice(true);
      setTimeout(() => setResumeNotice(false), 3500);
    }
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-10 pb-20 sm:pt-16 sm:pb-28 border-b border-[#1F2433]/60"
    >
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.55, 0.85, 0.55], scale: [1, 1.04, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[780px] h-[380px] rounded-full bg-violet-600/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1f243324_1px,transparent_1px),linear-gradient(to_bottom,#1f243324_1px,transparent_1px)] bg-[size:44px_44px]"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12151E] border border-[#1F2433] text-xs font-mono text-slate-300 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>BCA Student • Full-Stack Web Development</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-100 leading-[1.1]">
              Hi, I&apos;m{' '}
              <span className="text-brand-gradient">{profile.name}</span>.
            </h1>

            <div className="mt-3 h-7 flex items-center justify-center lg:justify-start overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={rotatingTaglines[taglineIndex]}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="font-mono text-sm sm:text-base text-cyan-400"
                >
                  &lt;{rotatingTaglines[taglineIndex]} /&gt;
                </motion.p>
              </AnimatePresence>
            </div>

            <p className="mt-5 text-base sm:text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {profile.shortIntro}
            </p>

            {/* Primary & Secondary Gradient CTAs (Contact Me removed) */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm text-white bg-brand-gradient hover:opacity-95 transition-opacity shadow-lg shadow-violet-950/40"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href={profile.resumeUrl || '#'}
                download={Boolean(profile.resumeUrl)}
                target={profile.resumeUrl ? '_blank' : undefined}
                rel={profile.resumeUrl ? 'noopener noreferrer' : undefined}
                onClick={handleResumeClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-95 transition-opacity shadow-lg shadow-cyan-950/30"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </motion.a>
            </div>

            {resumeNotice && (
              <p className="mt-3 text-xs font-mono text-cyan-300">
                Resume PDF can be uploaded anytime in Admin Dashboard → Profile &amp; Settings.
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-slate-400">
              {profile.socials?.github && (
                <motion.a
                  whileHover={{ y: -2 }}
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#12151E] border border-[#1F2433] hover:border-violet-500/40 hover:text-white transition-colors"
                >
                  <GitHubIcon className="w-4 h-4 text-violet-400" />
                  <span>GitHub</span>
                </motion.a>
              )}
              {profile.socials?.linkedin && (
                <motion.a
                  whileHover={{ y: -2 }}
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#12151E] border border-[#1F2433] hover:border-blue-500/40 hover:text-white transition-colors"
                >
                  <LinkedInIcon className="w-4 h-4 text-blue-400" />
                  <span>LinkedIn</span>
                </motion.a>
              )}
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{profile.location}</span>
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="lg:col-span-5"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <SpotlightCard className="p-5 sm:p-6">
                <div className="flex items-center gap-4 pb-5 border-b border-[#1F2433]">
                  {profile.profileImageUrl ? (
                    <img
                      src={profile.profileImageUrl}
                      alt={`${profile.name} — ${profile.title}`}
                      className="w-16 h-16 rounded-2xl object-cover border border-violet-500/40 shrink-0"
                    />
                  ) : (
                    <div
                      aria-label="Profile photograph placeholder"
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600/25 via-blue-600/20 to-cyan-500/25 border border-violet-500/35 flex flex-col items-center justify-center shrink-0"
                    >
                      <span className="text-2xl font-bold text-brand-gradient font-mono">
                        S
                      </span>
                      <span className="text-[8px] font-mono uppercase tracking-wider text-slate-400">
                        Photo
                      </span>
                    </div>
                  )}

                  <div>
                    <h2 className="text-lg font-semibold text-slate-100">
                      {profile.name}
                    </h2>
                    <p className="text-xs font-mono text-cyan-400">
                      {profile.title}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      BCA @ Eternal University
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('profile')}
                    className={`px-3 py-1.5 rounded-lg font-mono text-xs border transition-colors ${
                      activeTab === 'profile'
                        ? 'bg-brand-gradient border-transparent text-white font-medium'
                        : 'bg-[#0B0D12] border-[#1F2433] text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    salma.json
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('learning')}
                    className={`px-3 py-1.5 rounded-lg font-mono text-xs border transition-colors ${
                      activeTab === 'learning'
                        ? 'bg-brand-gradient border-transparent text-white font-medium'
                        : 'bg-[#0B0D12] border-[#1F2433] text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    current_focus.js
                  </button>
                </div>

                <div className="mt-3 rounded-xl bg-[#0B0D12] border border-[#1F2433] p-4 font-mono text-xs leading-relaxed overflow-x-auto">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                    >
                      {activeTab === 'profile' ? (
                        <pre className="text-slate-300">
                          <code>
                            <span className="text-slate-500">{'{'}</span>
                            {'\n'}
                            {'  '}
                            <span className="text-violet-400">&quot;name&quot;</span>:{' '}
                            <span className="text-cyan-300">&quot;{profile.name}&quot;</span>,
                            {'\n'}
                            {'  '}
                            <span className="text-violet-400">&quot;degree&quot;</span>:{' '}
                            <span className="text-cyan-300">&quot;BCA&quot;</span>,
                            {'\n'}
                            {'  '}
                            <span className="text-violet-400">&quot;projectsStack&quot;</span>: [
                            <span className="text-blue-300">&quot;React&quot;</span>,{' '}
                            <span className="text-blue-300">&quot;MongoDB&quot;</span>,{' '}
                            <span className="text-blue-300">&quot;Git&quot;</span>],
                            {'\n'}
                            {'  '}
                            <span className="text-violet-400">&quot;openTo&quot;</span>:{' '}
                            <span className="text-emerald-300">
                              &quot;Internships &amp; Collaboration&quot;
                            </span>
                            {'\n'}
                            <span className="text-slate-500">{'}'}</span>
                          </code>
                        </pre>
                      ) : (
                        <pre className="text-slate-300">
                          <code>
                            <span className="text-violet-400">const</span>{' '}
                            <span className="text-blue-300">learningNow</span> = [
                            {'\n'}
                            {'  '}
                            <span className="text-cyan-300">&quot;Node.js&quot;</span>,
                            {'\n'}
                            {'  '}
                            <span className="text-cyan-300">&quot;Express.js&quot;</span>,
                            {'\n'}
                            {'  '}
                            <span className="text-cyan-300">&quot;REST API Architecture&quot;</span>
                            {'\n'}
                            ];
                          </code>
                        </pre>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </SpotlightCard>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
