import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../common/SocialIcons';
import SectionHeader from '../common/SectionHeader';
import api from '../../services/api';
import { usePortfolio } from '../../context/PortfolioContext';

export default function ContactSection() {
  const { profile } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, submitted: false, error: '' });

    try {
      await api.post('/contact', formData);
      setStatus({ submitting: false, submitted: true, error: '' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      const apiMsg =
        err.response?.data?.errors?.[0]?.message ||
        err.response?.data?.message ||
        'Could not send your message right now. Please try again.';
      setStatus({ submitting: false, submitted: false, error: apiMsg });
    }
  };

  return (
    <section
      id="contact"
      className="py-20 sm:py-24 border-t border-[#1F2433]/60 bg-[#0D1017]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="08 // Contact"
          title="Let's Connect"
          subtitle="Have a question, project idea, or internship opportunity? Send a message directly or reach out via email."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-5 space-y-5"
          >
            <div className="card-surface p-6 space-y-5">
              <h3 className="text-lg font-semibold text-slate-100">
                Direct Contact Information
              </h3>

              <div className="space-y-4 text-sm">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3.5 text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  <span className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-mono text-slate-500">Email</p>
                    <p className="truncate font-medium">{profile.email}</p>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 text-slate-300">
                  <span className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-xs font-mono text-slate-500">Location</p>
                    <p className="font-medium">{profile.location}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1F2433] flex flex-wrap gap-3">
                {profile.socials?.github && (
                  <a
                    href={profile.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B0D12] border border-[#1F2433] hover:border-violet-500/40 text-xs font-mono text-slate-200 transition-colors"
                  >
                    <GitHubIcon className="w-4 h-4 text-violet-400" />
                    <span>GitHub</span>
                  </a>
                )}
                {profile.socials?.linkedin && (
                  <a
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B0D12] border border-[#1F2433] hover:border-cyan-500/40 text-xs font-mono text-slate-200 transition-colors"
                  >
                    <LinkedInIcon className="w-4 h-4 text-cyan-400" />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Interactive Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              className="card-surface p-6 sm:p-8 space-y-5"
            >
              {status.submitted && (
                <div
                  role="status"
                  className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3 text-sm text-emerald-200"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Message sent!</p>
                    <p className="text-xs text-emerald-300/80 mt-0.5">
                      Thank you for reaching out. Your message has been saved
                      and I will get back to you soon.
                    </p>
                  </div>
                </div>
              )}

              {status.error && (
                <div
                  role="alert"
                  className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 flex items-start gap-3 text-sm text-rose-200"
                >
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <span>{status.error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0D12] border border-[#1F2433] text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0D12] border border-[#1F2433] text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Internship opportunity, collaboration, or question"
                  className="w-full px-4 py-3 rounded-xl bg-[#0B0D12] border border-[#1F2433] text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  minLength={10}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here (minimum 10 characters)..."
                  className="w-full px-4 py-3 rounded-xl bg-[#0B0D12] border border-[#1F2433] text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors resize-y"
                />
              </div>

              <button
                type="submit"
                disabled={status.submitting}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm text-white bg-brand-gradient hover:opacity-95 disabled:opacity-50 transition-opacity shadow-lg shadow-violet-950/40"
              >
                <Send className="w-4 h-4" />
                <span>
                  {status.submitting ? 'Sending...' : 'Send Message'}
                </span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
