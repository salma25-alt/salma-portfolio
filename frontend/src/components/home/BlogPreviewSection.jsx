import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import SpotlightCard from '../common/SpotlightCard';
import { usePortfolio } from '../../context/PortfolioContext';

export default function BlogPreviewSection() {
  const { blogPosts } = usePortfolio();

  return (
    <section
      id="blog"
      className="py-20 sm:py-24 border-t border-[#1F2433]/60"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <SectionHeader
            tag="07 // Blog & Notes"
            title="Learning Journey"
            subtitle="Notes on full-stack development, project learnings, and concepts explored along the way."
          />
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-cyan-400 hover:text-cyan-300 mb-12 sm:mb-14 shrink-0"
          >
            <span>View All Posts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts.slice(0, 2).map((post, idx) => (
            <motion.div
              key={post._id || post.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
            >
              <SpotlightCard className="p-6 sm:p-7 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 font-mono text-xs text-slate-400">
                    <span className="inline-flex items-center gap-1.5 text-violet-400">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{post.category}</span>
                    </span>
                    <span>{post.publishedAtLabel}</span>
                  </div>

                  <h3 className="mt-4 text-xl font-semibold text-slate-100">
                    {post.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-slate-400 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1F2433]">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>Read Entry</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
