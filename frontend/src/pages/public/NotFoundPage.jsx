import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-xl mx-auto px-4 text-center space-y-5">
        <p className="font-mono text-xs uppercase tracking-widest text-cyan-400">
          404 // Page Not Found
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-100">
          Nothing to see here
        </h1>
        <p className="text-sm sm:text-base text-slate-400">
          The page you tried to open does not exist or has been moved.
        </p>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-gradient text-sm font-medium text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
