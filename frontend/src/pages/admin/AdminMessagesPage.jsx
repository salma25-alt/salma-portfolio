import { useEffect, useState } from 'react';
import { Mail, MailOpen, Trash2 } from 'lucide-react';
import api from '../../services/api';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await api.get('/admin/messages');
      setMessages(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleToggleRead = async (id) => {
    const res = await api.patch(`/admin/messages/${id}/read`);
    setMessages((prev) =>
      prev.map((m) => (m._id === id ? res.data.data : m))
    );
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message permanently?')) return;
    await api.delete(`/admin/messages/${id}`);
    setMessages((prev) => prev.filter((m) => m._id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Contact Messages</h1>
        <p className="mt-1 text-sm text-slate-400">
          Messages submitted through your public portfolio contact form.
        </p>
      </div>

      {loading ? (
        <p className="font-mono text-sm text-slate-400">Loading messages...</p>
      ) : messages.length === 0 ? (
        <div className="card-surface p-8 text-center text-sm text-slate-400">
          No contact messages yet.
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`card-surface p-6 ${
                !msg.isRead ? 'border-l-4 border-l-cyan-400' : ''
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1F2433]">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-base font-semibold text-slate-100">
                      {msg.subject}
                    </h2>
                    {!msg.isRead && (
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-mono text-slate-400 mt-1">
                    From <span className="text-slate-200">{msg.name}</span> ({msg.email}) •{' '}
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleRead(msg._id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B0D12] border border-[#1F2433] hover:border-violet-500/40 text-xs font-mono text-slate-300"
                  >
                    {msg.isRead ? (
                      <>
                        <Mail className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Mark Unread</span>
                      </>
                    ) : (
                      <>
                        <MailOpen className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Mark Read</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(msg._id)}
                    aria-label="Delete message"
                    className="p-2 rounded-lg bg-rose-950/30 border border-rose-500/30 text-rose-300 hover:bg-rose-950/50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-300 whitespace-pre-line leading-relaxed">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
