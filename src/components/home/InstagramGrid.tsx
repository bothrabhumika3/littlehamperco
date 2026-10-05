import React from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { InstagramIcon } from '../common/InstagramIcon';
import { BrandLogo } from '../common/BrandLogo';
import { siteConfig } from '../../config/siteConfig';

export const InstagramGrid: React.FC = () => {
  // Story highlights directly matching Priya Jain's actual Instagram account
  const storyHighlights = [
    { title: 'Rakhi 2026', emoji: '🪡', color: 'from-amber-100 to-rose-100' },
    { title: 'reviews 💖', emoji: '⭐', color: 'from-rose-100 to-pink-100' },
    { title: 'baby hampers', emoji: '🧸', color: 'from-blue-100 to-amber-100' },
    { title: 'sawan teez', emoji: '🌿', color: 'from-emerald-100 to-teal-100' },
    { title: '#birthday', emoji: '🎂', color: 'from-purple-100 to-pink-100' },
    { title: 'groom to be', emoji: '🤵', color: 'from-slate-100 to-stone-200' },
    { title: 'friendship', emoji: '💌', color: 'from-orange-100 to-yellow-100' },
    { title: 'theme hampers', emoji: '🥑', color: 'from-lime-100 to-emerald-100' },
    { title: 'room hampers', emoji: '🏨', color: 'from-amber-100 to-stone-100' },
    { title: 'Anniversary', emoji: '💍', color: 'from-rose-100 to-red-100' },
  ];

  // Authentic hamper categories featured on @the.littlehamperco
  const posts = [
    {
      img: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80',
      caption: 'Teacher’s Day bespoke appreciation hampers with desk plants & personalized stationery 🌿',
      tag: 'Teacher’s Day',
    },
    {
      img: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80',
      caption: '“Momacado to be & Papacado” custom baby shower trunk in pastel green 🥑✨',
      tag: 'Baby Shower',
    },
    {
      img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&q=80',
      caption: 'Destination wedding room welcome baskets packed with royal kahwa & dry fruits 🏰',
      tag: 'Wedding Favors',
    },
    {
      img: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80',
      caption: 'Artisanal Belgian chocolate truffles in gold foil slide chests 🍫✨',
      tag: 'Chocolates',
    },
    {
      img: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=600&q=80',
      caption: 'Fresh morning orchard harvest hamper with exotic berries and California almonds 🍓',
      tag: 'Fresh Fruits',
    },
    {
      img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
      caption: 'Relaxing lavender aromatherapy & soy candle self-care care package 🕯️💜',
      tag: 'Self Care',
    },
  ];

  return (
    <section className="py-16 bg-cream-50/50 border-t border-cream-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Instagram Profile Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-subtle mb-10 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Real Logo in Circular Ring */}
            <div className="relative shrink-0">
              <BrandLogo variant="circle" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-xs">
                <InstagramIcon className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <h3 className="font-serif text-2xl font-bold text-charcoal-950">
                  {siteConfig.instagram}
                </h3>
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 bg-brand-500 hover:bg-brand-600 text-white rounded-full text-xs font-bold transition-all shadow-xs"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>Follow on Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Stats */}
              <div className="flex justify-center sm:justify-start items-center gap-6 text-xs text-charcoal-900 py-1">
                <span>
                  <strong>2,050+</strong> followers
                </span>
                <span>
                  <strong>Bangalore</strong> based
                </span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Pan-India Shipping</span>
                </span>
              </div>

              {/* Bio snippet */}
              <div className="text-xs text-stone-600 leading-relaxed max-w-xl">
                <p className="font-semibold text-charcoal-900">
                  {siteConfig.brandName} &bull; Gift Hamper Bangalore
                </p>
                <p className="text-stone-500 text-[11px] font-serif italic">
                  ~ By Priya Jain
                </p>
                <p className="text-[11px] text-stone-500 mt-1">
                  Customized Gift Hampers 🎉 Corporate Gifting 🏢 Fresh Food Platters 🍱 Bouquets 💐 Wedding Packing 💍
                </p>
              </div>
            </div>
          </div>

          {/* Instagram Story Highlights Scrollable Carousel */}
          <div className="mt-8 pt-6 border-t border-cream-100">
            <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-3 text-center sm:text-left">
              Studio Story Highlights
            </p>
            <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none">
              {storyHighlights.map((st, i) => (
                <a
                  key={i}
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-1.5 shrink-0 group"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 transition-transform group-hover:scale-105">
                    <div className="w-full h-full rounded-full bg-white p-0.5 flex items-center justify-center">
                      <div
                        className={`w-full h-full rounded-full bg-gradient-to-br ${st.color} flex items-center justify-center text-lg`}
                      >
                        {st.emoji}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium text-stone-700 truncate max-w-[70px] text-center">
                    {st.title}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* 6-Photo Studio Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {posts.map((item, idx) => (
            <a
              key={idx}
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-cream-100 shadow-subtle border border-cream-200/60 block"
            >
              <img
                src={item.img}
                alt={item.caption}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <span className="absolute top-2 left-2 z-10 bg-black/60 backdrop-blur-xs text-white text-[9px] font-semibold px-2 py-0.5 rounded-full">
                {item.tag}
              </span>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center p-3 text-center text-white">
                <InstagramIcon className="w-5 h-5 text-white mb-1.5" />
                <p className="text-[10px] font-medium leading-tight line-clamp-3">
                  {item.caption}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
