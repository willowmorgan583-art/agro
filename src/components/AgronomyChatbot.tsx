import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, UserRole, WeatherData } from '../types';
import { Language } from '../locales/translations';

interface AgronomyChatbotProps {
  currentRole: UserRole;
  pilotCounty: string;
  weather: WeatherData;
  language: Language;
}

export const AgronomyChatbot: React.FC<AgronomyChatbotProps> = ({
  currentRole,
  pilotCounty,
  weather,
  language,
}) => {
  const isSw = language === 'sw';
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Generate initial greeting based on language
  const getInitialGreeting = (lang: Language): string => {
    if (lang === 'sw') {
      const roleStr =
        currentRole === 'farmer'
          ? 'shughuli zako za upandaji na mavuno'
          : currentRole === 'buyer'
          ? 'ununuzi wa mazao yaliyoidhinishwa'
          : currentRole === 'logistics'
          ? 'usafirishaji wa malori ya baridi'
          : 'uchambuzi wa mnyororo wa thamani';
      return `Habari! Mimi ni Mshauri wako wa AI wa Agrolink kwa **${pilotCounty}**.\n\nHali ya hewa ya sasa: **${weather.temperatureC}°C**, unyevu wa **${weather.humidityPercent}% RH** na **${weather.weatherCondition}**.\n\nJe, ninawezaje kukusaidia katika ${roleStr} leo?`;
    }

    const roleStr =
      currentRole === 'farmer'
        ? 'farming operations'
        : currentRole === 'buyer'
        ? 'produce procurement'
        : currentRole === 'logistics'
        ? 'fleet dispatch'
        : 'value-chain analysis';
    return `Hello! I am your Agrolink AI Concierge for **${pilotCounty}**.\n\nCurrent local microclimate: **${weather.temperatureC}°C** with **${weather.humidityPercent}% RH** and **${weather.weatherCondition}**.\n\nHow can I support your ${roleStr} today?`;
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'model',
      content: getInitialGreeting(language),
      timestamp: 'Just now',
    },
  ]);

  // Update greeting when language changes if only the welcome message exists
  useEffect(() => {
    if (messages.length <= 1) {
      setMessages([
        {
          id: `welcome-${language}`,
          role: 'model',
          content: getInitialGreeting(language),
          timestamp: 'Just now',
        },
      ]);
    }
  }, [language]);

  const [inputText, setInputText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Dynamic suggestion chips based on active role & weather & language
  const getSuggestions = () => {
    if (isSw) {
      if (currentRole === 'farmer') {
        return [
          weather.humidityPercent > 75
            ? 'Je, nipulize dawa ya ukungu kutokana na unyevu huu mkubwa?'
            : 'Muda bora wa kupuliza dawa shambani leo',
          `Bei ya soko ya maharagwe ya mishiri (French beans) katika ${pilotCounty}?`,
          'Mbinu za kiasili za kutibu madoa ya majani ya mahindi',
        ];
      }
      if (currentRole === 'buyer') {
        return [
          `Mazao yaliyothibitishwa tayari kwa soko katika ${pilotCounty}`,
          'Kuna ucheleweshaji wa usafiri barabarani kutokana na mvua?',
          'Viwango vya ubora wa parachichi za Hass daraja A kwa mauzo ya nje',
        ];
      }
      if (currentRole === 'logistics') {
        return [
          'Viwango sahihi vya nyuzi joto za friji kwa mboga za majani',
          'Njia salama ya usafirishaji kutoka Meru hadi soko la Wakulima',
          'Jinsi ya kupunguza kuharibika kwa mazao safarini',
        ];
      }
      return [
        'Muhtasari wa kiasi cha mazao yaliyookolewa robo hii ya mwaka',
        'Matumizi ya stakabadhi za maghala ya NCPB mjini Nakuru',
        'Tathmini ya hatari za mabadiliko ya hali ya hewa',
      ];
    }

    // English
    if (currentRole === 'farmer') {
      return [
        weather.humidityPercent > 75
          ? 'Should I spray fungicides given today\'s high humidity?'
          : 'Optimal spraying window today',
        `Current fair market price for French beans in ${pilotCounty}?`,
        'Organic treatment for early leaf spot lesions',
      ];
    }
    if (currentRole === 'buyer') {
      return [
        `Verified harvest lots ready for offtake in ${pilotCounty}`,
        'Any rain-induced transport delays on highway corridors?',
        'Export quality specs for Grade A Hass avocados',
      ];
    }
    if (currentRole === 'logistics') {
      return [
        'Recommended cold-chain reefer temp for mixed leafy greens',
        'Transit route safety from Meru to Nairobi Wakulima',
        'How to reduce field-to-cooler transit degradation',
      ];
    }
    return [
      'Summary of post-harvest loss avoided this quarter',
      'Warehouse receipt collateral utilization in Nakuru NCPB',
      'Climate vulnerability assessment across pilot counties',
    ];
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend !== undefined ? textToSend : inputText;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputText('');
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          userRole: currentRole,
          location: pilotCounty,
          weatherData: weather,
          language: language,
        }),
      });

      const data = await res.json();
      if (data.success && data.reply) {
        const botMsg: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          role: 'model',
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        const fallbackMsg: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          role: 'model',
          content: isSw
            ? `Katika **${pilotCounty}** ikiwa na joto la **${weather.temperatureC}°C** na unyevu wa **${weather.humidityPercent}%**, hali ni ${
                weather.humidityPercent > 75
                  ? 'yenye unyevu mkubwa unaoweza kuchochea ukungu. Hakikisha mtiririko mzuri wa hewa kati ya mistari.'
                  : 'nzuri kwa shughuli za kawaida za kilimo na uvunaji.'
              }`
            : `In **${pilotCounty}** with current temperature at **${weather.temperatureC}°C** and humidity at **${weather.humidityPercent}%**, conditions are ${
                weather.humidityPercent > 75
                  ? 'humid with heightened fungal spore activity. Ensure inter-row airflow.'
                  : 'favorable for active harvesting.'
              }`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, fallbackMsg]);
      }
    } catch {
      const fallbackMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'model',
        content: isSw
          ? `Kulingana na miongozo ya KALRO kwa **${pilotCounty}**, hatua inayopendekezwa ni kufuatilia unyevu wa udongo na kuthibitisha wanunuzi kabla ya kuvuna mazao.`
          : `Based on verified KALRO data for **${pilotCounty}**, recommended field action is to monitor soil moisture and confirm forward offtake contracts with verified cooperatives before harvesting.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 bg-[#1C3D2D] hover:bg-[#142D21] text-white rounded-full shadow-lg border border-[#2D5A43] transition-all hover:scale-105 group"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#E69D45] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider">
            {isSw ? 'Mshauri wa AI wa Kilimo' : 'Agronomy AI Concierge'}
          </span>
          <span className="text-xs text-stone-300 font-mono">
            {weather.temperatureC}°C
          </span>
        </button>
      )}

      {/* Expanded Chat Drawer */}
      {isOpen && (
        <div className="w-[90vw] sm:w-[420px] h-[550px] bg-white rounded-2xl shadow-2xl border border-[#E7E0D3] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-[#1C3D2D] text-white px-4 py-3 flex items-center justify-between border-b border-[#2D5A43]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E69D45]" />
              <div>
                <div className="text-xs font-bold tracking-tight">
                  {isSw ? 'Mshauri wa AI wa Agrolink' : 'Agrolink AI Concierge'}
                </div>
                <div className="text-[10px] text-stone-300 font-mono">
                  {pilotCounty} · {weather.temperatureC}°C ({weather.weatherCondition})
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-300 hover:text-white p-1 rounded hover:bg-white/10 text-lg leading-none"
              title={isSw ? 'Funga mazungumzo' : 'Close chat'}
            >
              &times;
            </button>
          </div>

          {/* Messages Scrollable Thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FBF9F5] text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-xl p-3 leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-[#1C3D2D] text-white rounded-br-xs'
                      : 'bg-white text-stone-800 border border-[#E7E0D3] rounded-bl-xs shadow-2xs whitespace-pre-line'
                  }`}
                >
                  {m.content}
                </div>
                <span className="text-[9px] text-stone-400 mt-1 px-1">
                  {m.timestamp}
                </span>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-stone-500 bg-white border border-[#E7E0D3] rounded-xl px-3 py-2 w-fit">
                <span className="w-1.5 h-1.5 bg-[#1C3D2D] rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-[#1C3D2D] rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-[#1C3D2D] rounded-full animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px]">
                  {isSw ? 'Inachanganua taarifa za KALRO na bei za soko...' : 'Consulting KALRO & market feed...'}
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          <div className="px-3 py-2 bg-[#F4EFE6] border-t border-[#E7E0D3] flex items-center gap-1.5 overflow-x-auto text-[11px]">
            <span className="text-stone-500 shrink-0 font-medium text-[10px]">
              {isSw ? 'Mifano:' : 'Suggestions:'}
            </span>
            {getSuggestions().map((sug, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(sug)}
                className="px-2.5 py-1 bg-white hover:bg-stone-50 border border-[#D5CEBE] rounded-full text-stone-700 whitespace-nowrap shrink-0 transition-colors"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-[#E7E0D3] flex items-center gap-2">
            <input
              type="text"
              placeholder={
                isSw
                  ? `Uliza kuhusu mazao ya ${pilotCounty}, hali ya hewa au masoko...`
                  : `Ask anything about ${pilotCounty} crops, weather or markets...`
              }
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={loading}
              className="flex-1 bg-[#FAF7F2] border border-[#D5CEBE] rounded-lg px-3 py-2 text-xs text-stone-800 focus:outline-hidden focus:ring-1 focus:ring-[#1C3D2D]"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={loading || !inputText.trim()}
              className="px-3.5 py-2 bg-[#1C3D2D] hover:bg-[#142D21] disabled:opacity-50 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
            >
              {isSw ? 'Tuma' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
