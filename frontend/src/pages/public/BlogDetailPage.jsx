import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const { blogPosts } = usePortfolio();
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center space-y-5">
        <h1 className="text-3xl font-bold text-slate-100">Post Not Found</h1>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-gradient text-sm font-medium text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog</span>
        </Link>
      </div>
    );
  }

  return (
    <article className="py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-mono text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Learning Journey</span>
        </Link>

        <div className="card-surface p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5 text-violet-400">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{post.category}</span>
            </span>
            <span>•</span>
            <span>{post.publishedAtLabel}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold text-slate-100 leading-tight">
            {post.title}
          </h1>

          <div className="space-y-4 pt-4 border-t border-[#1F2433] text-slate-300 leading-relaxed text-base sm:text-[17px]">
            {(post.content || []).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
