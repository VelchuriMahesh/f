import { useEffect, useState } from 'react';
import HeroBanner from '../components/HeroBanner';
import ImageGrid from '../components/ImageGrid';
import PageMeta from '../components/PageMeta';
import Reveal from '../components/Reveal';
import ReviewsSection from '../components/ReviewsSection';
import SectionCta from '../components/SectionCta';
import SectionHeading from '../components/SectionHeading';
import {
  bridalProcess,
  bridalServices,
  fallbackReviews,
  heroContent,
  whyChooseUs
} from '../data/content';
import useMergedGallery from '../hooks/useMergedGallery';
import useHeroMedia from '../hooks/useHeroMedia';
import { fetchReviews } from '../services/api';

export default function Bridal() {
  const [reviews, setReviews] = useState(fallbackReviews);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const { media: heroMedia } = useHeroMedia('bridal');
  const { images: bridalGallery, loading: galleryLoading } = useMergedGallery('bridal');

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

  return (
    <>
      <PageMeta
        title="Bridal Blouse Designer in Bangalore | Shrusara Fashion Boutique"
        description="Customized bridal blouse design in Bangalore with maggam work, Aari work, premium stitching, and tailored fitting."
        keywords="Bridal blouse designer Bangalore, Maggam work blouse, Aari work blouse Bangalore, Boutique Bangalore"
        canonicalPath="/bridal-blouse-designer-bangalore"
      />

      <HeroBanner
        eyebrow={heroContent.bridal.eyebrow}
        title={heroContent.bridal.title}
        description={heroContent.bridal.description}
        image={heroMedia?.imageUrl || heroContent.bridal.image}
        videoUrl={heroMedia?.videoUrl}
      />

      <Reveal className="section-shell py-12 sm:py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { value: 'Made for you', label: 'Pattern and fit adjusted to body type and occasion' },
            { value: 'Detail first', label: 'Embroidery placement designed for saree and jewellery balance' },
            { value: 'Timely finish', label: 'Trials and final delivery planned around event timelines' }
          ].map((item) => (
            <div key={item.value} className="luxury-card">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cocoa">Trust Bar</p>
              <h2 className="mt-4 font-heading text-2xl text-ink">{item.value}</h2>
              <p className="mt-3 text-sm leading-7 text-stone-600">{item.label}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="section-shell py-12 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="luxury-card">
            <SectionHeading
              eyebrow="Services"
              title="What this bridal blouse service includes"
              description="Focused support from concept stage to final fitting."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {bridalServices.map((service) => (
              <div
                key={service}
                className="rounded-[24px] border border-white/60 bg-white/85 px-5 py-6 shadow-card"
              >
                <p className="text-sm font-medium text-ink">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="section-shell py-12 sm:py-16">
        <SectionHeading
          eyebrow="Bridal Gallery"
          title="Customized blouse concepts and premium boutique finishes"
          description="Static bridal references appear first, followed by any bridal images added from the admin panel."
        />
        <div className="mt-10">
          <ImageGrid images={bridalGallery.slice(0, 10)} loading={galleryLoading} priority />
        </div>
      </Reveal>

      <Reveal className="section-shell py-12 sm:py-16">
        <div className="glass-panel p-6 sm:p-8 lg:p-10">
          <SectionHeading
            eyebrow="Why Shrusara"
            title="A bridal process that feels personal, not rushed"
            description="We focus on the details that improve both the fit and the final photographs."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {whyChooseUs.map((item) => (
              <div key={item} className="rounded-[24px] bg-white/90 px-5 py-6 text-sm font-semibold text-ink shadow-card">
                {item}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="section-shell py-12 sm:py-16">
        <SectionHeading
          eyebrow="Process"
          title="A simple boutique flow from consultation to final fitting"
          description="Clear steps help high-intent visitors feel ready to enquire."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {bridalProcess.map((step) => (
            <article key={step.title} className="luxury-card">
              <h3 className="font-heading text-2xl text-ink">{step.title}</h3>
              <p className="mt-4 text-sm leading-7 text-stone-600">{step.description}</p>
            </article>
          ))}
        </div>
      </Reveal>

      <ReviewsSection
        payload={reviews}
        loading={reviewsLoading}
        description="Recent reviews from bridal and boutique clients help reinforce trust before a WhatsApp enquiry."
      />

      <SectionCta
        title="Book your bridal blouse consultation on WhatsApp"
        description="Tell us your wedding date, saree palette, and the kind of maggam or Aari work you prefer."
      />
    </>
  );
}
