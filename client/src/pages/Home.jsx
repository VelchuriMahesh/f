import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import ImageGrid from '../components/ImageGrid';
import PageMeta from '../components/PageMeta';
import Reveal from '../components/Reveal';
import ReviewsSection from '../components/ReviewsSection';
import SectionCta from '../components/SectionCta';
import SectionHeading from '../components/SectionHeading';
import {
  aboutHighlights,
  aboutStory,
  contactLinks,
  fallbackReviews,
  heroContent,
  homeServices,
  whyChooseUs
} from '../data/content';
import { categoryPreviewCards } from '../data/staticImages';
import useMergedGallery from '../hooks/useMergedGallery';
import useHeroMedia from '../hooks/useHeroMedia';
import { fetchReviews } from '../services/api';

export default function Home() {
  const [reviews, setReviews] = useState(fallbackReviews);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const { media: heroMedia } = useHeroMedia('home');
  const { images: homeGallery, loading: galleryLoading } = useMergedGallery('home');

  useEffect(() => {
    let mounted = true;

    fetchReviews()
      .then((response) => {
        if (mounted && response.reviews?.length) {
          setReviews(response);
        }
      })
      .finally(() => {
        if (mounted) {
          setReviewsLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: 'Shrusara Fashion Boutique',
    url: contactLinks.siteUrl,
    telephone: contactLinks.phoneDisplay,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Mahalakshmipuram',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      postalCode: '560086',
      addressCountry: 'IN'
    }
  };

  return (
    <>
      <PageMeta
        title="Bridal Blouse Designer & Designer Boutique in Bangalore | Shrusara Fashion Boutique"
        description="Customized bridal blouses, lehengas, gowns, and designer outfits tailored to your style, body type, and occasion in Bangalore."
        keywords="Bridal blouse designer Bangalore, Maggam work blouse, Boutique Bangalore, Designer boutique Bangalore"
        canonicalPath="/"
        schema={schema}
      />

      <HeroBanner
        eyebrow={heroContent.home.eyebrow}
        title={heroContent.home.title}
        description={heroContent.home.description}
        image={heroMedia?.imageUrl || heroContent.home.image}
        videoUrl={heroMedia?.videoUrl}
      />

      <Reveal className="section-shell py-12 sm:py-16">
        <SectionHeading
          eyebrow="Services"
          title="Tailored services for bridal, festive, and occasion wear"
          description="Every category is designed to feel intentional, premium, and flattering rather than overworked."
          centered
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {homeServices.map((service) => (
            <article key={service.title} className="luxury-card">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cocoa">
                Boutique Service
              </p>
              <h2 className="mt-4 font-heading text-2xl text-ink">{service.title}</h2>
              <p className="mt-3 text-sm leading-7 text-stone-600">{service.description}</p>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal className="section-shell py-12 sm:py-16">
        <div className="glass-panel p-6 sm:p-8 lg:p-10">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Boutique craftsmanship with a calm, guided experience"
            description="Clients choose us for pieces that photograph beautifully and feel comfortable to wear for long events."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {whyChooseUs.map((item) => (
              <div
                key={item}
                className="rounded-[24px] border border-ink/8 bg-white/80 px-5 py-6 text-center text-sm font-semibold text-ink shadow-card"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="section-shell py-12 sm:py-16">
        <SectionHeading
          eyebrow="Gallery"
          title="A quick look at our premium boutique aesthetic"
          description="Large visuals, clean silhouettes, and handcrafted detail that build trust quickly for ad visitors."
        />
        <div className="mt-10">
          <ImageGrid images={homeGallery.slice(0, 8)} loading={galleryLoading} carouselOnMobile />
        </div>
      </Reveal>

      <Reveal className="section-shell py-12 sm:py-16">
        <SectionHeading
          eyebrow="Explore Categories"
          title="Move into the exact collection you want to browse"
          description="Each boutique category has its own focused landing page so the journey stays clean and conversion-friendly."
          centered
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {categoryPreviewCards.map((card) => (
            <Link
              key={card.category}
              to={card.to}
              className="group relative min-h-[360px] overflow-hidden rounded-[30px] border border-white/70 shadow-card"
            >
              <img
                src={card.image}
                alt={card.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/45 to-ink/10 transition duration-300 group-hover:from-ink/72 group-hover:via-ink/36" />
              <div className="relative flex h-full flex-col justify-end p-8 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/75">
                  Boutique Collection
                </p>
                <h2 className="mt-3 font-heading text-4xl">{card.title}</h2>
                <p className="mt-3 max-w-xs text-sm leading-7 text-white/80">{card.description}</p>
                <span className="mt-6 inline-flex w-fit rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  View category
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Reveal>

      <Reveal className="section-shell py-12 sm:py-16">
        <div className="glass-panel p-6 sm:p-8 lg:p-10">
          <SectionHeading
            eyebrow="About Shrusara"
            title="A boutique experience shaped around fit, detail, and occasion."
            description={aboutStory.short}
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {aboutHighlights.map((item) => (
              <article key={item.title} className="rounded-[24px] bg-white/90 p-5 shadow-card">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linen text-cocoa">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
                    <path d="m5 12 4.2 4.2L19 6.5" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-stone-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      <ReviewsSection payload={reviews} loading={reviewsLoading} />

      <SectionCta title="Book your consultation on WhatsApp" />
    </>
  );
}
