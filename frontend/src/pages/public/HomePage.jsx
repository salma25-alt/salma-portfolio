import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import HeroSection from '../../components/home/HeroSection';
import AboutSection from '../../components/home/AboutSection';
import SkillsSection from '../../components/home/SkillsSection';
import ProjectsSection from '../../components/home/ProjectsSection';
import EducationSection from '../../components/home/EducationSection';
import CertificationsSection from '../../components/home/CertificationsSection';
import ExperienceSection from '../../components/home/ExperienceSection';
import CodingProfilesSection from '../../components/home/CodingProfilesSection';
import ContactSection from '../../components/home/ContactSection';
import SectionHeader from '../../components/common/SectionHeader';
import { blogPostsData } from '../../data/portfolioData';

export default function HomePage() {
  const publishedPosts = blogPostsData.filter(
    (post) => post.status === 'published'
  );

  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <EducationSection />
      <CertificationsSection />
      <ExperienceSection />
      <CodingProfilesSection />

      {/* Learning Journey / Blog Preview Section */}
      <section
        id="journey"
        className="py-20 sm:py-24 border-t border-[#1F2433]/60"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <SectionHeader
              tag="08 // Learning Journey"
              title="Notes, Concepts & Build Logs"
              subtitle="Documenting what I learn while building web applications and solving technical problems."
            />
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors mb-12 shrink-0"
            >
              <span>View All Entries</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {publishedPosts.slice(0, 2).map((post) => (
              <article
                key={post.id}
                className="card-surface card-surface-hover p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-3">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{post.category}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-400">{post.publishedAt}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-100">
                    {post.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-slate-400 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1F2433]">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    <span>Read Entry</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}