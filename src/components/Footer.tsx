import React from 'react';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="mt-20 border-t border-[#E7E0D3] bg-[#F4EFE6] py-12 px-4 sm:px-6 lg:px-8 text-xs text-stone-600">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="space-y-2">
          <div className="font-bold text-sm text-[#1C3D2D]">Agrolink Africa</div>
          <p className="text-stone-500 leading-relaxed">
            Eliminating agricultural supply chain fragmentation and post-harvest food loss across Africa through predictive intelligence.
          </p>
        </div>

        <div className="space-y-2">
          <div className="font-semibold text-stone-900">Flagship Modules</div>
          <ul className="space-y-1.5 text-stone-600">
            <li>
              <button
                onClick={() => setActiveTab('demand')}
                className="hover:text-stone-900 transition-colors"
              >
                Demand Prediction AI
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('early_warning')}
                className="hover:text-stone-900 transition-colors"
              >
                Early Warning Radar
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('smart_dispatch')}
                className="hover:text-stone-900 transition-colors"
              >
                Smart Distribution Matching
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('agrifinance')}
                className="hover:text-stone-900 transition-colors"
              >
                Post-Harvest & AgriFinance
              </button>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <div className="font-semibold text-stone-900">Pilot Cohorts & Zones</div>
          <ul className="space-y-1.5 text-stone-600">
            <li>Kiambu County (Horticulture & Greenhouse)</li>
            <li>Nakuru County (Cereals & Tubers)</li>
            <li>Meru County (Export French Beans & Avocado)</li>
            <li>Nyandarua (Irish Potato Cluster)</li>
          </ul>
        </div>

        <div className="space-y-2">
          <div className="font-semibold text-stone-900">Institutional Moat</div>
          <p className="text-stone-500 leading-relaxed">
            Offline 2G USSD (*384*55#) for rural smallholders, integrated with Warehouse Receipt System Council (WRSC) and KALRO plant research.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-[#E2DAD0] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
        <div>
          &copy; {new Date().getFullYear()} Agrolink Africa Initiative. All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          <span>Target: 300,000 Smallholders</span>
          <span aria-hidden="true">·</span>
          <span>40% Loss Reduction</span>
          <span aria-hidden="true">·</span>
          <span>+30% Farmer Income</span>
        </div>
      </div>
    </footer>
  );
};
