import { useEffect, useState } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';
import api from '../../services/api';
import FileUploadField from '../../components/admin/FileUploadField';

export default function AdminProfilePage() {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

  useEffect(() => {
    api.get('/admin/profile').then((res) => {
      const data = res.data.data || {};
      setForm({
        name: data.name || 'Salma',
        title: data.title || 'Full-Stack Developer',
        shortIntro: data.shortIntro || '',
        aboutText: (data.aboutParagraphs || []).join('\n\n'),
        email: data.email || 'salma25@navgurukul.org',
        location: data.location || '',
        profileImageUrl: data.profileImageUrl || '',
        resumeUrl: data.resumeUrl || '',
        github: data.socials?.github || '',
        linkedin: data.socials?.linkedin || '',
        codechef: data.socials?.codechef || '',
      });
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSavedMsg('');

    try {
      await api.put('/admin/profile', {
        name: form.name,
        title: form.title,
        shortIntro: form.shortIntro,
        aboutParagraphs: form.aboutText
          .split('\n\n')
          .map((p) => p.trim())
          .filter(Boolean),
        email: form.email,
        location: form.location,
        profileImageUrl: form.profileImageUrl,
        resumeUrl: form.resumeUrl,
        socials: {
          github: form.github,
          linkedin: form.linkedin,
          codechef: form.codechef,
        },
      });
      setSavedMsg('Profile & settings saved successfully.');
    } finally {
      setSaving(false);
    }
  };

  if (!form) {
    return <p className="font-mono text-sm text-slate-400">Loading profile...</p>;
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Profile & Settings</h1>
        <p className="mt-1 text-sm text-slate-400">
          Update your personal bio, social links, profile photo, and resume PDF.
        </p>
      </div>

      {savedMsg && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-sm text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{savedMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="card-surface p-6 sm:p-8 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
              Display Name
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2433] text-sm text-slate-100"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
              Role Title
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2433] text-sm text-slate-100"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
            Hero Short Intro
          </label>
          <textarea
            rows={2}
            required
            value={form.shortIntro}
            onChange={(e) => setForm({ ...form, shortIntro: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2433] text-sm text-slate-100"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
            About Paragraphs (Separate paragraphs with a blank line)
          </label>
          <textarea
            rows={5}
            value={form.aboutText}
            onChange={(e) => setForm({ ...form, aboutText: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2433] text-sm text-slate-100"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
              Public Email
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2433] text-sm text-slate-100"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
              Location
            </label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2433] text-sm text-slate-100"
            />
          </div>
        </div>

        <FileUploadField
          label="Profile Photo (JPG / PNG / WEBP)"
          value={form.profileImageUrl}
          onChange={(url) => setForm({ ...form, profileImageUrl: url })}
          folder="salma-portfolio/profile"
          accept="image/*"
        />

        <FileUploadField
          label="Resume File (PDF)"
          value={form.resumeUrl}
          onChange={(url) => setForm({ ...form, resumeUrl: url })}
          folder="salma-portfolio/resume"
          accept="application/pdf"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
              GitHub URL
            </label>
            <input
              type="url"
              value={form.github}
              onChange={(e) => setForm({ ...form, github: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2433] text-sm text-slate-100"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
              LinkedIn URL
            </label>
            <input
              type="url"
              value={form.linkedin}
              onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2433] text-sm text-slate-100"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
              CodeChef URL
            </label>
            <input
              type="url"
              value={form.codechef}
              onChange={(e) => setForm({ ...form, codechef: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2433] text-sm text-slate-100"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm text-white bg-brand-gradient hover:opacity-95 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
        </button>
      </form>
    </div>
  );
}
