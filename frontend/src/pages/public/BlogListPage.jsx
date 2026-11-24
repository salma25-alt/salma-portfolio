import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, ArrowLeft } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export default function BlogListPage() {
  const { blogPosts } = usePortfolio();

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-mono text-slate-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <p className="font-mono text-xs uppercase tracking-widest text-cyan-400">
            Learning Journey
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-100">
            Notes & Articles
          </h1>
          <p className="mt-3 text-slate-400">
            Writing about concepts learned in web development, backend APIs, and building projects.
          </p>
        </div>

        <div className="space-y-6">
          {blogPosts.map((post) => (
            <article key={post._id || post.id} className="card-surface card-surface-hover p-6 sm:p-8">
              <div className="flex items-center justify-between gap-2 font-mono text-xs text-slate-400">
                <span className="inline-flex items-center gap-1.5 text-violet-400">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{post.category}</span>
                </span>
                <span>{post.publishedAtLabel}</span>
              </div>

              <h2 className="mt-3 text-xl sm:text-2xl font-semibold text-slate-100">
                {post.title}
              </h2>

              <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
                {post.summary}
              </p>

              <div className="mt-5 pt-4 border-t border-[#1F2433]">
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-400 hover:text-cyan-300"
                >
                  <span>Read Full Entry</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
