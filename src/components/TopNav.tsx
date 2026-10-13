import React from 'react';
import { ActiveTab } from '../types';
import { Language, translations } from '../locales/translations';
import { useOfflineSync } from '../context/OfflineSyncContext';

interface TopNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenUSSD: () => void;
  onOpenOnboarding: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenUSSD,
  onOpenOnboarding,
  language,
  onLanguageChange,
}) => {
  const { isOnline, isSimulatedOffline, toggleSimulateOffline, pendingCount } = useOfflineSync();
  const t = translations[language];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#E7E0D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Brand Wordmark (single text element with earthy terracotta icon) */}
        <button
          onClick={() => setActiveTab('overview')}
          className="text-xl font-bold tracking-tight text-[#1C3D2D] hover:text-[#142D21] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="w-3 h-3 rounded-xs bg-[#C2593F]" />
          <span>Agrolink Africa</span>
        </button>

        {/* Zone 2: Clean single-line nav links with localized Kiswahili/English labels */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-stone-600">
          <button
            onClick={() => setActiveTab('overview')}
            className={`whitespace-nowrap shrink-0 pb-0.5 border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'text-[#1C3D2D] border-[#1C3D2D] font-semibold'
                : 'border-transparent hover:text-stone-900 hover:border-stone-400'
            }`}
          >
            {t.navOverview}
          </button>
          <button
            onClick={() => setActiveTab('demand')}
            className={`whitespace-nowrap shrink-0 pb-0.5 border-b-2 transition-colors ${
              activeTab === 'demand'
                ? 'text-[#1C3D2D] border-[#1C3D2D] font-semibold'
                : 'border-transparent hover:text-stone-900 hover:border-stone-400'
            }`}
          >
            {t.navDemand}
          </button>
          <button
            onClick={() => setActiveTab('early_warning')}
            className={`whitespace-nowrap shrink-0 pb-0.5 border-b-2 transition-colors ${
              activeTab === 'early_warning'
                ? 'text-[#1C3D2D] border-[#1C3D2D] font-semibold'
                : 'border-transparent hover:text-stone-900 hover:border-stone-400'
            }`}
          >
            {t.navEarlyWarning}
          </button>
          <button
            onClick={() => setActiveTab('smart_dispatch')}
            className={`whitespace-nowrap shrink-0 pb-0.5 border-b-2 transition-colors ${
              activeTab === 'smart_dispatch'
                ? 'text-[#1C3D2D] border-[#1C3D2D] font-semibold'
                : 'border-transparent hover:text-stone-900 hover:border-stone-400'
            }`}
          >
            {t.navDispatch}
          </button>
          <button
            onClick={() => setActiveTab('agrifinance')}
            className={`whitespace-nowrap shrink-0 pb-0.5 border-b-2 transition-colors ${
              activeTab === 'agrifinance'
                ? 'text-[#1C3D2D] border-[#1C3D2D] font-semibold'
                : 'border-transparent hover:text-stone-900 hover:border-stone-400'
            }`}
          >
            {t.navFinance}
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            className={`whitespace-nowrap shrink-0 pb-0.5 border-b-2 transition-colors ${
              activeTab === 'feedback'
                ? 'text-[#1C3D2D] border-[#1C3D2D] font-semibold'
                : 'border-transparent hover:text-stone-900 hover:border-stone-400'
            }`}
          >
            {t.navFeedback}
          </button>
        </nav>

        {/* Zone 3: Actions, Bilingual Switcher & Offline simulation controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Language Switcher Segmented Toggle */}
          <div className="flex items-center rounded-md border border-[#D5CEBE] bg-[#F4EFE6] p-0.5 text-xs font-semibold">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 rounded transition-colors ${
                language === 'en'
                  ? 'bg-[#1C3D2D] text-white shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="English interface"
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('sw')}
              className={`px-2 py-1 rounded transition-colors ${
                language === 'sw'
                  ? 'bg-[#1C3D2D] text-white shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Badilisha kwa Kiswahili"
            >
              SW
            </button>
          </div>

          {/* Offline / Online state toggle */}
          <button
            onClick={toggleSimulateOffline}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              isOnline
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                : 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200 animate-pulse'
            }`}
            title="Toggle between online and simulated rural low-connectivity offline mode"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isOnline ? 'bg-emerald-600' : 'bg-amber-600'
              }`}
            />
            <span className="hidden sm:inline">
              {isOnline ? t.lblOnline : `${t.lblOffline} (${pendingCount} ${t.lblQueued})`}
            </span>
            <span className="sm:hidden">
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </button>

          {/* Guided Onboarding Launch button */}
          <button
            onClick={onOpenOnboarding}
            className="hidden sm:inline-block px-3 py-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900 hover:bg-[#F4EFE6] border border-stone-300 rounded-md transition-colors whitespace-nowrap"
          >
            {t.btnFarmerTour}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onOpenUSSD}
            className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1C3D2D] hover:bg-[#142D21] active:bg-[#0E2017] rounded-md transition-colors whitespace-nowrap shrink-0 shadow-xs"
          >
            {t.btnRuralUSSD}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer strip */}
      <div className="lg:hidden flex items-center justify-around border-t border-[#E7E0D3] bg-[#F4EFE6] px-2 py-2 overflow-x-auto text-xs text-stone-700">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-2 py-1 whitespace-nowrap rounded ${
            activeTab === 'overview' ? 'font-bold text-[#1C3D2D] bg-[#E9E2D4]' : ''
          }`}
        >
          {t.navOverview}
        </button>
        <button
          onClick={() => setActiveTab('demand')}
          className={`px-2 py-1 whitespace-nowrap rounded ${
            activeTab === 'demand' ? 'font-bold text-[#1C3D2D] bg-[#E9E2D4]' : ''
          }`}
        >
          {t.navDemand}
        </button>
        <button
          onClick={() => setActiveTab('early_warning')}
          className={`px-2 py-1 whitespace-nowrap rounded ${
            activeTab === 'early_warning' ? 'font-bold text-[#1C3D2D] bg-[#E9E2D4]' : ''
          }`}
        >
          {t.navEarlyWarning}
        </button>
        <button
          onClick={() => setActiveTab('smart_dispatch')}
          className={`px-2 py-1 whitespace-nowrap rounded ${
            activeTab === 'smart_dispatch' ? 'font-bold text-[#1C3D2D] bg-[#E9E2D4]' : ''
          }`}
        >
          {t.navDispatch}
        </button>
        <button
          onClick={() => setActiveTab('agrifinance')}
          className={`px-2 py-1 whitespace-nowrap rounded ${
            activeTab === 'agrifinance' ? 'font-bold text-[#1C3D2D] bg-[#E9E2D4]' : ''
          }`}
        >
          {t.navFinance}
        </button>
        <button
          onClick={() => setActiveTab('feedback')}
          className={`px-2 py-1 whitespace-nowrap rounded ${
            activeTab === 'feedback' ? 'font-bold text-[#1C3D2D] bg-[#E9E2D4]' : ''
          }`}
        >
          {t.navFeedback}
        </button>
      </div>
    </header>
  );
};
