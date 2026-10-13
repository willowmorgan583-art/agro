import React from 'react';
import { ActiveTab, UserRole } from '../types';
import { STRATEGIC_METRICS } from '../data/mockData';
import { Language, translations } from '../locales/translations';
import { YieldGrowthChart } from './YieldGrowthChart';
import { EditorialVisualGallery } from './EditorialVisualGallery';

interface OverviewDashboardProps {
  setActiveTab: (tab: ActiveTab) => void;
  currentRole: UserRole;
  pilotCounty: string;
  language: Language;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  setActiveTab,
  pilotCounty,
  language,
}) => {
  const t = translations[language];

  return (
    <div className="space-y-10">
      {/* Editorial Hero Banner */}
      <section className="bg-gradient-to-br from-[#1C3D2D] via-[#244A37] to-[#163325] text-white rounded-xl p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden border border-[#2D5A43]">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="text-xs uppercase tracking-widest text-[#E69D45] font-semibold">
            {t.heroSub}
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {t.heroTitle}
          </h1>
          <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-normal">
            {t.heroDesc}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('demand')}
              className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#1C3D2D] bg-[#E69D45] hover:bg-[#F0A954] rounded-md transition-colors whitespace-nowrap shadow-xs"
            >
              {t.btnExploreDemand}
            </button>
            <button
              onClick={() => setActiveTab('smart_dispatch')}
              className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-md transition-colors whitespace-nowrap"
            >
              {t.btnViewHarvestBoard}
            </button>
            <button
              onClick={() => setActiveTab('ussd_simulator')}
              className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white/90 hover:text-white underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              {t.btnLaunchUssd}
            </button>
          </div>
        </div>

        {/* Decorative subtle earth pattern styling */}
        <div className="absolute -right-12 -bottom-12 w-80 h-80 rounded-full bg-[#C2593F]/10 blur-2xl pointer-events-none" />
        <div className="absolute right-8 top-8 opacity-15 hidden lg:block text-right pointer-events-none">
          <span className="font-mono text-xs block text-stone-300">ACTIVE PILOT ZONE</span>
          <span className="font-mono text-sm font-semibold text-white">{pilotCounty}</span>
        </div>
      </section>

      {/* Quantitative Impact Proof Strip */}
      <section className="bg-white rounded-xl border border-[#E7E0D3] p-6 shadow-2xs">
        <div className="mb-4 flex items-center justify-between border-b border-stone-100 pb-3">
          <h2 className="text-sm font-bold tracking-tight text-stone-900 uppercase">
            {language === 'sw' ? 'Matokeo ya Majaribio na Takwimu Zilizothibitishwa' : 'Platform Impact Trajectory & Verified Metrics'}
          </h2>
          <span className="text-xs text-stone-500">
            {language === 'sw' ? 'Majaribio ya Awali · Miezi 1–6 (Kiambu · Nakuru · Meru)' : 'Pilot Baseline · Months 1–6 (Kiambu · Nakuru · Meru)'}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <div className="text-xs text-stone-500">{t.kpiLossAverted}</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#1C3D2D] tabular-nums font-mono">
              {STRATEGIC_METRICS.postHarvestLossReductionPercent}%
            </div>
            <div className="text-xs text-stone-500">{t.kpiLossTarget}</div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-stone-500">{t.kpiIncomeLift}</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#C2593F] tabular-nums font-mono">
              +{STRATEGIC_METRICS.averageIncomeIncreasePercent}%
            </div>
            <div className="text-xs text-stone-500">{t.kpiIncomeDesc}</div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-stone-500">{t.kpiSmallholders}</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#1C3D2D] tabular-nums font-mono">
              {STRATEGIC_METRICS.farmersOnboarded.toLocaleString()}
            </div>
            <div className="text-xs text-stone-500">{t.kpiSmallholdersTarget}</div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-stone-500">{t.kpiTrained}</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#B45309] tabular-nums font-mono">
              {STRATEGIC_METRICS.workersTrainedClimateSmart.toLocaleString()}
            </div>
            <div className="text-xs text-stone-500">{t.kpiTrainedTarget}</div>
          </div>
        </div>
      </section>

      {/* Recharts Dual-Axis Yield & Soil Moisture Phenology Visualization */}
      <YieldGrowthChart pilotCounty={pilotCounty} language={language} />

      {/* Editorial Agricultural Landscapes Gallery */}
      <EditorialVisualGallery language={language} />

      {/* 4 Flagship Core Operational Modules Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-900 tracking-tight">
            {language === 'sw' ? 'Moduli Jumuishi za Mfumo' : 'Integrated Platform Modules'}
          </h2>
          <span className="text-xs text-stone-500">
            {language === 'sw' ? 'Chagua moduli kuona data na zana za AI' : 'Select a module to interact with real data & live AI tools'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Module 1: Demand Prediction AI */}
          <div
            onClick={() => setActiveTab('demand')}
            className="group cursor-pointer bg-white hover:bg-[#FAF7F2] p-6 rounded-xl border border-[#E7E0D3] hover:border-[#C2593F]/50 transition-all shadow-2xs space-y-3"
          >
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span className="font-semibold text-[#1C3D2D]">MODULE 01</span>
              <span>Gemini 3.1 Pro Thinking · 90-120 Day Forecast</span>
            </div>
            <h3 className="text-base font-bold text-stone-900 group-hover:text-[#C2593F] transition-colors">
              {t.mod1Title}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {t.mod1Desc}
            </p>
            <div className="pt-2 flex items-center justify-between text-xs font-medium text-[#1C3D2D]">
              <span>{t.mod1Action}</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>

          {/* Module 2: Early Warning Radar */}
          <div
            onClick={() => setActiveTab('early_warning')}
            className="group cursor-pointer bg-white hover:bg-[#FAF7F2] p-6 rounded-xl border border-[#E7E0D3] hover:border-[#C2593F]/50 transition-all shadow-2xs space-y-3"
          >
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span className="font-semibold text-[#1C3D2D]">MODULE 02</span>
              <span>Computer Vision Pathology · Hyperlocal Radar</span>
            </div>
            <h3 className="text-base font-bold text-stone-900 group-hover:text-[#C2593F] transition-colors">
              {t.mod2Title}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {t.mod2Desc}
            </p>
            <div className="pt-2 flex items-center justify-between text-xs font-medium text-[#1C3D2D]">
              <span>{t.mod2Action}</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>

          {/* Module 3: Smart Distribution Matching */}
          <div
            onClick={() => setActiveTab('smart_dispatch')}
            className="group cursor-pointer bg-white hover:bg-[#FAF7F2] p-6 rounded-xl border border-[#E7E0D3] hover:border-[#C2593F]/50 transition-all shadow-2xs space-y-3"
          >
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span className="font-semibold text-[#1C3D2D]">MODULE 03</span>
              <span>Automated Matching · Spoilage Clock Engine</span>
            </div>
            <h3 className="text-base font-bold text-stone-900 group-hover:text-[#C2593F] transition-colors">
              {t.mod3Title}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {t.mod3Desc}
            </p>
            <div className="pt-2 flex items-center justify-between text-xs font-medium text-[#1C3D2D]">
              <span>{t.mod3Action}</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>

          {/* Module 4: Post-Harvest & AgriFinance */}
          <div
            onClick={() => setActiveTab('agrifinance')}
            className="group cursor-pointer bg-white hover:bg-[#FAF7F2] p-6 rounded-xl border border-[#E7E0D3] hover:border-[#C2593F]/50 transition-all shadow-2xs space-y-3"
          >
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span className="font-semibold text-[#1C3D2D]">MODULE 04</span>
              <span>Warehouse Receipts · Digital Escrow · Credit Score</span>
            </div>
            <h3 className="text-base font-bold text-stone-900 group-hover:text-[#C2593F] transition-colors">
              {t.mod4Title}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {t.mod4Desc}
            </p>
            <div className="pt-2 flex items-center justify-between text-xs font-medium text-[#1C3D2D]">
              <span>{t.mod4Action}</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </div>
      </section>

      {/* Phased Implementation Strategy & Revenue Model */}
      <section className="bg-white rounded-xl border border-[#E7E0D3] p-6 shadow-2xs space-y-6">
        <div className="border-b border-stone-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-stone-900">
              {t.roadmapTitle}
            </h2>
            <p className="text-xs text-stone-500">
              {language === 'sw' ? 'Mpango wa Miaka 3 kutoka Majaribio Kenya hadi Afrika Nzima' : '3-Year Execution Roadmap from Kenyan Pilot to Pan-African Scale'}
            </p>
          </div>
          <span className="text-xs text-stone-500 self-start sm:self-auto">
            Strategic Alignment · 2026–2029
          </span>
        </div>

        {/* 3 Phases */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-4 rounded-lg bg-[#FBF9F5] border border-[#E7E0D3] space-y-2">
            <div className="text-xs font-bold text-[#1C3D2D]">
              {t.phase1Title}
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              {t.phase1Desc}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#FBF9F5] border border-[#E7E0D3] space-y-2">
            <div className="text-xs font-bold text-[#C2593F]">
              {t.phase2Title}
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              {t.phase2Desc}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#FBF9F5] border border-[#E7E0D3] space-y-2">
            <div className="text-xs font-bold text-[#B45309]">
              {t.phase3Title}
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              {t.phase3Desc}
            </p>
          </div>
        </div>

        {/* 4 Revenue Streams */}
        <div className="border-t border-stone-100 pt-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-3">
            {t.revenueTitle}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="p-3 bg-[#FAF7F2] rounded border border-[#EDE7DC]">
              <span className="font-semibold text-stone-900 block mb-1">{t.rev1Title}</span>
              <span className="text-stone-600">{t.rev1Desc}</span>
            </div>
            <div className="p-3 bg-[#FAF7F2] rounded border border-[#EDE7DC]">
              <span className="font-semibold text-stone-900 block mb-1">{t.rev2Title}</span>
              <span className="text-stone-600">{t.rev2Desc}</span>
            </div>
            <div className="p-3 bg-[#FAF7F2] rounded border border-[#EDE7DC]">
              <span className="font-semibold text-stone-900 block mb-1">{t.rev3Title}</span>
              <span className="text-stone-600">{t.rev3Desc}</span>
            </div>
            <div className="p-3 bg-[#FAF7F2] rounded border border-[#EDE7DC]">
              <span className="font-semibold text-stone-900 block mb-1">{t.rev4Title}</span>
              <span className="text-stone-600">{t.rev4Desc}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
