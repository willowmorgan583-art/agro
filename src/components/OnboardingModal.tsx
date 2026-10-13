import React, { useState } from 'react';
import { OnboardingData } from '../types';
import { KENYA_COUNTIES } from '../data/mockData';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: OnboardingData) => void;
  initialCounty: string;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  initialCounty,
}) => {
  const [step, setStep] = useState<number>(1);
  const [language, setLanguage] = useState<'en' | 'sw'>('en');

  // Form fields
  const [fullName, setFullName] = useState<string>('Wanjiku Mwangi');
  const [phone, setPhone] = useState<string>('+254 712 345 678');
  const [county, setCounty] = useState<string>(initialCounty);
  const [ward, setWard] = useState<string>('Katheri Central');
  const [acreage, setAcreage] = useState<number>(3.5);
  const [primaryCrop, setPrimaryCrop] = useState<string>('French Beans (Export Grade)');
  const [waterAccess, setWaterAccess] = useState<string>('Borehole with Drip Irrigation');
  const [hasSmartphone, setHasSmartphone] = useState<boolean>(true);

  if (!isOpen) return null;

  const totalSteps = 5;

  const handleFinish = () => {
    const data: OnboardingData = {
      language,
      fullName,
      phone,
      county,
      ward,
      acreage,
      primaryCrop,
      waterAccess,
      hasSmartphone,
      completed: true,
    };
    onComplete(data);
    onClose();
  };

  const isSw = language === 'sw';

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-[#E7E0D3] max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200 text-stone-900">
        {/* Top Header & Progress */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <div className="text-[11px] uppercase font-bold tracking-widest text-[#1C3D2D]">
              {isSw ? 'MWONGOZO WA MKULIMA' : 'FARMER GUIDED ONBOARDING'}
            </div>
            <div className="text-xs text-stone-500 mt-0.5">
              {isSw
                ? `Hatua ya ${step} kati ya ${totalSteps}`
                : `Step ${step} of ${totalSteps} · Designed for All Literacy Levels`}
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 text-xl font-bold p-1 rounded leading-none"
            title="Skip tour"
          >
            &times;
          </button>
        </div>

        {/* Step Indicator Bar */}
        <div className="grid grid-cols-5 gap-1.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-colors ${
                s <= step ? 'bg-[#1C3D2D]' : 'bg-stone-200'
              }`}
            />
          ))}
        </div>

        {/* STEP 1: Language & Accessibility */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-stone-900">
                {isSw ? 'Chagua Lugha Yako' : 'Select Your Preferred Language'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {isSw
                  ? 'Agrolink Africa inakusaidia kuungana na masoko ya uhakika na kupata miongozo ya hali ya hewa bila malipo.'
                  : 'Welcome to Agrolink Africa. We connect you directly with guaranteed buyers, cold logistics, and climate-smart farm alerts.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  language === 'en'
                    ? 'border-[#1C3D2D] bg-[#FAF7F2] ring-2 ring-[#1C3D2D]'
                    : 'border-stone-200 bg-white hover:bg-stone-50'
                }`}
              >
                <span className="block text-sm font-bold text-stone-900">English</span>
                <span className="block text-xs text-stone-500 mt-1">Standard Interface</span>
              </button>

              <button
                type="button"
                onClick={() => setLanguage('sw')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  language === 'sw'
                    ? 'border-[#1C3D2D] bg-[#FAF7F2] ring-2 ring-[#1C3D2D]'
                    : 'border-stone-200 bg-white hover:bg-stone-50'
                }`}
              >
                <span className="block text-sm font-bold text-stone-900">Kiswahili</span>
                <span className="block text-xs text-stone-500 mt-1">Miongozo ya Kiswahili</span>
              </button>
            </div>

            <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#E7E0D3] text-xs text-stone-600">
              <span className="font-semibold text-stone-900 block mb-0.5">
                {isSw ? 'Ufikiaji Bila Mtandao (Offline)' : 'Offline Accessibility Built-in'}
              </span>
              <span>
                {isSw
                  ? 'Hata kama huna vifurushi vya mtandao au unatumia simu ya kawaida (Mulika Mwizi), unaweza kutumia Agrolink kupitia *384*55#.'
                  : 'Even without mobile data bundles or on basic 2G feature phones, you can access your farm advisory via *384*55#.'}
              </span>
            </div>
          </div>
        )}

        {/* STEP 2: Farmer Identity & County */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-stone-900">
                {isSw ? 'Maelezo ya Mkulima' : 'Farmer Registration'}
              </h3>
              <p className="text-xs text-stone-600">
                {isSw
                  ? 'Weka jina lako na eneo la shamba ili tuweze kukuunganisha na wasafirishaji wa karibu.'
                  : 'Enter your basic details so we can match you with verified buyers and haulers nearest to your farm.'}
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  {isSw ? 'Jina Kamili' : 'Full Name / Cooperative Leader'}
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#D5CEBE] rounded-lg p-2.5 text-stone-800 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    {isSw ? 'Nambari ya Simu (M-Pesa)' : 'Phone Number (M-Pesa)'}
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#D5CEBE] rounded-lg p-2.5 text-stone-800 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    {isSw ? 'Kaunti ya Shamba' : 'County Farming Hub'}
                  </label>
                  <select
                    value={county}
                    onChange={(e) => setCounty(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#D5CEBE] rounded-lg p-2.5 text-stone-800 font-medium"
                  >
                    {KENYA_COUNTIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Farm Land Data */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-stone-900">
                {isSw ? 'Ukubwa wa Shamba & Mazao' : 'Farm Profile & Land Data'}
              </h3>
              <p className="text-xs text-stone-600">
                {isSw
                  ? 'Ukubwa wa ardhi yako husaidia AI kupanga ratiba bora ya upandaji.'
                  : 'Specify your acreage and primary crop so Demand AI can predict market volumes accurately.'}
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-medium text-stone-700">
                    {isSw ? 'Ukubwa wa Ardhi (Ekari)' : 'Land Size (Acres)'}
                  </label>
                  <span className="font-mono font-bold text-[#1C3D2D]">
                    {acreage} {isSw ? 'Ekari' : 'Acres'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="25"
                  step="0.5"
                  value={acreage}
                  onChange={(e) => setAcreage(parseFloat(e.target.value))}
                  className="w-full accent-[#1C3D2D] cursor-pointer"
                />
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  {isSw ? 'Zao Kuu' : 'Primary Harvest Focus'}
                </label>
                <select
                  value={primaryCrop}
                  onChange={(e) => setPrimaryCrop(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#D5CEBE] rounded-lg p-2.5 text-stone-800 font-medium"
                >
                  <option value="French Beans (Export Grade)">French Beans (Mishiri) · Export</option>
                  <option value="Hass Avocados (Packhouse Ready)">Hass Avocados (Parachichi)</option>
                  <option value="Dutch Robijn Potatoes">Irish Potatoes (Viazi Mviringo)</option>
                  <option value="Highland Hybrid Maize (H614D)">Hybrid Maize (Mahindi)</option>
                  <option value="Anna F1 Greenhouse Tomatoes">Greenhouse Tomatoes (Nyanya)</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  {isSw ? 'Maji ya Umwagiliaji' : 'Water & Irrigation System'}
                </label>
                <select
                  value={waterAccess}
                  onChange={(e) => setWaterAccess(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#D5CEBE] rounded-lg p-2.5 text-stone-800 font-medium"
                >
                  <option value="Borehole with Drip Irrigation">Borehole / Drip System (Year-Round)</option>
                  <option value="River Gravity Pumping">River / Furrow Gravity Pumping</option>
                  <option value="Rainfed (Long/Short Rains)">Rainfed Only (Tegemea Mvua)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Initial Tailored AI Recommendation Preview */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-stone-900">
                {isSw ? 'Mapendekezo ya Awali ya AI' : 'Your Initial Tailored AI Recommendations'}
              </h3>
              <p className="text-xs text-stone-600">
                {isSw
                  ? `Hapa kuna tathmini ya awali ya shamba lako katika Kaunti ya ${county}:`
                  : `Based on your ${acreage} acres in ${county}, here is your instant planting and offtake preview:`}
              </p>
            </div>

            <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E7E0D3] space-y-3 text-xs">
              <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                <span className="font-bold text-[#1C3D2D]">{primaryCrop}</span>
                <span className="font-mono font-bold text-stone-800">
                  {acreage} Acres Profile
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[11px] text-stone-500 block">
                    {isSw ? 'Bei ya Uhakika (KES/kg)' : 'Projected Price Floor'}
                  </span>
                  <span className="text-sm font-bold font-mono text-[#1C3D2D]">
                    {primaryCrop.includes('Beans') ? 'KES 112 - 118' : primaryCrop.includes('Avocado') ? 'KES 140 - 160' : 'KES 55 - 75'} / kg
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-stone-500 block">
                    {isSw ? 'Wakati Bora wa Kupanda' : 'Optimal Planting Window'}
                  </span>
                  <span className="text-xs font-bold text-stone-800">
                    Next 14 Days (Pre-Rain Influx)
                  </span>
                </div>
              </div>

              <div className="border-t border-stone-200 pt-2 text-[11px] text-stone-600">
                <span className="font-semibold text-stone-800 block mb-0.5">
                  {isSw ? 'Kituo cha Karibu cha Uhifadhi:' : 'Nearest Verified Cold Storage Hub:'}
                </span>
                <span>
                  {county.includes('Meru')
                    ? 'Meru Central Certified CA Packhouse (Gakoromone Logistics Zone)'
                    : county.includes('Kiambu')
                    ? 'Limuru Cold Storage & Packhouse Facility'
                    : 'NCPB Lanet Silo & Dry Depot (Nakuru)'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Offline Mode & Complete */}
        {step === 5 && (
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-stone-900">
                {isSw ? 'Uko Tayari! Upatikanaji Bila Mtandao' : 'Ready! Offline Resilience Guaranteed'}
              </h3>
              <p className="text-xs text-stone-600">
                {isSw
                  ? 'Hongera! Sasa unaweza kutumia mfumo kamili wa Agrolink Africa.'
                  : 'Your farm profile is now synchronized. Agrolink works both online in your browser and offline in rural areas.'}
              </p>
            </div>

            <div className="p-4 bg-[#1C3D2D] text-white rounded-xl space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#E69D45] tracking-wide">
                  2G USSD GATEWAY SHORTCUT
                </span>
                <span className="font-mono text-xs bg-white/20 px-2 py-0.5 rounded">
                  *384*55#
                </span>
              </div>
              <p className="text-stone-200 text-[11px] leading-relaxed">
                Save <strong>*384*55#</strong> on your phone. You can check daily market prices, report pest outbreaks, or dispatch a refrigerated truck even with zero mobile data balance.
              </p>
            </div>

            <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#E7E0D3] text-xs text-stone-600 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#15803D]" />
              <span>
                All future submissions made while offline will be securely stored on your device and synchronized automatically.
              </span>
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-stone-100">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 border border-stone-200 rounded-lg transition-colors"
            >
              {isSw ? 'Nyuma' : 'Back'}
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            {step < totalSteps ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#1C3D2D] hover:bg-[#142D21] rounded-lg transition-colors shadow-xs"
              >
                {isSw ? 'Endelea →' : 'Continue →'}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#C2593F] hover:bg-[#A84931] rounded-lg transition-colors shadow-xs"
              >
                {isSw ? 'Anza Kutumia Agrolink' : 'Launch Agrolink Platform'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
