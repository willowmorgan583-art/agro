import React from 'react';
import { UserRole } from '../types';
import { Language, translations } from '../locales/translations';

interface RoleSwitcherProps {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  pilotCounty: string;
  setPilotCounty: (county: string) => void;
  counties: string[];
  language?: Language;
}

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({
  currentRole,
  setCurrentRole,
  pilotCounty,
  setPilotCounty,
  counties,
  language = 'en',
}) => {
  const t = translations[language];

  const roles: { id: UserRole; label: string; description: string; badge: string }[] = [
    {
      id: 'farmer',
      label: t.roleFarmer,
      description: t.roleFarmerDesc,
      badge: 'Pilot Focus: Kiambu · Nakuru · Meru',
    },
    {
      id: 'buyer',
      label: t.roleBuyer,
      description: t.roleBuyerDesc,
      badge: 'Institutional Off-taker',
    },
    {
      id: 'logistics',
      label: t.roleLogistics,
      description: t.roleLogisticsDesc,
      badge: 'Cold-Chain Operator',
    },
    {
      id: 'analyst',
      label: t.roleAnalyst,
      description: t.roleAnalystDesc,
      badge: 'Policy & Impact',
    },
  ];

  return (
    <section className="bg-[#F4EFE6] border-b border-[#E7E0D3] py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Interactive segmented control for active role */}
        <div className="flex items-center gap-1.5 p-1 bg-[#EBE4D6] rounded-lg overflow-x-auto">
          {roles.map((r) => {
            const isActive = currentRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setCurrentRole(r.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'bg-[#1C3D2D] text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-[#DDD5C5]'
                }`}
              >
                {r.label}
              </button>
            );
          })}
        </div>

        {/* Region selector & role context metadata (unboxed text) */}
        <div className="flex items-center gap-3 text-xs text-stone-600 flex-wrap justify-between md:justify-end">
          <div className="flex items-center gap-2">
            <span className="text-stone-500 font-medium">
              {t.activeZone}:
            </span>
            <select
              value={pilotCounty}
              onChange={(e) => setPilotCounty(e.target.value)}
              className="bg-white border border-[#D5CEBE] rounded px-2.5 py-1 text-xs text-stone-800 font-medium focus:outline-hidden focus:ring-1 focus:ring-[#1C3D2D]"
            >
              {counties.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-stone-500">
            <span aria-hidden="true">·</span>
            <span>{roles.find((r) => r.id === currentRole)?.description}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
