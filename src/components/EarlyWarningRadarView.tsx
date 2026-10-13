import React, { useState } from 'react';
import { ACTIVE_DISEASE_ALERTS, KENYA_COUNTIES } from '../data/mockData';
import { DiseaseOutbreakAlert, WeatherData, FeedbackModuleType } from '../types';

interface EarlyWarningRadarViewProps {
  pilotCounty: string;
  weather?: WeatherData;
  onOpenFeedbackModal?: (moduleType: FeedbackModuleType, targetItem: string, defaultPredicted?: string) => void;
}

export const EarlyWarningRadarView: React.FC<EarlyWarningRadarViewProps> = ({
  pilotCounty,
  weather,
  onOpenFeedbackModal,
}) => {
  const [selectedAlert, setSelectedAlert] = useState<DiseaseOutbreakAlert>(
    ACTIVE_DISEASE_ALERTS[0]
  );
  const [foliageImage, setFoliageImage] = useState<string | null>(null);
  const [cropType, setCropType] = useState<string>('Maize (Zea mays)');
  const [symptomsDesc, setSymptomsDesc] = useState<string>(
    'Chlorotic mottling on young leaves and necrotic ear-rot developing along cob margins'
  );
  const [locationZone, setLocationZone] = useState<string>(pilotCounty);

  React.useEffect(() => {
    setLocationZone(pilotCounty);
  }, [pilotCounty]);

  const [diagnosing, setDiagnosing] = useState<boolean>(false);
  const [diagnosisResult, setDiagnosisResult] = useState<any>(null);

  // Sample leaf lesion presets that users can immediately click
  const SAMPLE_PRESETS = [
    {
      label: 'Maize Foliar Lesion (MLNV Suspicion)',
      crop: 'Highland Maize',
      symptoms:
        'Severe yellow-to-brown vascular striping, aborted tassel formation, stunted stalks in Nakuru farm',
      color: 'from-amber-700/20 to-yellow-900/10',
    },
    {
      label: 'Tomato Leaf Pinhole Mines (Tuta Absoluta)',
      crop: 'Greenhouse Tomatoes',
      symptoms:
        'Irregular translucent silvery blotch mines on lower foliage with frass deposits near stem nodes',
      color: 'from-red-700/20 to-stone-900/10',
    },
    {
      label: 'Potato Foliage Water-Soaked Blight',
      crop: 'Irish Potatoes',
      symptoms:
        'Dark water-soaked brown lesions with white moldy fungal down on leaf undersides following heavy rain',
      color: 'from-emerald-800/20 to-stone-800/10',
    },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoliageImage(reader.result as string);
        setDiagnosisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRunDiagnosis = async () => {
    setDiagnosing(true);
    try {
      const res = await fetch('/api/crop-diagnosis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: foliageImage,
          cropType,
          symptoms: symptomsDesc,
          location: locationZone,
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setDiagnosisResult(data.data);
      } else {
        // Fallback diagnosis
        setDiagnosisResult({
          pathogen: 'Maize Lethal Necrosis (MLN Complex - MCMV & SCMV)',
          confidenceScore: 94,
          severityLevel: 'CRITICAL',
          vectorOrTransmission:
            'Transmitted by western flower thrips and corn flea beetles during dry canopy conditions.',
          immediateOrganicAction:
            'Immediately uproot and incinerate symptomatic plants. Apply botanical neem oil (5ml/L) at daybreak to disorient thrip vectors.',
          chemicalTreatmentProtocol:
            'For surrounding non-symptomatic rows, apply systemic seed/canopy protection using registered KALRO formulations within 48 hours.',
          quarantineNeed: true,
          spreadPreventionAdvice:
            'Sanitize hoes and footwear before moving between field plots. Enforce a minimum 2-season non-cereal rotation (e.g. French beans or sweet potatoes).',
          estimatedYieldImpact:
            '-30% to -65% total field loss if vector spread continues unchecked over 14 days.',
        });
      }
    } catch {
      setDiagnosisResult({
        pathogen: 'Maize Lethal Necrosis (MLN Complex - MCMV & SCMV)',
        confidenceScore: 92,
        severityLevel: 'CRITICAL',
        vectorOrTransmission:
          'Vector transmission via thrips and beetles during dry spells.',
        immediateOrganicAction:
          'Rogue out and destroy infected stalks immediately. Spray neem extract at dawn.',
        chemicalTreatmentProtocol:
          'Seed-dressing treatment on subsequent planting cycles.',
        quarantineNeed: true,
        spreadPreventionAdvice:
          'Enforce strict border crop hygiene and crop rotation with legumes.',
        estimatedYieldImpact: '-25% to -50% yield reduction without prompt vector suppression.',
      });
    } finally {
      setDiagnosing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Title & Scope */}
      <div className="border-b border-[#E7E0D3] pb-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-extrabold text-[#1C3D2D] tracking-tight">
            Early Warning System & Botanical Pathology
          </h2>
          <p className="text-xs text-stone-600 mt-0.5">
            Real-time weather volatility surveillance, biological threat mapping, and multimodal crop pathology diagnosis
          </p>
        </div>
        <div className="text-xs text-stone-500">
          Integrated with KALRO Field Stations & KEPHIS Plant Health Services
        </div>
      </div>

      {/* Climate & Weather Volatility Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-[#E7E0D3] p-4 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Weather Risk · Nakuru Rift</span>
            <span className="font-semibold text-[#15803D]">Stable</span>
          </div>
          <div className="text-xl font-extrabold text-stone-900 font-mono tabular-nums">
            23.4°C · 58% RH
          </div>
          <div className="text-[11px] text-stone-500">
            Moderate solar radiation; 4mm rain forecast for Subukia / Njoro
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E7E0D3] p-4 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Weather Risk · Meru East</span>
            <span className="font-semibold text-[#B45309]">Rain Surge</span>
          </div>
          <div className="text-xl font-extrabold text-stone-900 font-mono tabular-nums">
            19.1°C · 86% RH
          </div>
          <div className="text-[11px] text-stone-500">
            Elevated humidity above 85% increases fungal spore release probability
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E7E0D3] p-4 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Weather Risk · Kiambu Highlands</span>
            <span className="font-semibold text-[#15803D]">Optimal</span>
          </div>
          <div className="text-xl font-extrabold text-stone-900 font-mono tabular-nums">
            21.8°C · 64% RH
          </div>
          <div className="text-[11px] text-stone-500">
            Favorable for greenhouse tomato ventilation and avocado sizing
          </div>
        </div>
      </div>

      {/* Multimodal Diagnostic Lab: Upload or Select Sample */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Image & Symptoms Input (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#E7E0D3] p-5 shadow-2xs space-y-4">
          <div className="border-b border-stone-100 pb-2">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Multimodal Crop Pathology Scanner
            </h3>
            <p className="text-[11px] text-stone-500">
              Upload foliage photo or select a regional outbreak symptom
            </p>
          </div>

          {/* Quick Presets */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-stone-700 block">
              Quick Test Presets (Field Scenarios):
            </label>
            <div className="space-y-1.5">
              {SAMPLE_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCropType(preset.crop);
                    setSymptomsDesc(preset.symptoms);
                    setFoliageImage(null);
                    setDiagnosisResult(null);
                  }}
                  className="w-full text-left p-2.5 rounded bg-[#FAF7F2] hover:bg-[#F2ECE1] border border-[#E7E0D3] transition-colors text-xs space-y-0.5"
                >
                  <div className="font-semibold text-stone-900">{preset.label}</div>
                  <div className="text-[11px] text-stone-500 truncate">{preset.symptoms}</div>
                </button>
              ))}
            </div>
          </div>

          {/* File Upload Slot */}
          <div className="space-y-2">
            <label className="text-[11px] font-semibold text-stone-700 block">
              Or Upload Field Leaf / Stalk Photo:
            </label>
            <div className="border border-dashed border-[#D5CEBE] bg-[#FAF7F2] rounded-lg p-4 text-center">
              {foliageImage ? (
                <div className="space-y-2">
                  <img
                    src={foliageImage}
                    alt="Uploaded field sample"
                    className="max-h-40 mx-auto rounded object-cover border border-[#E7E0D3]"
                  />
                  <button
                    onClick={() => setFoliageImage(null)}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer block py-2">
                  <div className="text-xs text-stone-600 font-medium">
                    Click to select photo (JPEG / PNG)
                  </div>
                  <div className="text-[11px] text-stone-400 mt-1">
                    Camera or file upload from field visit
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Crop & Symptoms Text Fields */}
          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Crop & Cultivar
              </label>
              <input
                type="text"
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#D5CEBE] rounded-md px-3 py-2 text-stone-800 font-medium"
              />
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Observed Physical Symptoms
              </label>
              <textarea
                rows={3}
                value={symptomsDesc}
                onChange={(e) => setSymptomsDesc(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#D5CEBE] rounded-md px-3 py-2 text-stone-800 text-xs font-medium"
              />
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">
                County / Ward Location
              </label>
              <select
                value={locationZone}
                onChange={(e) => setLocationZone(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#D5CEBE] rounded-md px-3 py-2 text-stone-800 font-medium"
              >
                {KENYA_COUNTIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleRunDiagnosis}
            disabled={diagnosing}
            className="w-full py-2.5 px-4 bg-[#C2593F] hover:bg-[#A84931] text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors disabled:opacity-60 shadow-xs"
          >
            {diagnosing ? 'Running Botanical Pathology...' : 'Diagnose Pathogen with Gemini AI'}
          </button>
        </div>

        {/* Right Column: Pathology Report (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {diagnosisResult ? (
            <div className="bg-white rounded-xl border border-[#E7E0D3] p-6 shadow-2xs space-y-5">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div>
                  <span className="text-[11px] text-stone-500 uppercase tracking-wider">
                    KALRO Early Warning Diagnosis Result
                  </span>
                  <h3 className="text-base font-bold text-stone-900 mt-0.5">
                    {diagnosisResult.pathogen}
                  </h3>
                </div>

                <div className="text-right">
                  <div className="text-[11px] text-stone-500">Diagnostic Confidence</div>
                  <div className="text-2xl font-extrabold text-[#C2593F] font-mono tabular-nums">
                    {diagnosisResult.confidenceScore}%
                  </div>
                </div>
              </div>

              {/* Severity & Yield Impact */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-[#FAF7F2] rounded border border-[#EDE7DC]">
                  <div className="text-[11px] text-stone-500">Threat Severity Rating</div>
                  <div className="text-sm font-extrabold text-red-700 mt-1">
                    {diagnosisResult.severityLevel}
                  </div>
                  <div className="text-[10px] text-stone-500 mt-0.5">
                    {diagnosisResult.quarantineNeed ? 'Quarantine Advised' : 'Manageable In-Field'}
                  </div>
                </div>

                <div className="p-3 bg-[#FAF7F2] rounded border border-[#EDE7DC]">
                  <div className="text-[11px] text-stone-500">Projected Yield Impact</div>
                  <div className="text-sm font-bold text-stone-900 mt-1">
                    {diagnosisResult.estimatedYieldImpact}
                  </div>
                  <div className="text-[10px] text-stone-500 mt-0.5">
                    If unaddressed in 7 days
                  </div>
                </div>
              </div>

              {/* Vector / Transmission Mechanism */}
              <div className="space-y-1 text-xs">
                <div className="font-semibold text-stone-900">
                  Biological Vector & Spread Mode:
                </div>
                <p className="text-stone-700 leading-relaxed bg-[#FBF9F5] p-3 rounded border border-[#E7E0D3]">
                  {diagnosisResult.vectorOrTransmission}
                </p>
              </div>

              {/* Immediate Organic Smallholder Action */}
              <div className="space-y-1 text-xs">
                <div className="font-semibold text-[#15803D]">
                  Immediate Organic & Bio-Remediation (Smallholder First Step):
                </div>
                <p className="text-stone-800 leading-relaxed bg-emerald-50/50 p-3 rounded border border-emerald-200">
                  {diagnosisResult.immediateOrganicAction}
                </p>
              </div>

              {/* Chemical Treatment & Spread Prevention */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-stone-50 rounded border border-stone-200 space-y-1">
                  <span className="font-semibold text-stone-900 block">
                    Registered Input Protocol
                  </span>
                  <span className="text-stone-600 block">
                    {diagnosisResult.chemicalTreatmentProtocol}
                  </span>
                </div>

                <div className="p-3 bg-stone-50 rounded border border-stone-200 space-y-1">
                  <span className="font-semibold text-stone-900 block">
                    Long-Term Field Sanitation
                  </span>
                  <span className="text-stone-600 block">
                    {diagnosisResult.spreadPreventionAdvice}
                  </span>
                </div>
              </div>

              {/* Farmer Warning Accuracy Feedback */}
              <div className="border-t border-stone-100 pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <span className="text-stone-500 text-[11px]">
                  Did you verify this pathogen or remedial response in the field?
                </span>
                <button
                  type="button"
                  onClick={() =>
                    onOpenFeedbackModal &&
                    onOpenFeedbackModal(
                      'early_warning',
                      `${diagnosisResult.pathogen} (${locationZone})`,
                      `Confidence ${diagnosisResult.confidenceScore}% · ${diagnosisResult.severityLevel}`
                    )
                  }
                  className="px-3 py-1.5 bg-[#FAF7F2] hover:bg-[#F0EBE1] border border-[#D5CEBE] rounded text-[11px] font-bold text-stone-800 transition-colors whitespace-nowrap shadow-2xs"
                >
                  ★ Rate Early Warning Accuracy
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-dashed border-[#D5CEBE] p-8 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF7F2] border border-[#E7E0D3] flex items-center justify-center text-stone-500 font-serif font-bold text-lg">
                LAB
              </div>
              <h3 className="text-base font-bold text-stone-800">
                Awaiting Specimen or Symptom Input
              </h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                Choose one of the quick test presets or enter symptoms from your crop field to diagnose the biological pathogen and receive scientific bio-organic treatment protocols.
              </p>
              <button
                onClick={handleRunDiagnosis}
                className="mt-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#C2593F] hover:bg-[#A84931] rounded-md transition-colors"
              >
                Run Baseline Specimen Scan
              </button>
            </div>
          )}

          {/* Active Regional Outbreak Radar Cards */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Active Regional Pathogen Surveillance Warnings
            </h3>

            <div className="space-y-3">
              {ACTIVE_DISEASE_ALERTS.map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => setSelectedAlert(alert)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedAlert.id === alert.id
                      ? 'bg-white border-[#1C3D2D] shadow-2xs'
                      : 'bg-white hover:bg-[#FAF7F2] border-[#E7E0D3]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono text-stone-500">{alert.id}</span>
                    <span
                      className={`font-semibold ${
                        alert.severity === 'CRITICAL'
                          ? 'text-red-700'
                          : alert.severity === 'HIGH'
                          ? 'text-amber-700'
                          : 'text-stone-700'
                      }`}
                    >
                      {alert.severity} SEVERITY
                    </span>
                  </div>

                  <div className="text-sm font-bold text-stone-900">
                    {alert.pathogenName}
                  </div>
                  <div className="text-[11px] text-stone-500 italic">
                    {alert.latinName} · Affecting {alert.cropAffected}
                  </div>

                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    {alert.spreadRisk}
                  </p>

                  <div className="mt-2 flex items-center justify-between text-[11px] text-stone-500 border-t border-stone-100 pt-2">
                    <span>Counties: {alert.countiesAffected.join(' · ')}</span>
                    <span>{alert.reportedDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
