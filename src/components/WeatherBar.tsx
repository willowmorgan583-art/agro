import React from 'react';
import { WeatherData } from '../types';
import { Language, translations } from '../locales/translations';

interface WeatherBarProps {
  weather: WeatherData;
  loading: boolean;
  onDetectGPS: () => void;
  onRefreshWeather: () => void;
  language?: Language;
}

export const WeatherBar: React.FC<WeatherBarProps> = ({
  weather,
  loading,
  onDetectGPS,
  onRefreshWeather,
  language = 'en',
}) => {
  const isSw = language === 'sw';
  const t = translations[language];

  return (
    <div className="bg-[#FAF7F2] border-b border-[#E7E0D3] py-2 px-4 sm:px-6 lg:px-8 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2">
        {/* Left: Location & Detection Mode */}
        <div className="flex items-center gap-2 flex-wrap text-stone-700">
          <span className="font-semibold text-[#1C3D2D] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#15803D]" />
            {weather.locationName}
          </span>
          <span aria-hidden="true" className="text-stone-300">·</span>

          <span className="text-stone-500">
            {weather.isGpsDetected ? (
              <span className="font-medium text-[#1C3D2D]">
                {t.weatherGpsLive || (isSw ? 'GPS Moja kwa Moja' : 'GPS Live Synced')}
              </span>
            ) : (
              <span>
                {t.weatherAgroProfile || (isSw ? 'Wasifu wa Eneo la Kilimo' : 'Agro-Zone Profile')}
              </span>
            )}
          </span>

          <span aria-hidden="true" className="text-stone-300">·</span>

          {/* Meteorological Metrics */}
          <div className="flex items-center gap-2 font-mono tabular-nums text-stone-800">
            <span>{weather.temperatureC}°C</span>
            <span>·</span>
            <span>{weather.humidityPercent}% RH</span>
            <span>·</span>
            <span>{weather.precipitationForecastMm}mm {isSw ? 'Mvua' : 'Rain'}</span>
            <span>·</span>
            <span className="font-sans font-medium text-stone-600">
              {weather.weatherCondition}
            </span>
          </div>
        </div>

        {/* Right: Agricultural Impact Alert & Action */}
        <div className="flex items-center gap-3 justify-between md:justify-end">
          <div className="flex items-center gap-1.5 text-stone-600">
            <span className="text-[11px] text-stone-500">
              {t.weatherBlightIndex || (isSw ? 'Kiwango cha Ukungu:' : 'Blight Index:')}
            </span>
            <span
              className={`font-mono font-bold tabular-nums ${
                weather.blightRiskScore > 75
                  ? 'text-red-700'
                  : weather.blightRiskScore > 50
                  ? 'text-amber-700'
                  : 'text-[#15803D]'
              }`}
            >
              {weather.blightRiskScore}%
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="text-[11px] text-stone-500">
              {isSw ? 'Udongo:' : 'Soil:'}
            </span>
            <span className="font-medium text-stone-700">
              {weather.soilMoistureIndex}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onDetectGPS}
              disabled={loading}
              className="px-2.5 py-1 bg-white hover:bg-stone-50 border border-[#D5CEBE] rounded text-[11px] font-medium text-stone-700 hover:text-stone-900 transition-colors whitespace-nowrap shadow-2xs disabled:opacity-60"
              title={isSw ? 'Tambua eneo lako kupitia GPS' : 'Detect your exact location via browser GPS'}
            >
              {loading ? (t.btnLocating || 'Locating...') : (t.btnDetectGps || (isSw ? 'Tumia GPS Yangu' : 'Use My GPS'))}
            </button>
            <button
              onClick={onRefreshWeather}
              disabled={loading}
              className="p-1 text-stone-400 hover:text-stone-700 transition-colors"
              title={isSw ? 'Sasisha taarifa ya hewa' : 'Refresh live microclimate telemetry'}
            >
              ↻
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
