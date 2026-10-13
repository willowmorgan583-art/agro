import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import { Language, translations } from '../locales/translations';

interface YieldGrowthChartProps {
  pilotCounty: string;
  language: Language;
}

interface PhenologyDataPoint {
  week: string;
  stageEn: string;
  stageSw: string;
  projectedGrowth: number; // MT per Acre
  actualYield: number | null; // MT per Acre
  soilMoisture: number; // %
  rainfallMm: number; // mm
}

export const YieldGrowthChart: React.FC<YieldGrowthChartProps> = ({
  pilotCounty,
  language,
}) => {
  const t = translations[language];
  const isSw = language === 'sw';

  // County-specific data sets
  const getCountyPhenologyData = (county: string): PhenologyDataPoint[] => {
    if (county.includes('Meru')) {
      // 12-week French beans cycle
      return [
        { week: 'W1', stageEn: 'Direct Sowing', stageSw: 'Upandaji', projectedGrowth: 0.2, actualYield: 0.2, soilMoisture: 72, rainfallMm: 35 },
        { week: 'W2', stageEn: 'Emergence', stageSw: 'Uchipukaji', projectedGrowth: 0.5, actualYield: 0.45, soilMoisture: 68, rainfallMm: 22 },
        { week: 'W3', stageEn: 'First Trifoliate', stageSw: 'Majani ya Kwanza', projectedGrowth: 0.9, actualYield: 0.85, soilMoisture: 65, rainfallMm: 14 },
        { week: 'W4', stageEn: 'Canopy Spreading', stageSw: 'Kutawanyika Majani', projectedGrowth: 1.4, actualYield: 1.35, soilMoisture: 70, rainfallMm: 28 },
        { week: 'W5', stageEn: 'Bud Initiation', stageSw: 'Kuchipua Maua', projectedGrowth: 2.1, actualYield: 2.05, soilMoisture: 74, rainfallMm: 32 },
        { week: 'W6', stageEn: 'Peak Flowering', stageSw: 'Maua Kamili', projectedGrowth: 2.8, actualYield: 2.75, soilMoisture: 78, rainfallMm: 45 },
        { week: 'W7', stageEn: 'Early Pod Set', stageSw: 'Kutunga Maganda', projectedGrowth: 3.3, actualYield: 3.25, soilMoisture: 75, rainfallMm: 26 },
        { week: 'W8', stageEn: 'Pod Elongation', stageSw: 'Kurefuka Maganda', projectedGrowth: 3.6, actualYield: 3.55, soilMoisture: 68, rainfallMm: 15 },
        { week: 'W9', stageEn: 'First Export Flush', stageSw: 'Mvuno wa Kwanza', projectedGrowth: 3.8, actualYield: 3.82, soilMoisture: 64, rainfallMm: 8 },
        { week: 'W10', stageEn: 'Peak Harvest', stageSw: 'Mvuno Mkuu', projectedGrowth: 3.9, actualYield: 3.95, soilMoisture: 60, rainfallMm: 5 },
        { week: 'W11', stageEn: 'Secondary Flush', stageSw: 'Mvuno wa Pili', projectedGrowth: 3.95, actualYield: 4.02, soilMoisture: 58, rainfallMm: 10 },
        { week: 'W12', stageEn: 'Final Clean Pick', stageSw: 'Mvuno wa Mwisho', projectedGrowth: 4.0, actualYield: 4.08, soilMoisture: 55, rainfallMm: 4 },
      ];
    } else if (county.includes('Kiambu')) {
      // 10-week greenhouse horticulture flush
      return [
        { week: 'W1', stageEn: 'Transplanting', stageSw: 'Kupandikiza', projectedGrowth: 0.8, actualYield: 0.75, soilMoisture: 80, rainfallMm: 18 },
        { week: 'W2', stageEn: 'Root Anchorage', stageSw: 'Kushika Mizizi', projectedGrowth: 1.6, actualYield: 1.55, soilMoisture: 78, rainfallMm: 12 },
        { week: 'W3', stageEn: 'Branch Trellising', stageSw: 'Kufunga Mimea', projectedGrowth: 3.2, actualYield: 3.1, soilMoisture: 75, rainfallMm: 24 },
        { week: 'W4', stageEn: 'Cluster Bloom', stageSw: 'Mikusanyiko ya Maua', projectedGrowth: 5.5, actualYield: 5.4, soilMoisture: 76, rainfallMm: 30 },
        { week: 'W5', stageEn: 'First Fruit Set', stageSw: 'Kutunga Matunda', projectedGrowth: 8.2, actualYield: 8.05, soilMoisture: 74, rainfallMm: 15 },
        { week: 'W6', stageEn: 'Fruit Swelling', stageSw: 'Kunenepa Matunda', projectedGrowth: 10.8, actualYield: 10.7, soilMoisture: 72, rainfallMm: 8 },
        { week: 'W7', stageEn: 'Breaker Stage', stageSw: 'Kuanza Kuiva', projectedGrowth: 12.5, actualYield: 12.3, soilMoisture: 70, rainfallMm: 10 },
        { week: 'W8', stageEn: 'Prime Offtake Flush', stageSw: 'Mvuno Mkuu wa Soko', projectedGrowth: 13.6, actualYield: 13.8, soilMoisture: 68, rainfallMm: 6 },
        { week: 'W9', stageEn: 'Continuous Pick', stageSw: 'Mvuno Endelevu', projectedGrowth: 14.2, actualYield: 14.5, soilMoisture: 66, rainfallMm: 14 },
        { week: 'W10', stageEn: 'Late Flush Yield', stageSw: 'Mavuno ya Mwisho', projectedGrowth: 14.6, actualYield: 14.9, soilMoisture: 65, rainfallMm: 5 },
      ];
    } else {
      // Nakuru 16-week cereal cycle
      return [
        { week: 'W2', stageEn: 'Emergence', stageSw: 'Uchipukaji', projectedGrowth: 0.3, actualYield: 0.28, soilMoisture: 65, rainfallMm: 45 },
        { week: 'W4', stageEn: 'V3 Early Vegetative', stageSw: 'Ukuaji wa Mapema', projectedGrowth: 0.7, actualYield: 0.65, soilMoisture: 70, rainfallMm: 38 },
        { week: 'W6', stageEn: 'Rapid Stem Elongation', stageSw: 'Kurefuka Shina', projectedGrowth: 1.3, actualYield: 1.25, soilMoisture: 72, rainfallMm: 50 },
        { week: 'W8', stageEn: 'Tasseling Initiation', stageSw: 'Kutoa Mbelewele', projectedGrowth: 2.1, actualYield: 2.05, soilMoisture: 78, rainfallMm: 60 },
        { week: 'W10', stageEn: 'Silking & Pollination', stageSw: 'Uchavushaji', projectedGrowth: 2.9, actualYield: 2.85, soilMoisture: 74, rainfallMm: 30 },
        { week: 'W12', stageEn: 'Blister & Milk Stage', stageSw: 'Kuunda Maziwa', projectedGrowth: 3.4, actualYield: 3.35, soilMoisture: 66, rainfallMm: 22 },
        { week: 'W14', stageEn: 'Dough Stage', stageSw: 'Kuganda Mbegu', projectedGrowth: 3.7, actualYield: 3.65, soilMoisture: 60, rainfallMm: 14 },
        { week: 'W16', stageEn: 'Black Layer Maturity', stageSw: 'Ukomavu Kamili', projectedGrowth: 3.8, actualYield: 3.88, soilMoisture: 52, rainfallMm: 8 },
      ];
    }
  };

  const data = getCountyPhenologyData(pilotCounty);

  // Custom tooltips
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const p = payload[0].payload as PhenologyDataPoint;
      return (
        <div className="bg-white p-3 rounded-lg border border-[#E7E0D3] shadow-lg text-xs space-y-1 z-50">
          <div className="font-bold text-[#1C3D2D] border-b border-stone-100 pb-1 flex justify-between gap-3">
            <span>{p.week} · {isSw ? p.stageSw : p.stageEn}</span>
            <span className="font-mono text-stone-500">{pilotCounty}</span>
          </div>

          <div className="space-y-0.5 pt-1">
            <div className="flex justify-between gap-4">
              <span className="text-stone-500">{t.chartProjectedGrowth}:</span>
              <span className="font-mono font-bold text-[#1C3D2D]">{p.projectedGrowth} MT/Ac</span>
            </div>

            {p.actualYield !== null && (
              <div className="flex justify-between gap-4">
                <span className="text-stone-500">{t.chartActualYield}:</span>
                <span className="font-mono font-bold text-[#C2593F]">{p.actualYield} MT/Ac</span>
              </div>
            )}

            <div className="flex justify-between gap-4">
              <span className="text-stone-500">{t.chartSoilMoisture}:</span>
              <span className="font-mono font-semibold text-[#4F772D]">{p.soilMoisture}%</span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-stone-500">{t.chartRainfall}:</span>
              <span className="font-mono text-blue-700">{p.rainfallMm} mm</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="bg-white rounded-xl border border-[#E7E0D3] p-5 sm:p-6 shadow-2xs space-y-4">
      {/* Header */}
      <div className="border-b border-stone-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-bold text-stone-900 tracking-tight">
            {t.chartTitle}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {t.chartSubtitle} · {pilotCounty}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-stone-500">{isSw ? 'Eneo:' : 'Zone:'}</span>
          <span className="font-semibold text-[#1C3D2D] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E7E0D3]">
            {pilotCounty}
          </span>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-72 sm:h-80 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="moistureGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F772D" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#4F772D" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#F0EBE1" />

            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={{ stroke: '#E7E0D3' }}
              tick={{ fill: '#78716C', fontSize: 11 }}
            />

            {/* Left Axis: Yield in MT/Acre */}
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={{ stroke: '#E7E0D3' }}
              tick={{ fill: '#1C3D2D', fontSize: 11 }}
              unit=" MT"
            />

            {/* Right Axis: Moisture % / Rain mm */}
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={{ stroke: '#E7E0D3' }}
              tick={{ fill: '#78716C', fontSize: 11 }}
              unit="%"
              domain={[0, 100]}
            />

            <Tooltip content={<CustomTooltip />} />

            <Legend
              verticalAlign="top"
              height={36}
              iconSize={8}
              wrapperStyle={{ fontSize: '11px', color: '#57534E' }}
            />

            {/* Area: Soil Moisture (Right axis) */}
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="soilMoisture"
              name={t.chartSoilMoisture}
              fill="url(#moistureGradient)"
              stroke="#4F772D"
              strokeWidth={1.5}
            />

            {/* Bar: Rainfall in mm (Right axis) */}
            <Bar
              yAxisId="right"
              dataKey="rainfallMm"
              name={t.chartRainfall}
              fill="#93C5FD"
              opacity={0.65}
              barSize={12}
              radius={[3, 3, 0, 0]}
            />

            {/* Line: Projected Yield Curve (Left axis) */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="projectedGrowth"
              name={t.chartProjectedGrowth}
              stroke="#1C3D2D"
              strokeWidth={2.5}
              dot={{ r: 3, fill: '#1C3D2D' }}
              activeDot={{ r: 5 }}
            />

            {/* Line: Actual Verified Harvested Yield (Left axis) */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="actualYield"
              name={t.chartActualYield}
              stroke="#C2593F"
              strokeWidth={2}
              strokeDasharray="4 2"
              dot={{ r: 3, fill: '#C2593F' }}
              activeDot={{ r: 5 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Insight Annotation Footer */}
      <div className="bg-[#FAF7F2] p-3 rounded-lg border border-[#E7E0D3] text-xs text-stone-700 flex items-start gap-2">
        <span className="text-[#1C3D2D] font-bold shrink-0 mt-0.5">⚡ AI Telemetry:</span>
        <p className="leading-relaxed">
          {t.chartInsight}
        </p>
      </div>
    </section>
  );
};
