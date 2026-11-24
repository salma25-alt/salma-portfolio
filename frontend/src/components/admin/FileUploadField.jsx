import { useState } from 'react';
import { Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../../services/api';

export default function FileUploadField({
  label,
  value,
  onChange,
  folder = 'salma-portfolio',
  accept = 'image/*,application/pdf',
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    try {
      const res = await api.post('/admin/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onChange(res.data.data.url);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Upload failed. Check Cloudinary credentials in backend/.env.'
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
        {label}
      </label>

      <div className="flex flex-col sm:flex-row gap-2.5">
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://... or upload file"
          className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#0B0D12] border border-[#1F2433] text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500"
        />

        <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#181C28] border border-[#1F2433] hover:border-cyan-500/40 text-xs font-mono text-cyan-300 cursor-pointer transition-colors shrink-0">
          <Upload className="w-3.5 h-3.5" />
          <span>{uploading ? 'Uploading...' : 'Upload File'}</span>
          <input
            type="file"
            accept={accept}
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {value && (
        <p className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 truncate">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{value}</span>
        </p>
      )}

      {error && (
        <p className="text-xs text-rose-400 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
