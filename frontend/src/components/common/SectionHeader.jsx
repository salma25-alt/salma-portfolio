import { motion } from 'framer-motion';

export default function SectionHeader({ tag, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45 }}
      className="mb-12"
    >
      {tag && (
        <span className="inline-block font-mono text-xs tracking-wider uppercase text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-3 py-1 rounded-full mb-3">
          {tag}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-slate-400 max-w-2xl text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}