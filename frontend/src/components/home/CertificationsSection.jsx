import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle2, ExternalLink, Eye, X } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import SpotlightCard from '../common/SpotlightCard';
import { usePortfolio } from '../../context/PortfolioContext';

export default function CertificationsSection() {
  const { certificates } = usePortfolio();
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section
      id="certifications"
      className="py-20 sm:py-24 border-t border-[#1F2433]/60"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="05 // Certifications"
          title="Verified Certificates & Programs"
          subtitle="Completed programs and competitive coding milestones."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert, idx) => (
            <motion.div
              key={cert._id || cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
            >
              <SpotlightCard className="p-6 sm:p-7 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-11 h-11 rounded-xl bg-brand-gradient flex items-center justify-center text-white shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div className="flex flex-wrap items-center gap-2 justify-end font-mono text-xs">
                      {cert.mode && (
                        <span className="px-2.5 py-1 rounded-full bg-[#0B0D12] border border-[#1F2433] text-slate-300">
                          {cert.mode}
                        </span>
                      )}
                      {cert.duration && (
                        <span className="px-2.5 py-1 rounded-full bg-violet-950/40 border border-violet-500/30 text-violet-300">
                          {cert.duration}
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-slate-100">
                    {cert.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-cyan-400">
                    {cert.organization}
                  </p>

                  {cert.highlights && cert.highlights.length > 0 && (
                    <ul className="mt-5 space-y-2.5 border-t border-[#1F2433] pt-4">
                      {cert.highlights.map((point, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed"
                        >
                          <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-[#1F2433] flex items-center justify-between gap-3">
                  {cert.certificateFileUrl ? (
                    <a
                      href={cert.certificateFileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-gradient text-white text-xs font-mono font-medium hover:opacity-95 transition-opacity shadow-md shadow-violet-950/40"
                    >
                      <span>View Certificate</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelectedCert(cert)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-gradient text-white text-xs font-mono font-medium hover:opacity-95 transition-opacity shadow-md shadow-violet-950/40"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Certificate</span>
                    </button>
                  )}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl bg-[#12151E] border border-violet-500/40 shadow-2xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-[#1F2433] flex items-center justify-between">
                <span className="font-mono text-xs text-cyan-400">
                  Verified Credential Details
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  aria-label="Close certificate preview"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#181C28]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-brand-gradient flex items-center justify-center text-white">
                  <Award className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-100">
                    {selectedCert.title}
                  </h3>
                  <p className="text-sm font-medium text-cyan-400 mt-1">
                    {selectedCert.organization}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2 font-mono text-xs text-slate-400">
                    {selectedCert.mode && <span>Mode: {selectedCert.mode}</span>}
                    {selectedCert.duration && (
                      <span>• {selectedCert.duration}</span>
                    )}
                  </div>
                </div>

                {selectedCert.highlights && selectedCert.highlights.length > 0 && (
                  <ul className="space-y-2 pt-3 border-t border-[#1F2433]">
                    {selectedCert.highlights.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-slate-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <p className="pt-3 border-t border-[#1F2433] text-xs font-mono text-slate-400">
                  Note: Upload the PDF/image file in Admin Dashboard → Certificates to link the downloadable file directly here.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
