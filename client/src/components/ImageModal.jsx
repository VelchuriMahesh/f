import { useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { contactLinks } from '../data/content';
import LazyImage from './LazyImage';

function buildWhatsAppMessage(item) {
  const title = item.title || item.alt || 'Boutique design';
  const description =
    item.description ||
    item.alt ||
    'A premium boutique design with custom detailing and tailored finishing.';
  const lines = [
    'I am interested in this design:',
    `Title: ${title}`,
    `Description: ${description}`
  ];

  if (item.url) {
    lines.push(`Image: ${item.url}`);
  }

  return `${contactLinks.whatsapp.split('?')[0]}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export default function ImageModal({ item, onClose }) {
  useEffect(() => {
    if (!item) {
      return undefined;
    }

    // Keep scroll locked at the current position so modal opening doesn't jump
    const scrollY = window.scrollY;
    const previousBodyStyle = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width
    };

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyStyle.overflow;
      document.body.style.position = previousBodyStyle.position;
      document.body.style.top = previousBodyStyle.top;
      document.body.style.width = previousBodyStyle.width;
      window.scrollTo(0, scrollY);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  const whatsappLink = useMemo(() => (item ? buildWhatsAppMessage(item) : '#'), [item]);

  if (!item) {
    return null;
  }

  const title = item.title || item.alt || 'Boutique design';
  const description =
    item.description ||
    item.alt ||
    'A custom boutique design with premium finishing, thoughtful fit, and celebration-ready detailing.';

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <motion.div
          className="glass-panel relative max-h-[92vh] w-full max-w-5xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 24 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/85 text-ink shadow-soft"
            aria-label="Close design preview"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
              <path d="M6 6 18 18M18 6 6 18" />
            </svg>
          </button>

          <div className="grid max-h-[92vh] overflow-auto lg:grid-cols-[1.1fr_0.9fr]">
            <LazyImage
              src={item.url || item.thumbUrl}
              alt={title}
              priority
              sizes="(min-width: 1024px) 60vw, 100vw"
              wrapperClassName="min-h-[360px] lg:min-h-[620px]"
            />
            <div className="flex flex-col justify-between gap-6 p-6 sm:p-8">
              <div className="space-y-4">
                <span className="eyebrow">Design Preview</span>
                <h3 className="font-heading text-3xl leading-tight text-ink sm:text-4xl">{title}</h3>
                <p className="text-base leading-8 text-stone-600">{description}</p>
              </div>

              <div className="space-y-3">
                <a
                  className="button-primary w-full"
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  Order on WhatsApp
                </a>
                <button className="button-secondary w-full" type="button" onClick={onClose}>
                  Continue browsing
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
