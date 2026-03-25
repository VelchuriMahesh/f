import LazyImage from './LazyImage';
import { contactLinks } from '../data/content';

export default function HeroBanner({
  eyebrow,
  title,
  description,
  image,
  videoUrl,
  primaryLabel = 'WhatsApp',
  secondaryLabel = 'Call Now',
  primaryHref = contactLinks.whatsapp,
  secondaryHref = contactLinks.call
}) {
  return (
    <section className="section-shell pb-12 pt-6 sm:pb-16">
      <div className="relative overflow-hidden rounded-[36px] border border-white/60 shadow-soft">
        {videoUrl ? (
          <video
            key={videoUrl}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={image}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          <LazyImage
            src={image}
            alt={title}
            priority
            sizes="(min-width: 1280px) 1280px, 100vw"
            wrapperClassName="min-h-[520px] sm:min-h-[620px]"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/45 to-ink/10" />
        <div className="relative flex min-h-[520px] items-end px-6 py-8 sm:min-h-[620px] sm:px-10 sm:py-10 lg:px-14">
          <div className="max-w-3xl space-y-6 rounded-[30px] border border-white/20 bg-white/10 p-6 text-white backdrop-blur-md sm:p-8">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-white/80">
              {eyebrow}
            </span>
            <div className="space-y-4">
              <h1 className="font-heading text-4xl leading-tight sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-white/85 sm:text-lg">{description}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a className="button-primary bg-white text-ink hover:bg-sand" href={primaryHref}>
                {primaryLabel}
              </a>
              <a className="button-secondary border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white" href={secondaryHref}>
                {secondaryLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
