import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import api from '../../services/api';
import FileUploadField from '../../components/admin/FileUploadField';

const RESOURCE_CONFIGS = {
  projects: {
    title: 'Manage Projects',
    subtitle: 'Add, edit, publish, or update project screenshots and links.',
    endpoint: '/admin/projects',
    titleField: 'title',
    metaField: 'statusLabel',
    fields: [
      { name: 'title', label: 'Project Title', type: 'text', required: true },
      { name: 'slug', label: 'URL Slug (e.g., ask-gemini)', type: 'text', required: true },
      { name: 'statusLabel', label: 'Category Label (e.g., Full-Stack AI Project)', type: 'text' },
      { name: 'shortDescription', label: 'Short Summary', type: 'textarea', required: true },
      { name: 'fullDescription', label: 'Full Description', type: 'textarea', required: true },
      { name: 'technologies', label: 'Technologies (comma-separated)', type: 'csv' },
      { name: 'features', label: 'Features (one per line)', type: 'lines' },
      { name: 'screenshotUrl', label: 'Project Screenshot', type: 'file', folder: 'salma-portfolio/projects', accept: 'image/*' },
      { name: 'githubUrl', label: 'GitHub Repository URL', type: 'text' },
      { name: 'liveDemoUrl', label: 'Live Demo URL', type: 'text' },
      { name: 'isPlaceholder', label: 'Mark as Placeholder Project', type: 'checkbox' },
      { name: 'order', label: 'Display Order', type: 'number' },
      { name: 'status', label: 'Visibility', type: 'select', options: ['published', 'draft'] },
    ],
  },
  skills: {
    title: 'Manage Skills',
    subtitle: 'Organize technologies across Currently Using, Used in Projects, and Currently Learning.',
    endpoint: '/admin/skills',
    titleField: 'name',
    metaField: 'category',
    fields: [
      { name: 'name', label: 'Skill Name', type: 'text', required: true },
      {
        name: 'category',
        label: 'Category',
        type: 'select',
        options: ['Currently Using', 'Used in Projects', 'Currently Learning'],
      },
      { name: 'order', label: 'Display Order', type: 'number' },
      { name: 'status', label: 'Visibility', type: 'select', options: ['published', 'draft'] },
    ],
  },
  certificates: {
    title: 'Manage Certificates',
    subtitle: 'Manage verified credentials and attach certificate PDFs or images.',
    endpoint: '/admin/certificates',
    titleField: 'title',
    metaField: 'organization',
    fields: [
      { name: 'title', label: 'Certificate Title', type: 'text', required: true },
      { name: 'organization', label: 'Issuing Organization', type: 'text', required: true },
      { name: 'mode', label: 'Mode (e.g., Online)', type: 'text' },
      { name: 'duration', label: 'Duration (e.g., June 2026 – August 2026)', type: 'text' },
      { name: 'highlights', label: 'Key Learnings / Highlights (one per line)', type: 'lines' },
      { name: 'certificateFileUrl', label: 'Certificate File (PDF or Image)', type: 'file', folder: 'salma-portfolio/certificates' },
      { name: 'order', label: 'Display Order', type: 'number' },
      { name: 'status', label: 'Visibility', type: 'select', options: ['published', 'draft'] },
    ],
  },
  education: {
    title: 'Manage Education',
    subtitle: 'Update degree, institution, location, and academic status.',
    endpoint: '/admin/education',
    titleField: 'degree',
    metaField: 'institution',
    fields: [
      { name: 'degree', label: 'Degree / Program', type: 'text', required: true },
      { name: 'institution', label: 'Institution Name', type: 'text', required: true },
      { name: 'location', label: 'Location', type: 'text', required: true },
      { name: 'statusLabel', label: 'Status (e.g., Pursuing)', type: 'text' },
      { name: 'order', label: 'Display Order', type: 'number' },
      { name: 'status', label: 'Visibility', type: 'select', options: ['published', 'draft'] },
    ],
  },
  experience: {
    title: 'Manage Experience',
    subtitle: 'Manage internships and practical learning milestones.',
    endpoint: '/admin/experience',
    titleField: 'role',
    metaField: 'organization',
    fields: [
      { name: 'role', label: 'Role / Program Title', type: 'text', required: true },
      { name: 'organization', label: 'Organization', type: 'text', required: true },
      { name: 'type', label: 'Experience Type', type: 'text', required: true },
      { name: 'mode', label: 'Mode (e.g., Online)', type: 'text' },
      { name: 'duration', label: 'Duration', type: 'text' },
      { name: 'points', label: 'Verified Contributions (one per line)', type: 'lines' },
      { name: 'order', label: 'Display Order', type: 'number' },
      { name: 'status', label: 'Visibility', type: 'select', options: ['published', 'draft'] },
    ],
  },
  blogs: {
    title: 'Manage Blog Posts',
    subtitle: 'Write, edit, save drafts, or publish Learning Journey articles.',
    endpoint: '/admin/blogs',
    titleField: 'title',
    metaField: 'category',
    fields: [
      { name: 'title', label: 'Article Title', type: 'text', required: true },
      { name: 'slug', label: 'URL Slug', type: 'text', required: true },
      { name: 'category', label: 'Category', type: 'text', required: true },
      { name: 'publishedAtLabel', label: 'Date / Label', type: 'text' },
      { name: 'summary', label: 'Short Summary', type: 'textarea', required: true },
      { name: 'content', label: 'Article Paragraphs (one paragraph per line)', type: 'lines' },
      { name: 'status', label: 'Visibility', type: 'select', options: ['published', 'draft'] },
    ],
  },
};

export default function AdminResourceManager({ resourceKey }) {
  const config = RESOURCE_CONFIGS[resourceKey];
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [saving, setSaving] = useState(false);

  const loadItems = async () => {
    setLoading(true);
    try {
      const res = await api.get(config.endpoint);
      setItems(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFormOpen(false);
    setEditingId(null);
    loadItems();
  }, [resourceKey]);

  const openCreateForm = () => {
    const initial = {};
    config.fields.forEach((f) => {
      if (f.type === 'select') initial[f.name] = f.options[0];
      else if (f.type === 'number') initial[f.name] = items.length + 1;
      else if (f.type === 'checkbox') initial[f.name] = false;
      else initial[f.name] = '';
    });
    setFormValues(initial);
    setEditingId(null);
    setFormOpen(true);
  };

  const openEditForm = (item) => {
    const mapped = {};
    config.fields.forEach((f) => {
      const val = item[f.name];
      if (f.type === 'csv') mapped[f.name] = Array.isArray(val) ? val.join(', ') : '';
      else if (f.type === 'lines') mapped[f.name] = Array.isArray(val) ? val.join('\n') : '';
      else mapped[f.name] = val ?? '';
    });
    setFormValues(mapped);
    setEditingId(item._id);
    setFormOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {};
    config.fields.forEach((f) => {
      const raw = formValues[f.name];
      if (f.type === 'csv') {
        payload[f.name] = String(raw || '')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);
      } else if (f.type === 'lines') {
        payload[f.name] = String(raw || '')
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean);
      } else if (f.type === 'number') {
        payload[f.name] = Number(raw) || 0;
      } else {
        payload[f.name] = raw;
      }
    });

    try {
      if (editingId) {
        await api.put(`${config.endpoint}/${editingId}`, payload);
      } else {
        await api.post(config.endpoint, payload);
      }
      setFormOpen(false);
      setEditingId(null);
      await loadItems();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item permanently?')) return;
    await api.delete(`${config.endpoint}/${id}`);
    setItems((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">{config.title}</h1>
          <p className="mt-1 text-sm text-slate-400">{config.subtitle}</p>
        </div>

        <button
          type="button"
          onClick={openCreateForm}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-gradient text-sm font-medium text-white shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New</span>
        </button>
      </div>

      {/* Create / Edit Form Drawer */}
      {formOpen && (
        <form
          onSubmit={handleSave}
          className="card-surface p-6 sm:p-8 border-violet-500/40 space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#1F2433]">
            <h2 className="text-lg font-semibold text-slate-100">
              {editingId ? 'Edit Item' : 'Create New Item'}
            </h2>
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {config.fields.map((f) => {
              if (f.type === 'file') {
                return (
                  <FileUploadField
                    key={f.name}
                    label={f.label}
                    value={formValues[f.name]}
                    onChange={(url) =>
                      setFormValues({ ...formValues, [f.name]: url })
                    }
                    folder={f.folder}
                    accept={f.accept}
                  />
                );
              }

              if (f.type === 'textarea' || f.type === 'lines') {
                return (
                  <div key={f.name}>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                      {f.label}
                    </label>
                    <textarea
                      rows={3}
                      required={f.required}
                      value={formValues[f.name] || ''}
                      onChange={(e) =>
                        setFormValues({ ...formValues, [f.name]: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2433] text-sm text-slate-100"
                    />
                  </div>
                );
              }

              if (f.type === 'select') {
                return (
                  <div key={f.name}>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                      {f.label}
                    </label>
                    <select
                      value={formValues[f.name] || f.options[0]}
                      onChange={(e) =>
                        setFormValues({ ...formValues, [f.name]: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2433] text-sm text-slate-100"
                    >
                      {f.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }

              if (f.type === 'checkbox') {
                return (
                  <label
                    key={f.name}
                    className="inline-flex items-center gap-2.5 text-sm text-slate-300 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={Boolean(formValues[f.name])}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          [f.name]: e.target.checked,
                        })
                      }
                      className="rounded border-[#1F2433] bg-[#0B0D12]"
                    />
                    <span>{f.label}</span>
                  </label>
                );
              }

              return (
                <div key={f.name}>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    {f.label}
                  </label>
                  <input
                    type={f.type === 'number' ? 'number' : 'text'}
                    required={f.required}
                    value={formValues[f.name] ?? ''}
                    onChange={(e) =>
                      setFormValues({ ...formValues, [f.name]: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2433] text-sm text-slate-100"
                  />
                </div>
              );
            })}
          </div>

          <div className="pt-3 flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-gradient text-sm font-medium text-white disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Item'}</span>
            </button>
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2433] text-sm text-slate-300"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Items List */}
      {loading ? (
        <p className="font-mono text-sm text-slate-400">Loading items...</p>
      ) : items.length === 0 ? (
        <div className="card-surface p-8 text-center text-sm text-slate-400">
          No items found. Click &ldquo;Add New&rdquo; to create your first entry.
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item._id}
              className="card-surface p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-base font-semibold text-slate-100">
                    {item[config.titleField]}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-mono border ${
                      item.status === 'published'
                        ? 'text-emerald-300 bg-emerald-950/40 border-emerald-500/30'
                        : 'text-amber-300 bg-amber-950/40 border-amber-500/30'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                {item[config.metaField] && (
                  <p className="text-xs font-mono text-slate-400 mt-1">
                    {item[config.metaField]}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => openEditForm(item)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B0D12] border border-[#1F2433] hover:border-violet-500/40 text-xs font-mono text-slate-200"
                >
                  <Pencil className="w-3.5 h-3.5 text-violet-400" />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item._id)}
                  aria-label="Delete item"
                  className="p-2 rounded-lg bg-rose-950/30 border border-rose-500/30 text-rose-300 hover:bg-rose-950/50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
