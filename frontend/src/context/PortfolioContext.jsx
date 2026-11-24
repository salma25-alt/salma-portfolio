import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';
import * as staticData from '../data/portfolioData';

const PortfolioContext = createContext(null);

const fallbackProfile = staticData.profileData || {};
const fallbackSkills = staticData.skillsData || [];
const fallbackProjects = staticData.projectsData || [];
const fallbackEducation = staticData.educationData || [];
const fallbackCertificates =
  staticData.certificationsData || staticData.certificatesData || [];
const fallbackExperience = staticData.experienceData || [];
const fallbackBlogs = staticData.blogPostsData || staticData.blogsData || [];

const SKILL_CATEGORY_DESCRIPTIONS = {
  'Currently Using':
    'Actively practicing and applying in current coursework and development.',
  'Used in Projects':
    'Applied directly while building and shipping web applications.',
  'Currently Learning':
    'Expanding backend engineering skills to build complete full-stack systems.',
};

function groupSkillsByCategory(flatSkills) {
  const order = ['Currently Using', 'Used in Projects', 'Currently Learning'];
  return order
    .map((category) => {
      const items = flatSkills
        .filter((s) => s.category === category)
        .map((s) => s.name);
      return {
        category,
        description: SKILL_CATEGORY_DESCRIPTIONS[category] || '',
        items,
      };
    })
    .filter((group) => group.items.length > 0);
}

export function PortfolioProvider({ children }) {
  const [data, setData] = useState({
    profile: fallbackProfile,
    skills: fallbackSkills,
    projects: fallbackProjects,
    education: fallbackEducation,
    certificates: fallbackCertificates,
    experience: fallbackExperience,
    blogPosts: fallbackBlogs,
  });
  const [loading, setLoading] = useState(true);

  const refreshPortfolio = async () => {
    try {
      const res = await api.get('/public/portfolio');
      const live = res.data?.data;
      if (!live) return;

      setData({
        profile: live.profile
          ? {
              ...fallbackProfile,
              ...live.profile,
              socials: {
                ...fallbackProfile.socials,
                ...(live.profile.socials || {}),
              },
            }
          : fallbackProfile,
        skills:
          Array.isArray(live.skills) && live.skills.length > 0
            ? groupSkillsByCategory(live.skills)
            : fallbackSkills,
        projects:
          Array.isArray(live.projects) && live.projects.length > 0
            ? live.projects
            : fallbackProjects,
        education:
          Array.isArray(live.education) && live.education.length > 0
            ? live.education
            : fallbackEducation,
        certificates:
          Array.isArray(live.certificates) && live.certificates.length > 0
            ? live.certificates
            : fallbackCertificates,
        experience:
          Array.isArray(live.experience) && live.experience.length > 0
            ? live.experience
            : fallbackExperience,
        blogPosts:
          Array.isArray(live.blogPosts) && live.blogPosts.length > 0
            ? live.blogPosts
            : fallbackBlogs,
      });
    } catch {
      // Keep verified static fallback if backend is unreachable
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshPortfolio();
  }, []);

  return (
    <PortfolioContext.Provider value={{ ...data, loading, refreshPortfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
