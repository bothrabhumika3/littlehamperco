import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

interface OccasionCardData {
  title: string;
  description: string;
  path: string;
  image: string;
  tag: string;
}

export const ShopByOccasion: React.FC = () => {
  const occasions: OccasionCardData[] = [
    {
      title: 'Weddings & Bridal',
      description: 'Wedding welcome hampers, bridal hampers, bridesmaid hampers and guest gifting.',
      path: '/weddings',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
      tag: 'Royal Curation',
    },
    {
      title: 'Baby Showers & Newborn',
      description: 'Cute baby shower hampers, mom-to-be hampers and newborn gifting.',
      path: '/baby-shower',
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      tag: 'Gentle & Organic',
    },
    {
      title: 'Birthdays',
      description: 'Fun, personalized birthday hampers packed with sweetness and celebration vibes.',
      path: '/shop/birthday',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
      tag: 'Pure Joy',
    },
    {
      title: 'Anniversaries',
      description: 'Elegant romantic hampers designed to celebrate milestones and lasting love.',
      path: '/shop?occasion=anniversary',
      image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
      tag: 'Romantic Keepsakes',
    },
    {
      title: 'Corporate & Executive',
      description: 'Premium employee, client gifting, festival packs and bespoke branded hampers.',
      path: '/corporate',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80',
      tag: 'Executive Quality',
    },
    {
      title: 'Festivals & Celebrations',
      description: 'Festive food and gifting hampers blending royal dry fruits, mithai and modern bakes.',
      path: '/shop/festivals',
      image: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=800&q=80',
      tag: 'Traditional & Modern',
    },
    {
      title: 'Housewarming',
      description: 'Thoughtful new-home hampers filled with pantry staples, fragrances and wooden ware.',
      path: '/shop?occasion=housewarming',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
      tag: 'Warm Blessings',
    },
    {
      title: 'Return Gifts & Favors',
      description: 'Beautiful giveaways for weddings, birthdays, poojas and milestone gatherings.',
      path: '/shop/return-gifts',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
      tag: 'Event Favors',
    },
  ];

  return (
    <section className="py-16 bg-cream-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-widest text-brand-600 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>Tailored To What You Celebrate</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-950 tracking-tight">
            A Hamper for Every Occasion
          </h2>
          <p className="text-sm text-stone-600 mt-2 leading-relaxed">
            From intimate birthday surprises to 500-guest wedding welcome suites, Little Hamper Co. crafts memories that linger long after the box is opened.
          </p>
        </div>

        {/* Occasions Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {occasions.map((occ) => (
            <Link
              key={occ.title}
              to={occ.path}
              className="group bg-white rounded-3xl overflow-hidden border border-cream-200/80 shadow-subtle hover:shadow-hover transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-cream-100">
                <img
                  src={occ.image}
                  alt={occ.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[10px] font-bold uppercase tracking-wider text-charcoal-800 px-2.5 py-1 rounded-full border border-cream-200">
                  {occ.tag}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-charcoal-900 group-hover:text-brand-600 transition-colors">
                    {occ.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                    {occ.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-cream-100 flex items-center justify-between text-xs font-bold text-brand-600 group-hover:translate-x-0.5 transition-transform">
                  <span>Explore Occasion</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
