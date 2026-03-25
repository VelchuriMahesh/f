import HeroBanner from '../components/HeroBanner';
import ImageGrid from '../components/ImageGrid';
import PageMeta from '../components/PageMeta';
import Reveal from '../components/Reveal';
import SectionCta from '../components/SectionCta';
import SectionHeading from '../components/SectionHeading';
import { designerHighlights, heroContent } from '../data/content';
import useMergedGallery from '../hooks/useMergedGallery';
import useHeroMedia from '../hooks/useHeroMedia';

export default function Designer() {
  const { media: heroMedia } = useHeroMedia('designer');
  const { images: designerGallery, loading } = useMergedGallery('designer');

  return (
    <>
      <PageMeta
        title="Designer Outfits Boutique in Bangalore | Shrusara Fashion Boutique"
        description="Designer gowns, Indo-western looks, and party wear outfits in Bangalore with premium tailoring and boutique finishing."
        keywords="Designer outfits Bangalore, Boutique Bangalore, Indo western boutique Bangalore, party wear boutique"
        canonicalPath="/designer-outfits-bangalore"
      />

      <HeroBanner
        eyebrow={heroContent.designer.eyebrow}
        title={heroContent.designer.title}
        description={heroContent.designer.description}
        image={heroMedia?.imageUrl || heroContent.designer.image}
        videoUrl={heroMedia?.videoUrl}
        primaryLabel="WhatsApp enquiry"
      />

      <Reveal className="section-shell py-12 sm:py-16">
        <SectionHeading
          eyebrow="Boutique Edit"
          title="Occasionwear that feels polished, modern, and easy to wear"
          description="Designed for receptions, parties, festive events, and dressy celebrations where fit and finish matter."
          centered
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {designerHighlights.map((item) => (
            <article key={item.title} className="luxury-card">
              <h2 className="font-heading text-2xl text-ink">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-stone-600">{item.description}</p>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal className="section-shell py-12 sm:py-16">
        <SectionHeading
          eyebrow="Gallery"
          title="Designer outfits that balance trend, comfort, and boutique detail"
          description="Browse local static references first, then any designer looks uploaded from the admin panel."
        />
        <div className="mt-10">
          <ImageGrid
            images={designerGallery.slice(0, 8)}
            loading={loading}
            columnsClassName="sm:grid-cols-2 lg:grid-cols-3"
          />
        </div>
      </Reveal>

      <SectionCta
        title="Send your designer outfit enquiry on WhatsApp"
        description="Share your event type, preferred silhouette, and color palette to get started."
        primaryLabel="WhatsApp enquiry"
      />
    </>
  );
}
