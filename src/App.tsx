import React, { useState, useEffect, useCallback } from 'react';
import { ActiveTab, UserRole, WeatherData, FarmerFeedbackRecord, FeedbackModuleType, OnboardingData } from './types';
import { KENYA_COUNTIES, INITIAL_FEEDBACK_RECORDS } from './data/mockData';
import { OfflineSyncProvider } from './context/OfflineSyncContext';
import { TopNav } from './components/TopNav';
import { RoleSwitcher } from './components/RoleSwitcher';
import { WeatherBar } from './components/WeatherBar';
import { OfflineStatusBanner } from './components/OfflineStatusBanner';
import { OverviewDashboard } from './components/OverviewDashboard';
import { DemandPredictionView } from './components/DemandPredictionView';
import { EarlyWarningRadarView } from './components/EarlyWarningRadarView';
import { SmartDispatchView } from './components/SmartDispatchView';
import { AgriFinanceView } from './components/AgriFinanceView';
import { FeedbackAnalyticsView } from './components/FeedbackAnalyticsView';
import { USSDSimulatorView } from './components/USSDSimulatorView';
import { AgronomyChatbot } from './components/AgronomyChatbot';
import { FeedbackModal } from './components/FeedbackModal';
import { OnboardingModal } from './components/OnboardingModal';
import { Footer } from './components/Footer';
import { Language } from './locales/translations';

function AgrolinkAppContent() {
  const [language, setLanguage] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [currentRole, setCurrentRole] = useState<UserRole>('farmer');
  const [pilotCounty, setPilotCounty] = useState<string>('Nakuru (Rift Valley)');

  // Feedback State
  const [feedbackList, setFeedbackList] = useState<FarmerFeedbackRecord[]>(INITIAL_FEEDBACK_RECORDS);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState<boolean>(false);
  const [activeFeedbackModule, setActiveFeedbackModule] = useState<FeedbackModuleType>('demand_prediction');
  const [activeFeedbackTitle, setActiveFeedbackTitle] = useState<string>('French Beans (Meru)');
  const [activeFeedbackDefaultVal, setActiveFeedbackDefaultVal] = useState<string>('KES 115 / kg');

  // Onboarding State
  const [onboardingOpen, setOnboardingOpen] = useState<boolean>(() => {
    try {
      return !localStorage.getItem('agrolink_onboarding_completed_v1');
    } catch {
      return false;
    }
  });

  const [weatherLoading, setWeatherLoading] = useState<boolean>(false);
  const [weather, setWeather] = useState<WeatherData>({
    locationName: 'Nakuru (Rift Valley)',
    latitude: -0.3031,
    longitude: 36.0800,
    temperatureC: 22.4,
    humidityPercent: 62,
    precipitationForecastMm: 0.0,
    weatherCondition: 'Mild & Clear',
    frostRisk: 'NONE',
    blightRiskScore: 32,
    windSpeedKmH: 11.2,
    soilMoistureIndex: 'OPTIMAL',
    agronomicAdvisory: 'Optimal weather for fieldwork and solar transport dispatch.',
    isGpsDetected: false,
  });

  // Fetch weather tailored to coordinates or county
  const fetchWeather = useCallback(async (lat?: number, lng?: number, countyName?: string) => {
    setWeatherLoading(true);
    try {
      const res = await fetch('/api/weather-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          latitude: lat,
          longitude: lng,
          county: countyName || pilotCounty,
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setWeather(data.data);
      }
    } catch (e) {
      console.warn('Weather sync error:', e);
    } finally {
      setWeatherLoading(false);
    }
  }, [pilotCounty]);

  // Sync weather whenever pilotCounty changes
  useEffect(() => {
    fetchWeather(undefined, undefined, pilotCounty);
  }, [pilotCounty, fetchWeather]);

  // Browser GPS Geolocation detection
  const handleDetectGPS = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setWeatherLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchWeather(latitude, longitude, `GPS Location (${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°)`);
      },
      (err) => {
        console.warn('Geolocation permission denied or timed out:', err);
        setWeatherLoading(false);
        fetchWeather(undefined, undefined, pilotCounty);
      },
      { timeout: 7000 }
    );
  };

  const handleOpenUSSD = () => {
    setActiveTab('ussd_simulator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenFeedback = (
    moduleType: FeedbackModuleType,
    targetItem: string,
    defaultPredicted: string = 'KES 115 / kg'
  ) => {
    setActiveFeedbackModule(moduleType);
    setActiveFeedbackTitle(targetItem);
    setActiveFeedbackDefaultVal(defaultPredicted);
    setFeedbackModalOpen(true);
  };

  const handleFeedbackSubmitted = (newFeedback: FarmerFeedbackRecord) => {
    setFeedbackList((prev) => [newFeedback, ...prev]);
  };

  const handleOnboardingComplete = (data: OnboardingData) => {
    try {
      localStorage.setItem('agrolink_onboarding_completed_v1', 'true');
    } catch {}
    if (data.county) {
      setPilotCounty(data.county);
    }
    setOnboardingOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-900 flex flex-col font-sans">
      {/* Offline Ribbon & Toast Notifications */}
      <OfflineStatusBanner />

      {/* Strict 3-Zone Top Navigation Contract */}
      <TopNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenUSSD={handleOpenUSSD}
        onOpenOnboarding={() => setOnboardingOpen(true)}
        language={language}
        onLanguageChange={setLanguage}
      />

      {/* Role Switcher Toolbar */}
      <RoleSwitcher
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        pilotCounty={pilotCounty}
        setPilotCounty={setPilotCounty}
        counties={KENYA_COUNTIES}
        language={language}
      />

      {/* Live Localized Microclimate & Weather Bar */}
      <WeatherBar
        weather={weather}
        loading={weatherLoading}
        onDetectGPS={handleDetectGPS}
        onRefreshWeather={() => fetchWeather(undefined, undefined, pilotCounty)}
        language={language}
      />

      {/* Main Content Area Synchronized to Location & Microclimate */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <OverviewDashboard
            setActiveTab={setActiveTab}
            currentRole={currentRole}
            pilotCounty={pilotCounty}
            language={language}
          />
        )}

        {activeTab === 'demand' && (
          <DemandPredictionView
            pilotCounty={pilotCounty}
            weather={weather}
            onOpenFeedbackModal={handleOpenFeedback}
          />
        )}

        {activeTab === 'early_warning' && (
          <EarlyWarningRadarView
            pilotCounty={pilotCounty}
            weather={weather}
            onOpenFeedbackModal={handleOpenFeedback}
          />
        )}

        {activeTab === 'smart_dispatch' && (
          <SmartDispatchView
            pilotCounty={pilotCounty}
            onOpenFeedbackModal={handleOpenFeedback}
          />
        )}

        {activeTab === 'agrifinance' && <AgriFinanceView />}

        {activeTab === 'feedback' && (
          <FeedbackAnalyticsView
            feedbackList={feedbackList}
            onOpenFeedbackModal={handleOpenFeedback}
          />
        )}

        {activeTab === 'ussd_simulator' && (
          <USSDSimulatorView pilotCounty={pilotCounty} />
        )}
      </main>

      {/* Floating Multi-Turn Agronomy & Trade Concierge Chatbot */}
      <AgronomyChatbot
        currentRole={currentRole}
        pilotCounty={pilotCounty}
        weather={weather}
        language={language}
      />

      {/* Modals */}
      <FeedbackModal
        isOpen={feedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
        moduleType={activeFeedbackModule}
        targetItemTitle={activeFeedbackTitle}
        defaultPredictedValue={activeFeedbackDefaultVal}
        county={pilotCounty}
        onSubmitted={handleFeedbackSubmitted}
      />

      <OnboardingModal
        isOpen={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        onComplete={handleOnboardingComplete}
        initialCounty={pilotCounty}
      />

      {/* Quiet Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

export default function App() {
  return (
    <OfflineSyncProvider>
      <AgrolinkAppContent />
    </OfflineSyncProvider>
  );
}
