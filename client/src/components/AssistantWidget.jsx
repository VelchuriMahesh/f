import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { assistantReplies, contactLinks } from '../data/content';

const quickReplies = [
  { key: 'pricing', label: 'Pricing' },
  { key: 'booking', label: 'Booking' },
  { key: 'location', label: 'Location' }
];

export default function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Need quick help with pricing, booking, or location? Tap a reply below.'
    }
  ]);

  function handleReply(type) {
    setMessages((current) => [
      ...current,
      { id: `user-${type}-${current.length}`, role: 'user', text: quickReplies.find((item) => item.key === type)?.label || type },
      { id: `assistant-${type}-${current.length}`, role: 'assistant', text: assistantReplies[type] }
    ]);
  }

  return (
    <div className="fixed bottom-5 right-4 z-[65] flex items-end">
      <AnimatePresence>
        {open ? (
          <motion.div
            className="glass-panel mb-4 w-[min(92vw,360px)] overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.22 }}
          >
            <div className="border-b border-white/70 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cocoa">
                Shrusara Assistant
              </p>
              <p className="mt-2 text-sm text-stone-600">
                Quick boutique help for high-intent visitors.
              </p>
            </div>

            <div className="max-h-80 space-y-3 overflow-y-auto px-5 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`max-w-[88%] rounded-[22px] px-4 py-3 text-sm leading-7 ${
                    message.role === 'assistant'
                      ? 'bg-white text-stone-700 shadow-card'
                      : 'ml-auto bg-ink text-white'
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>

            <div className="border-t border-white/70 px-5 py-4">
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    className="button-secondary px-4 py-2 text-xs"
                    onClick={() => handleReply(item.key)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <a
                className="button-primary mt-4 w-full"
                href={contactLinks.whatsapp}
                target="_blank"
                rel="noreferrer"
              >
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-ink text-white shadow-soft"
        whileTap={{ scale: 0.96 }}
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Toggle Shrusara assistant"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-[1.8]">
          <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v6A2.5 2.5 0 0 1 17.5 15H10l-4 4v-4H6.5A2.5 2.5 0 0 1 4 12.5v-6Z" />
          <path d="M8 8.5h8M8 11.5h5" />
        </svg>
      </motion.button>
    </div>
  );
}

