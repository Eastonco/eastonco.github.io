'use client';

import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { supabase } from '@/lib/supabase';

type GuestbookEntry = {
  id: number;
  name: string;
  message: string;
  created_at: string;
};

const NAME_MAX = 60;
const MESSAGE_MAX = 500;
const THROTTLE_MS = 60_000;
const STORAGE_KEY = 'guestbook:lastSubmittedAt';

function getRemainingThrottleMs(): number {
  try {
    const last = localStorage.getItem(STORAGE_KEY);
    if (!last) return 0;
    return Math.max(0, THROTTLE_MS - (Date.now() - Number(last)));
  } catch {
    return 0;
  }
}

function markSubmitted() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    // ignore
  }
}

export default function GuestbookSection() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loadingEntries, setLoadingEntries] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const showNotification = (type: 'success' | 'error', text: string) => {
    setNotification({ type, message: text });
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoadingEntries(true);
      const { data, error } = await supabase
        .from('guestbook_entries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      if (!cancelled) {
        if (error) {
          console.error(error);
          showNotification('error', "couldn't load the guestbook :(");
        } else {
          setEntries(data ?? []);
        }
        setLoadingEntries(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Honeypot: bots fill every field including hidden ones. Fail silently
    // so the bot thinks it worked instead of learning to skip this field.
    if (honeypot.trim() !== '') {
      setName('');
      setMessage('');
      setHoneypot('');
      return;
    }

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedMessage) {
      showNotification('error', 'fill in both fields!!');
      return;
    }
    if (trimmedName.length > NAME_MAX || trimmedMessage.length > MESSAGE_MAX) {
      showNotification('error', 'too long, trim it down');
      return;
    }
    const remaining = getRemainingThrottleMs();
    if (remaining > 0) {
      showNotification('error', `slow down! wait ${Math.ceil(remaining / 1000)}s`);
      return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('guestbook_entries')
        .insert([{ name: trimmedName, message: trimmedMessage }])
        .select()
        .single();
      if (error) throw error;
      setEntries(prev => [data as GuestbookEntry, ...prev].slice(0, 50));
      setName('');
      setMessage('');
      markSubmitted();
      showNotification('success', 'signed!! thanks ✍');
    } catch (err) {
      console.error(err);
      showNotification('error', 'failed to sign, try again');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="guestbook" style={{ position: 'relative', zIndex: 1 }}>
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '32px 32px 80px',
          position: 'relative',
        }}
      >
        <style>{`
          .gbm-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
          @media (max-width: 680px) {
            .gbm-grid { grid-template-columns: 1fr; }
          }
          .gbm-input {
            width: 100%;
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 10px;
            padding: 10px 14px;
            color: #F2F2F5;
            font-family: var(--font-body);
            font-size: 14px;
            outline: none;
            transition: border-color 0.15s, background 0.15s;
          }
          .gbm-input:focus { border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.06); }
          .gbm-input::placeholder { color: rgba(242,242,245,0.35); }
          .gbm-toast {
            position: fixed;
            bottom: 24px; right: 24px;
            font-family: var(--font-body); font-size: 14px;
            padding: 12px 18px;
            border-radius: 12px;
            backdrop-filter: blur(20px);
            box-shadow: 0 8px 32px rgba(0,0,0,0.4);
            z-index: 50;
          }
          .gbm-toast-success { background: rgba(74,222,128,0.12); border: 1px solid rgba(74,222,128,0.3); color: #4ade80; }
          .gbm-toast-error { background: rgba(248,113,113,0.12); border: 1px solid rgba(248,113,113,0.3); color: #f87171; }
        `}</style>

        <span className="fr-label" style={{ display: 'block', marginBottom: 20 }}>
          Guestbook
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 32,
            fontWeight: 700,
            color: '#F2F2F5',
            margin: '0 0 8px',
            letterSpacing: '-0.02em',
          }}
        >
          Leave a note
        </h2>
        <p
          style={{
            fontSize: 14,
            color: 'rgba(242,242,245,0.5)',
            margin: '0 0 32px',
            lineHeight: 1.6,
          }}
        >
          Say hi, drop a link, tell me what brought you here.
        </p>

        <div className="gbm-grid">
          <form onSubmit={handleSubmit} className="fr-card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
              <label
                htmlFor="gb-name"
                className="fr-label"
                style={{ textTransform: 'none', letterSpacing: 0 }}
              >
                Name
              </label>
              <input
                id="gb-name"
                className="gbm-input"
                value={name}
                onChange={e => setName(e.target.value)}
                maxLength={NAME_MAX}
                placeholder="Your name"
                required
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
              <label
                htmlFor="gb-message"
                className="fr-label"
                style={{ textTransform: 'none', letterSpacing: 0 }}
              >
                Message
              </label>
              <textarea
                id="gb-message"
                className="gbm-input"
                value={message}
                onChange={e => setMessage(e.target.value)}
                maxLength={MESSAGE_MAX}
                rows={4}
                placeholder="What's up?"
                style={{ resize: 'vertical' }}
                required
              />
            </div>
            <input
              type="text"
              name="company"
              value={honeypot}
              onChange={e => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }}
            />
            <button
              type="submit"
              className="fr-btn fr-btn-white"
              disabled={submitting}
              style={{ border: 'none' }}
            >
              {submitting ? 'Signing…' : 'Sign the guestbook'}
            </button>
          </form>

          <div
            className="fr-card"
            style={{ padding: 24, display: 'flex', flexDirection: 'column' }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: 12,
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 600, color: '#F2F2F5' }}>
                Signed by visitors
              </span>
              <span className="fr-tag">{entries.length}</span>
            </div>
            <hr className="fr-divider" style={{ marginBottom: 4 }} />
            <div style={{ maxHeight: 320, overflowY: 'auto', paddingRight: 4 }}>
              {loadingEntries ? (
                <p style={{ fontSize: 13, color: 'rgba(242,242,245,0.4)', padding: '10px 4px' }}>
                  Loading…
                </p>
              ) : entries.length === 0 ? (
                <p style={{ fontSize: 13, color: 'rgba(242,242,245,0.4)', padding: '10px 4px' }}>
                  No one has signed yet — be the first.
                </p>
              ) : (
                entries.map(entry => (
                  <div key={entry.id} className="fr-sys" style={{ display: 'block' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#F2F2F5' }}>
                        {entry.name}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          color: 'rgba(242,242,245,0.3)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {formatDistanceToNow(new Date(entry.created_at), { addSuffix: true })}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: 13,
                        color: 'rgba(242,242,245,0.6)',
                        margin: '4px 0 0',
                        lineHeight: 1.5,
                      }}
                    >
                      {entry.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {notification && (
          <div
            role="status"
            className={`gbm-toast ${notification.type === 'success' ? 'gbm-toast-success' : 'gbm-toast-error'}`}
          >
            {notification.message}
          </div>
        )}
      </div>
    </section>
  );
}
