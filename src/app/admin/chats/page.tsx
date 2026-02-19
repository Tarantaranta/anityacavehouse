'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Lock,
  MessageCircle,
  Users,
  Calendar,
  Map,
  Search,
  ChevronDown,
  ChevronUp,
  X,
  Download,
  Globe,
  Tag,
  BarChart2,
  Eye,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface StoredMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatSession {
  id: string;
  startTime: string;
  endTime: string;
  language: string;
  messages: StoredMessage[];
  messageCount: number;
  hasTravelPlan: boolean;
  topics: string[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const LANG_LABELS: Record<string, string> = { tr: '🇹🇷 Türkçe', en: '🇬🇧 English', zh: '🇨🇳 中文' };

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('tr-TR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function formatDateShort(iso: string) {
  return new Date(iso).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function isToday(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  return d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
}

function isThisWeek(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  return d >= weekAgo;
}

function firstUserMessage(session: ChatSession): string {
  const msg = session.messages.find((m) => m.role === 'user');
  return msg ? msg.content.slice(0, 80) + (msg.content.length > 80 ? '…' : '') : '—';
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ icon, label, value, sub, color }: { icon: React.ReactNode; label: string; value: string | number; sub?: string; color: string }) {
  return (
    <div className={`bg-white rounded-2xl p-5 border border-neutral-200 shadow-sm flex items-start gap-4`}>
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-neutral-500 font-medium uppercase tracking-wide">{label}</p>
        <p className="text-2xl font-bold text-neutral-900 mt-0.5">{value}</p>
        {sub && <p className="text-xs text-neutral-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function TopicBadge({ topic, count }: { topic: string; count: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium rounded-full">
      <Tag className="w-3 h-3" />
      {topic}
      <span className="bg-amber-200 text-amber-900 rounded-full px-1.5 py-0.5 text-[10px] font-bold">{count}</span>
    </span>
  );
}

function MessageBubble({ msg }: { msg: StoredMessage }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
        isUser
          ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white rounded-br-md'
          : 'bg-white border border-neutral-200 text-neutral-800 rounded-bl-md shadow-sm'
      }`}>
        {msg.content}
      </div>
    </div>
  );
}

// ─── Login Screen ─────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: (pw: string) => void }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/admin/chats', {
        headers: { 'x-admin-password': pw },
      });
      if (res.ok) {
        sessionStorage.setItem('anitya_admin_pw', pw);
        onLogin(pw);
      } else {
        setError(true);
        setShake(true);
        setTimeout(() => setShake(false), 600);
        setPw('');
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 to-amber-50 flex items-center justify-center p-4">
      <div className={`bg-white rounded-3xl shadow-2xl border border-neutral-200 p-10 w-full max-w-sm transition-all ${shake ? 'animate-pulse' : ''}`}>
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900">Admin Paneli</h1>
          <p className="text-neutral-500 text-sm mt-1">Anitya Cave House · Chat Analytics</p>
        </div>
        <form onSubmit={handle} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wide block mb-1.5">Şifre</label>
            <input
              type="password"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setError(false); }}
              placeholder="Admin şifresi"
              autoFocus
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors ${
                error ? 'border-red-400 bg-red-50' : 'border-neutral-300 bg-neutral-50'
              }`}
            />
            {error && <p className="text-red-500 text-xs mt-1.5">Hatalı şifre. Tekrar deneyin.</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-br from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold rounded-xl transition-all text-sm disabled:opacity-60"
          >
            {loading ? 'Doğrulanıyor…' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Conversation Detail Modal ─────────────────────────────────────────────────

function ConversationModal({ session, onClose }: { session: ChatSession; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between flex-shrink-0">
          <div>
            <h3 className="font-bold text-neutral-900 text-base">Konuşma Detayı</h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              {LANG_LABELS[session.language] || session.language} · {formatDate(session.startTime)} · {session.messageCount} mesaj
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors">
            <X className="w-4 h-4 text-neutral-500" />
          </button>
        </div>

        {/* Topics */}
        {session.topics.length > 0 && (
          <div className="px-6 py-3 border-b border-neutral-100 flex flex-wrap gap-1.5 flex-shrink-0">
            {session.topics.map((t) => (
              <span key={t} className="px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-medium rounded-full">{t}</span>
            ))}
            {session.hasTravelPlan && (
              <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-medium rounded-full flex items-center gap-1">
                <Map className="w-3 h-3" /> Gezi Planı
              </span>
            )}
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 bg-neutral-50">
          {session.messages.map((msg, i) => (
            <MessageBubble key={i} msg={msg} />
          ))}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-neutral-200 flex items-center justify-between flex-shrink-0 bg-white rounded-b-2xl">
          <span className="text-xs text-neutral-400">Bitiş: {formatDate(session.endTime)}</span>
          <button onClick={onClose} className="px-4 py-2 bg-neutral-900 hover:bg-neutral-700 text-white text-xs font-semibold rounded-xl transition-colors">
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

function Dashboard({ password }: { password: string }) {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filterLang, setFilterLang] = useState('');
  const [filterTopic, setFilterTopic] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [selected, setSelected] = useState<ChatSession | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/chats', {
      headers: { 'x-admin-password': password },
    })
      .then((r) => {
        if (!r.ok) throw new Error('Unauthorized');
        return r.json();
      })
      .then((data) => { setSessions(data); setLoading(false); })
      .catch((e) => { setError(e.message); setLoading(false); });
  }, []);

  // ── Stats ──────────────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const total = sessions.length;
    const today = sessions.filter((s) => isToday(s.endTime)).length;
    const week = sessions.filter((s) => isThisWeek(s.endTime)).length;
    const travelPlans = sessions.filter((s) => s.hasTravelPlan).length;
    const avgMessages = total ? Math.round(sessions.reduce((a, s) => a + s.messageCount, 0) / total) : 0;
    return { total, today, week, travelPlans, avgMessages };
  }, [sessions]);

  const langCounts = useMemo(() => {
    const map: Record<string, number> = {};
    sessions.forEach((s) => { map[s.language] = (map[s.language] || 0) + 1; });
    return map;
  }, [sessions]);

  const topicCounts = useMemo(() => {
    const map: Record<string, number> = {};
    sessions.forEach((s) => s.topics.forEach((t) => { map[t] = (map[t] || 0) + 1; }));
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [sessions]);

  const allTopics = useMemo(() => topicCounts.map(([t]) => t), [topicCounts]);

  // ── Daily chart data (last 14 days) ──────────────────────────────────────
  const dailyData = useMemo(() => {
    const days: Record<string, number> = {};
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days[formatDateShort(d.toISOString())] = 0;
    }
    sessions.forEach((s) => {
      const key = formatDateShort(s.endTime);
      if (key in days) days[key]++;
    });
    return Object.entries(days);
  }, [sessions]);

  const maxDay = useMemo(() => Math.max(1, ...dailyData.map(([, v]) => v)), [dailyData]);

  // ── Filtered list ──────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return sessions.filter((s) => {
      if (filterLang && s.language !== filterLang) return false;
      if (filterTopic && !s.topics.includes(filterTopic)) return false;
      if (filterDate === 'today' && !isToday(s.endTime)) return false;
      if (filterDate === 'week' && !isThisWeek(s.endTime)) return false;
      if (search) {
        const q = search.toLowerCase();
        const matchMsg = s.messages.some((m) => m.content.toLowerCase().includes(q));
        if (!matchMsg) return false;
      }
      return true;
    });
  }, [sessions, filterLang, filterTopic, filterDate, search]);

  // ── Export CSV ──────────────────────────────────────────────────────────────
  const exportCSV = () => {
    const rows = [
      ['ID', 'Tarih', 'Dil', 'Mesaj Sayısı', 'Gezi Planı', 'Konular', 'İlk Mesaj'].join(','),
      ...filtered.map((s) =>
        [
          s.id,
          `"${formatDate(s.endTime)}"`,
          s.language,
          s.messageCount,
          s.hasTravelPlan ? 'Evet' : 'Hayır',
          `"${s.topics.join('; ')}"`,
          `"${firstUserMessage(s).replace(/"/g, '""')}"`,
        ].join(',')
      ),
    ];
    const blob = new Blob(['\uFEFF' + rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `anitya-chats-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-500 text-sm">Konuşmalar yükleniyor…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow border border-red-200 text-center max-w-sm">
          <p className="text-red-600 font-semibold mb-2">Hata</p>
          <p className="text-neutral-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h1 className="font-bold text-neutral-900 text-base leading-tight">Anitya Chat Admin</h1>
              <p className="text-xs text-neutral-400">Konuşma takibi & istatistikler</p>
            </div>
          </div>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-neutral-700 text-white text-xs font-semibold rounded-xl transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            CSV İndir ({filtered.length})
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* ── Stats Cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <StatCard icon={<Users className="w-5 h-5 text-amber-700" />} label="Toplam Konuşma" value={stats.total} color="bg-amber-100" />
          <StatCard icon={<Calendar className="w-5 h-5 text-sky-700" />} label="Bugün" value={stats.today} sub={`Bu hafta: ${stats.week}`} color="bg-sky-100" />
          <StatCard icon={<BarChart2 className="w-5 h-5 text-violet-700" />} label="Ort. Mesaj" value={stats.avgMessages} sub="mesaj/konuşma" color="bg-violet-100" />
          <StatCard icon={<Map className="w-5 h-5 text-emerald-700" />} label="Gezi Planı" value={stats.travelPlans} sub={`%${stats.total ? Math.round((stats.travelPlans / stats.total) * 100) : 0} oran`} color="bg-emerald-100" />
          <StatCard
            icon={<Globe className="w-5 h-5 text-rose-700" />}
            label="Diller"
            value={Object.keys(langCounts).length}
            sub={Object.entries(langCounts).map(([l, n]) => `${LANG_LABELS[l]?.split(' ')[0] || l}: ${n}`).join(' · ')}
            color="bg-rose-100"
          />
        </div>

        {/* ── Daily Bar Chart ── */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6">
          <h2 className="text-sm font-bold text-neutral-700 uppercase tracking-wide mb-5 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-amber-600" />
            Son 14 Gün — Günlük Konuşma
          </h2>
          <div className="flex items-end gap-1.5 h-28">
            {dailyData.map(([date, count]) => (
              <div key={date} className="flex-1 flex flex-col items-center gap-1 group">
                <span className="text-[9px] text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">{count}</span>
                <div
                  className="w-full bg-amber-500 rounded-t-sm transition-all hover:bg-amber-600"
                  style={{ height: `${(count / maxDay) * 96}px`, minHeight: count > 0 ? '4px' : '0' }}
                />
                <span className="text-[8px] text-neutral-400 rotate-45 origin-left mt-1 whitespace-nowrap">
                  {date.slice(0, 5)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Topics & Language Row ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Topics */}
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6">
            <h2 className="text-sm font-bold text-neutral-700 uppercase tracking-wide mb-4 flex items-center gap-2">
              <Tag className="w-4 h-4 text-amber-600" />
              Konu Dağılımı
            </h2>
            <div className="flex flex-wrap gap-2">
              {topicCounts.length === 0 && <p className="text-neutral-400 text-sm">Henüz konu yok</p>}
              {topicCounts.map(([topic, count]) => (
                <TopicBadge key={topic} topic={topic} count={count} />
              ))}
            </div>
          </div>

          {/* Language Distribution */}
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6">
            <h2 className="text-sm font-bold text-neutral-700 uppercase tracking-wide mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4 text-amber-600" />
              Dil Dağılımı
            </h2>
            <div className="space-y-3">
              {Object.entries(langCounts).map(([lang, count]) => (
                <div key={lang} className="flex items-center gap-3">
                  <span className="text-sm w-28 flex-shrink-0">{LANG_LABELS[lang] || lang}</span>
                  <div className="flex-1 bg-neutral-100 rounded-full h-2.5">
                    <div
                      className="bg-amber-500 h-2.5 rounded-full transition-all"
                      style={{ width: `${Math.round((count / (stats.total || 1)) * 100)}%` }}
                    />
                  </div>
                  <span className="text-xs text-neutral-500 w-10 text-right">
                    {Math.round((count / (stats.total || 1)) * 100)}%
                  </span>
                </div>
              ))}
              {Object.keys(langCounts).length === 0 && <p className="text-neutral-400 text-sm">Henüz veri yok</p>}
            </div>
          </div>
        </div>

        {/* ── Filter & Search ── */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Mesajlarda ara…"
                className="w-full pl-9 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            {/* Language filter */}
            <select
              value={filterLang}
              onChange={(e) => setFilterLang(e.target.value)}
              className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-neutral-700"
            >
              <option value="">Tüm Diller</option>
              <option value="tr">🇹🇷 Türkçe</option>
              <option value="en">🇬🇧 English</option>
              <option value="zh">🇨🇳 中文</option>
            </select>
            {/* Topic filter */}
            <select
              value={filterTopic}
              onChange={(e) => setFilterTopic(e.target.value)}
              className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-neutral-700"
            >
              <option value="">Tüm Konular</option>
              {allTopics.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            {/* Date filter */}
            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-neutral-700"
            >
              <option value="">Tüm Tarihler</option>
              <option value="today">Bugün</option>
              <option value="week">Bu Hafta</option>
            </select>
          </div>
          {/* Active filter indicators */}
          {(search || filterLang || filterTopic || filterDate) && (
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <span className="text-xs text-neutral-500">{filtered.length} sonuç</span>
              <button
                onClick={() => { setSearch(''); setFilterLang(''); setFilterTopic(''); setFilterDate(''); }}
                className="text-xs text-amber-600 hover:text-amber-700 font-medium underline"
              >
                Filtreleri temizle
              </button>
            </div>
          )}
        </div>

        {/* ── Conversation List ── */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-neutral-700 uppercase tracking-wide flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-amber-600" />
            Konuşmalar ({filtered.length})
          </h2>

          {filtered.length === 0 && (
            <div className="bg-white rounded-2xl border border-neutral-200 p-10 text-center text-neutral-400 text-sm">
              Konuşma bulunamadı.
            </div>
          )}

          {filtered.map((session) => {
            const isExpanded = expandedId === session.id;
            return (
              <div key={session.id} className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
                {/* Row */}
                <div
                  className="px-5 py-4 flex items-start gap-4 cursor-pointer hover:bg-neutral-50 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : session.id)}
                >
                  {/* Lang badge */}
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0 text-lg">
                    {session.language === 'tr' ? '🇹🇷' : session.language === 'en' ? '🇬🇧' : session.language === 'zh' ? '🇨🇳' : '🌐'}
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xs font-semibold text-neutral-500">{formatDate(session.endTime)}</span>
                      <span className="text-xs text-neutral-400">·</span>
                      <span className="text-xs text-neutral-500">{session.messageCount} mesaj</span>
                      {session.hasTravelPlan && (
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-semibold rounded-full flex items-center gap-1">
                          <Map className="w-2.5 h-2.5" /> Gezi Planı
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-neutral-700 truncate">{firstUserMessage(session)}</p>
                    {session.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {session.topics.map((t) => (
                          <span key={t} className="px-2 py-0.5 bg-neutral-100 text-neutral-600 text-[10px] rounded-full">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setSelected(session); }}
                      className="w-8 h-8 rounded-lg hover:bg-amber-100 flex items-center justify-center transition-colors"
                      title="Tam ekranda görüntüle"
                    >
                      <Eye className="w-4 h-4 text-amber-700" />
                    </button>
                    {isExpanded
                      ? <ChevronUp className="w-4 h-4 text-neutral-400" />
                      : <ChevronDown className="w-4 h-4 text-neutral-400" />}
                  </div>
                </div>

                {/* Inline Expanded Preview */}
                {isExpanded && (
                  <div className="border-t border-neutral-100 px-5 py-4 bg-neutral-50 max-h-80 overflow-y-auto">
                    {session.messages.map((msg, i) => (
                      <MessageBubble key={i} msg={msg} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* Detail Modal */}
      {selected && <ConversationModal session={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

// ─── Root Page ────────────────────────────────────────────────────────────────

export default function AdminChatsPage() {
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem('anitya_admin_pw');
    if (saved) setPassword(saved);
    setChecked(true);
  }, []);

  if (!checked) return null;
  if (!password) return <LoginScreen onLogin={(pw) => setPassword(pw)} />;
  return <Dashboard password={password} />;
}
