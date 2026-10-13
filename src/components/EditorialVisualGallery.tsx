import React, { useState } from 'react';
import { Language } from '../locales/translations';

interface EditorialVisualGalleryProps {
  language: Language;
}

interface GalleryCard {
  titleEn: string;
  titleSw: string;
  categoryEn: string;
  categorySw: string;
  descEn: string;
  descSw: string;
  metric: string;
  location: string;
  accentColor: string;
  svgIcon: string;
  imageUrl: string;
  detailsEn: string;
  detailsSw: string;
}

export const EditorialVisualGallery: React.FC<EditorialVisualGalleryProps> = ({
  language,
}) => {
  const isSw = language === 'sw';
  const [activeModalCard, setActiveModalCard] = useState<GalleryCard | null>(null);

  const cards: GalleryCard[] = [
    {
      titleEn: 'Mount Kenya Highland Terraces',
      titleSw: 'Miteremko ya Milima ya Meru & Kirinyaga',
      categoryEn: 'Agro-Ecological Zone',
      categorySw: 'Eneo la Kilimo cha Mwinuko',
      descEn: 'High-altitude volcanic soils yielding export-grade French beans, baby vegetables, and specialty tea with gravity-fed irrigation.',
      descSw: 'Udongo wa volkano wenye rutuba unaozalisha mishiri ya kuuza nje na parachichi kwa njia za kisasa za umwagiliaji.',
      metric: 'Altitude 1,850m · Volcanic Loam',
      location: 'Meru / Kirinyaga Highlands',
      accentColor: 'from-[#1C3D2D]/90 via-[#244A37]/80 to-transparent',
      svgIcon: '🌱',
      imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=900&q=80',
      detailsEn: 'Farmers on Mount Kenya slopes practice precision contour ridge terracing to preserve topsoil moisture and prevent runoff during monsoon rains. Agrolink sensors monitor canopy humidity to synchronize harvesting 36 hours before international airfreight departures.',
      detailsSw: 'Wakulima kwenye miteremko ya Mlima Kenya wanatumia mbinu za matuta na mifereji ya kuzuia mmomonyoko wa udongo ili kuhifadhi unyevu. Sensorer za Agrolink zinafuatilia unyevu wa hewa ili kupanga uvunaji saa 36 kabla ya ndege za mizigo kuondoka.',
    },
    {
      titleEn: 'Solar-Chilled Cold-Chain Haulage',
      titleSw: 'Usafiri wa Majokofu Yanayoendeshwa na Sola',
      categoryEn: 'Post-Harvest Loss Prevention',
      categorySw: 'Kuzuia Uharibifu wa Mazao',
      descEn: 'Off-grid refrigerated Isuzu fleets holding 4°C core temperatures from farm-gate to Nairobi Wakulima and JKIA cargo terminal.',
      descSw: 'Malori ya baridi ya sola yanayohifadhi nyuzi joto 4°C kuanzia shambani hadi uwanja wa ndege wa JKIA na soko kuu la Wakulima.',
      metric: '4°C Setpoint · -38% Loss Reduction',
      location: 'Highway Corridor: Meru → Nairobi',
      accentColor: 'from-sky-950/90 via-[#1C3D2D]/80 to-transparent',
      svgIcon: '🚛',
      imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80',
      detailsEn: 'Equipped with rooftop bifacial solar PV arrays and lithium battery storage, these cold haulers maintain an unbroken cold-chain even during traffic congestion on the Thika Superhighway, eliminating heat shock that spoils up to 40% of fresh leafy greens.',
      detailsSw: 'Malori haya yana vifaa vya sola na betri za kisasa zinazohakikisha nyuzi joto thabiti hata wakati wa msongamano wa magari kwenye barabara kuu ya Thika, kuzuia uharibifu wa joto unaoharibu hadi 40% ya mboga mbichi.',
    },
    {
      titleEn: 'Export-Grade Produce Quality Hub',
      titleSw: 'Kituo cha Ukaguzi na Ubora wa Mazao',
      categoryEn: 'Market Synchrony',
      categorySw: 'Upatanisho wa Soko',
      descEn: 'GlobalG.A.P. certified packhouse sorting in Meru Central, connecting 12,000 smallholders with transparent digital escrow contracts.',
      descSw: 'Maghala yaliyoidhinishwa kimataifa yanayounganisha wakulima wadogo 12,000 na mikataba salama ya malipo ya kidijitali.',
      metric: 'GlobalG.A.P. · 100% Escrow Backed',
      location: 'Central Packhouse Hub',
      accentColor: 'from-amber-950/90 via-[#1C3D2D]/80 to-transparent',
      svgIcon: '📦',
      imageUrl: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=900&q=80',
      detailsEn: 'Digital weight scales and optical defect scanners grade incoming produce lots within minutes. Farmers receive instant SMS settlement receipts into their mobile wallets backed by bank escrow accounts, eliminating middlemen deductions.',
      detailsSw: 'Mizani ya kidijitali na kamera maalum hupima na kukagua ubora wa mazao mara yanapowasili. Wakulima hupokea risiti za SMS na malipo ya haraka kwenye simu kupitia akaunti salama za benki.',
    },
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between border-b border-stone-100 pb-2">
        <div>
          <h2 className="text-base font-bold text-stone-900 tracking-tight">
            {isSw ? 'Mandhari Halisi ya Kilimo na Miundombinu' : 'Agrolink Pan-African Agricultural Infrastructure'}
          </h2>
          <p className="text-xs text-stone-500">
            {isSw
              ? 'Picha halisi za mashamba ya miinuko, malori ya baridi, na vituo vya ukaguzi wa mazao'
              : 'Authentic documentary visuals of highland farming communities, solar cold-chain, and certified packhouses'}
          </p>
        </div>
        <span className="text-xs text-stone-500 font-mono">Kenya Pilot 2026</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((c, idx) => (
          <div
            key={idx}
            onClick={() => setActiveModalCard(c)}
            className="group relative rounded-xl border border-[#E7E0D3] overflow-hidden bg-white shadow-2xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
          >
            {/* Visual Photo Header Canvas with Resilient Fallback */}
            <div className="h-48 relative overflow-hidden bg-stone-900">
              <img
                src={c.imageUrl}
                alt={isSw ? c.titleSw : c.titleEn}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                onError={(e) => {
                  // Resilient fallback to styled gradient
                  const target = e.currentTarget;
                  target.style.display = 'none';
                }}
              />

              {/* Gradient Scrim for High Legibility */}
              <div className={`absolute inset-0 bg-gradient-to-t ${c.accentColor} pointer-events-none`} />

              {/* Top Badges */}
              <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
                <span className="text-[10px] font-mono tracking-widest uppercase bg-black/40 backdrop-blur-md text-white px-2 py-0.5 rounded border border-white/20">
                  {isSw ? c.categorySw : c.categoryEn}
                </span>

                <span className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-sm shadow-xs group-hover:scale-110 transition-transform">
                  {c.svgIcon}
                </span>
              </div>

              {/* Bottom Image Title & Metric */}
              <div className="absolute bottom-3 left-3 right-3 z-10 text-white">
                <h3 className="font-bold text-base text-white leading-tight drop-shadow-xs">
                  {isSw ? c.titleSw : c.titleEn}
                </h3>
                <span className="text-[11px] font-mono text-[#E69D45] mt-0.5 block drop-shadow-xs">
                  {c.metric}
                </span>
              </div>
            </div>

            {/* Editorial Body */}
            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between text-xs">
              <p className="text-stone-600 leading-relaxed">
                {isSw ? c.descSw : c.descEn}
              </p>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-[#1C3D2D] font-semibold">
                <span>{c.location}</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  {isSw ? 'Angalia Maelezo →' : 'Inspect Specs →'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Inspection Modal */}
      {activeModalCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E7E0D3]">
            <div className="relative h-56 bg-stone-900">
              <img
                src={activeModalCard.imageUrl}
                alt={isSw ? activeModalCard.titleSw : activeModalCard.titleEn}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <button
                onClick={() => setActiveModalCard(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 text-lg transition-colors leading-none"
              >
                &times;
              </button>
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E69D45] block">
                  {isSw ? activeModalCard.categorySw : activeModalCard.categoryEn}
                </span>
                <h3 className="text-xl font-bold">
                  {isSw ? activeModalCard.titleSw : activeModalCard.titleEn}
                </h3>
                <span className="text-xs font-mono text-stone-300">
                  {activeModalCard.location} · {activeModalCard.metric}
                </span>
              </div>
            </div>

            <div className="p-5 space-y-4 text-xs text-stone-700">
              <p className="text-sm font-normal leading-relaxed">
                {isSw ? activeModalCard.detailsSw : activeModalCard.detailsEn}
              </p>

              <div className="bg-[#FAF7F2] p-3 rounded-lg border border-[#E7E0D3] space-y-1">
                <div className="font-bold text-[#1C3D2D] flex items-center gap-1.5">
                  <span>✓</span>
                  <span>{isSw ? 'Uthibitisho wa Viwango vya KALRO & KEPHIS' : 'Verified KALRO & KEPHIS Agricultural Standard'}</span>
                </div>
                <p className="text-[11px] text-stone-500">
                  {isSw
                    ? 'Eneo hili linashirikiana na mtandao wa Agrolink Africa kuhakikisha usalama wa chakula na mapato bora kwa wakulima.'
                    : 'This zone operates under Agrolink Africa protocols to guarantee food safety, reduce post-harvest spoilage, and maintain fair farmer compensation.'}
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setActiveModalCard(null)}
                  className="px-4 py-2 bg-[#1C3D2D] text-white rounded-lg font-bold text-xs hover:bg-[#142D21] transition-colors"
                >
                  {isSw ? 'Funga' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
