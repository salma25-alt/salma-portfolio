import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Terminal, Check, Copy } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

const navLinks = [
  { label: 'About', href: '/#about', sectionId: 'about' },
  { label: 'Skills', href: '/#skills', sectionId: 'skills' },
  { label: 'Projects', href: '/#projects', sectionId: 'projects' },
  { label: 'Education', href: '/#education', sectionId: 'education' },
  { label: 'Certifications', href: '/#certifications', sectionId: 'certifications' },
  { label: 'Journey', href: '/blog', sectionId: 'blog' },
  { label: 'Contact', href: '/#contact', sectionId: 'contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeNav, setActiveNav] = useState('About');
  // 0 = settled on a section, 1 = right in the middle between two sections
  const [transitionWave, setTransitionWave] = useState(0);
  const location = useLocation();
  const { profile } = usePortfolio();

  useEffect(() => {
    if (location.pathname.startsWith('/blog')) {
      setActiveNav('Journey');
      setTransitionWave(0);
      return;
    }

    if (location.pathname !== '/') {
      setActiveNav('');
      setTransitionWave(0);
      return;
    }

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const sections = navLinks
        .map((link) => ({
          label: link.label,
          el: document.getElementById(link.sectionId),
        }))
        .filter((s) => s.el);

      if (sections.length === 0) return;

      let currentIndex = 0;
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].el.offsetTop <= scrollPos) {
          currentIndex = i;
        }
      }

      setActiveNav(sections[currentIndex].label);

      // Calculate how far we are between current section and next section (0 -> 1 -> 0)
      const currentEl = sections[currentIndex].el;
      const nextEl = sections[currentIndex + 1]?.el;
      if (nextEl) {
        const span = Math.max(nextEl.offsetTop - currentEl.offsetTop, 1);
        const progress = Math.min(
          Math.max((scrollPos - currentEl.offsetTop) / span, 0),
          1
        );
        // Peaks at 1.0 right at the midpoint between two sections
        const wave = Math.sin(progress * Math.PI);
        setTransitionWave(wave);
      } else {
        setTransitionWave(0);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavClick = (link) => {
    setMenuOpen(false);
    setActiveNav(link.label);
    // Trigger a brief liquid wave pulse when clicking directly to another tab
    setTransitionWave(1);
    setTimeout(() => setTransitionWave(0), 340);

    if (link.href.startsWith('/#') && location.pathname === '/') {
      const id = link.href.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback ignored
    }
  };

  // Upper border dips down and lower border rises up like a water droplet stretching between tabs
  const pinchY = 1 - transitionWave * 0.28; // Compresses height to 72% mid-transition
  const stretchX = 1 + transitionWave * 0.14; // Stretches width horizontally like flowing water

  return (
    <header className="sticky top-0 z-50 pt-3 px-4 sm:px-6 lg:px-8">
      <nav
        aria-label="Primary Navigation"
        className="max-w-6xl mx-auto h-14 px-4 sm:px-5 rounded-2xl bg-[#10131C]/85 backdrop-blur-xl border border-[#1F2433] shadow-lg shadow-black/30 flex items-center justify-between"
      >
        {/* Brand Monogram */}
        <Link
          to="/"
          onClick={() => {
            setActiveNav('About');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-lg"
        >
          <span className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center text-white shadow-sm">
            <Terminal className="w-4 h-4" />
          </span>
          <span className="font-mono font-semibold text-sm sm:text-base tracking-tight text-slate-100 group-hover:text-violet-300 transition-colors">
            {(profile.name || 'Salma').toLowerCase()}
            <span className="text-cyan-400">.dev</span>
          </span>
        </Link>

        {/* Desktop Links with Liquid Border Indicator */}
        <ul className="hidden lg:flex items-center gap-1 text-xs font-medium text-slate-300 bg-[#0B0D12]/80 border border-[#1F2433] px-2 py-1.5 rounded-xl">
          {navLinks.map((link) => {
            const isActive = activeNav === link.label;

            const innerContent = (
              <>
                {isActive && (
                  <motion.span
                    layoutId="liquidBorderDroplet"
                    animate={{
                      scaleY: pinchY,
                      scaleX: stretchX,
                      borderRadius:
                        transitionWave > 0.25 ? '999px' : '10px',
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 240,
                      damping: 22,
                      mass: 0.85,
                    }}
                    className="absolute inset-0 p-[1.5px] bg-brand-gradient shadow-[0_0_14px_rgba(34,211,238,0.35)] pointer-events-none"
                  >
                    {/* Hollow dark center so only the glowing gradient border shows */}
                    <span className="block w-full h-full rounded-[inherit] bg-[#101420]/95" />
                  </motion.span>
                )}

                <span
                  className={`relative z-10 transition-colors duration-200 ${
                    isActive
                      ? 'text-cyan-300 font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </span>
              </>
            );

            return (
              <li key={link.label}>
                {link.href.startsWith('/#') ? (
                  <a
                    href={link.href}
                    onClick={() => handleNavClick(link)}
                    className="relative px-3.5 py-1.5 rounded-lg block"
                  >
                    {innerContent}
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    onClick={() => handleNavClick(link)}
                    className="relative px-3.5 py-1.5 rounded-lg block"
                  >
                    {innerContent}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        {/* Right Action: Gradient Copy Email Button + Mobile Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyEmail}
            title={`Copy ${profile.email}`}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-gradient text-white font-mono text-xs font-medium shadow-md shadow-violet-950/40 hover:opacity-95 transition-opacity"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Email Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Email</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-[#181C28] border border-transparent hover:border-[#1F2433] transition-colors"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile & Tablet Drawer */}
      {menuOpen && (
        <div className="lg:hidden max-w-6xl mx-auto mt-2 rounded-2xl bg-[#12151E]/95 backdrop-blur-xl border border-[#1F2433] p-4 shadow-xl">
          <ul className="flex flex-col space-y-1.5 text-sm font-medium text-slate-300">
            {navLinks.map((link) => {
              const isActive = activeNav === link.label;
              return (
                <li key={link.label}>
                  {link.href.startsWith('/#') ? (
                    <a
                      href={link.href}
                      onClick={() => handleNavClick(link)}
                      className={`block px-3.5 py-2.5 rounded-xl transition-colors ${
                        isActive
                          ? 'border border-cyan-400/70 bg-violet-950/30 text-cyan-300 font-semibold'
                          : 'hover:bg-[#181C28] hover:text-white'
                      }`}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={() => handleNavClick(link)}
                      className={`block px-3.5 py-2.5 rounded-xl transition-colors ${
                        isActive
                          ? 'border border-cyan-400/70 bg-violet-950/30 text-cyan-300 font-semibold'
                          : 'hover:bg-[#181C28] hover:text-white'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-3 pt-3 border-t border-[#1F2433] sm:hidden">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-gradient font-mono text-xs text-white font-medium"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied {profile.email}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy {profile.email}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
