import React, { useState } from 'react';

interface USSDSimulatorViewProps {
  pilotCounty: string;
}

export const USSDSimulatorView: React.FC<USSDSimulatorViewProps> = ({
  pilotCounty,
}) => {
  const [dialCode, setDialCode] = useState<string>('*384*55#');
  const [sessionActive, setSessionActive] = useState<boolean>(true);
  const [sessionStage, setSessionStage] = useState<string>('MAIN_MENU');
  const [screenText, setScreenText] = useState<string>(
    'AGROLINK AFRICA (*384*55#)\n1. Latest Market Prices (KES)\n2. Register Ready Harvest\n3. Weather & Pest Alert\n4. AgriFinance Wallet\n5. County Agronomist Help\nReply with number:'
  );
  const [userInput, setUserInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [sessionLog, setSessionLog] = useState<string[]>([
    'Dialed *384*55# on Safaricom 2G network',
  ]);

  const handleSend = async (valToSend?: string) => {
    const textToSend = valToSend !== undefined ? valToSend : userInput;
    if (!textToSend.trim()) return;

    setLoading(true);
    setSessionLog((prev) => [...prev, `Farmer > ${textToSend}`]);
    setUserInput('');

    try {
      const res = await fetch('/api/ussd-simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userText: textToSend,
          sessionStage,
          farmerCounty: pilotCounty,
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setScreenText(data.data.screenText);
        setSessionStage(data.data.nextStage || 'SUB_MENU');
        setSessionLog((prev) => [...prev, `USSD > ${data.data.screenText}`]);
        if (data.data.isTerminal) {
          // session ends
        }
      } else {
        // Fallback simulated USSD tree
        handleLocalUSSDTree(textToSend);
      }
    } catch {
      handleLocalUSSDTree(textToSend);
    } finally {
      setLoading(false);
    }
  };

  const handleLocalUSSDTree = (input: string) => {
    let reply = '';
    let next = 'MAIN_MENU';

    if (input === '1') {
      reply = `${pilotCounty.toUpperCase()} WHOLESALE:\n- French Beans: KES 95/kg\n- Hass Avocados: KES 140/kg\n- Irish Potatoes: KES 50/kg\n- Hybrid Maize: KES 42/kg\n0. Back`;
      next = 'PRICES';
    } else if (input === '2') {
      reply = `REGISTER READY HARVEST:\n1. French Beans\n2. Hass Avocados\n3. Tomatoes\n4. Potatoes\n0. Main Menu`;
      next = 'HARVEST_SELECT';
    } else if (input === '3') {
      reply = `ALERT FOR ${pilotCounty.toUpperCase()}:\nMaize Lethal Necrosis (MLNV) reported in nearby wards. Scout leaf margins for chlorotic yellowing.\n0. Back`;
      next = 'ALERT';
    } else if (input === '4') {
      reply = `AGRIFINANCE WALLET:\nEscrow Balance: KES 323,000\nWRS Collateral: 8.4 MT\nMicrocredit Limit: KES 250,000\n0. Back`;
      next = 'WALLET';
    } else if (input === '5') {
      reply = `Agronomist callback requested. Officer Joseph Mwangi will SMS your mobile within 30 minutes.\nThank you!`;
      next = 'MAIN_MENU';
    } else if (input === '0') {
      reply =
        'AGROLINK AFRICA (*384*55#)\n1. Latest Market Prices (KES)\n2. Register Ready Harvest\n3. Weather & Pest Alert\n4. AgriFinance Wallet\n5. County Agronomist Help\nReply with number:';
      next = 'MAIN_MENU';
    } else {
      reply = `Invalid selection.\nReply with number (1-5):\n0. Main Menu`;
      next = 'MAIN_MENU';
    }

    setScreenText(reply);
    setSessionStage(next);
    setSessionLog((prev) => [...prev, `USSD > ${reply}`]);
  };

  const handleResetSession = () => {
    setSessionStage('MAIN_MENU');
    setScreenText(
      'AGROLINK AFRICA (*384*55#)\n1. Latest Market Prices (KES)\n2. Register Ready Harvest\n3. Weather & Pest Alert\n4. AgriFinance Wallet\n5. County Agronomist Help\nReply with number:'
    );
    setUserInput('');
    setSessionLog(['Restarted USSD session (*384*55#)']);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-[#E7E0D3] pb-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-extrabold text-[#1C3D2D] tracking-tight">
            Offline Rural Accessibility — USSD & SMS Gateway (*384*55#)
          </h2>
          <p className="text-xs text-stone-600 mt-0.5">
            Empowering smallholders in low-connectivity rural areas without smartphones or high-speed data
          </p>
        </div>
        <div className="text-xs text-stone-500">
          Powered by Gemini 3.1 Flash Lite · Telco 2G Telephony Engine
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Handset Simulation (5 cols) */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-80 bg-stone-900 rounded-3xl p-5 shadow-2xl border-4 border-stone-800 space-y-4">
            {/* Handset Speaker & Brand */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-12 h-1.5 bg-stone-700 rounded-full" />
              <div className="text-[10px] uppercase font-mono tracking-widest text-stone-500">
                SAFARICOM 2G · TELKOM
              </div>
            </div>

            {/* Monochrome Green LCD Screen */}
            <div className="bg-[#7B8F74] text-[#1B291A] p-4 rounded-lg font-mono text-xs shadow-inner min-h-[190px] flex flex-col justify-between border-2 border-[#5B6D55]">
              <div className="whitespace-pre-line leading-relaxed font-semibold">
                {screenText}
              </div>

              {loading && (
                <div className="text-[10px] text-[#2F442C] animate-pulse mt-2">
                  Transmitting over GSM network...
                </div>
              )}
            </div>

            {/* Input & Send Controls on Phone */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type number (e.g. 1)"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="w-full bg-stone-800 text-stone-100 border border-stone-700 rounded px-3 py-1.5 text-xs font-mono focus:outline-hidden focus:border-[#C2593F]"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={loading}
                  className="px-3 py-1.5 bg-[#1C3D2D] hover:bg-[#2A5741] text-white text-xs font-bold rounded"
                >
                  SEND
                </button>
              </div>

              {/* Physical Keypad Simulation Buttons */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map(
                  (key) => (
                    <button
                      key={key}
                      onClick={() => handleSend(key)}
                      className="py-2.5 bg-stone-800 hover:bg-stone-700 active:bg-stone-600 text-stone-200 text-xs font-mono font-bold rounded transition-colors"
                    >
                      {key}
                    </button>
                  )
                )}
              </div>

              <div className="pt-2 flex justify-between gap-2">
                <button
                  onClick={handleResetSession}
                  className="w-full py-1.5 bg-red-900/60 hover:bg-red-800 text-red-200 text-[11px] font-bold rounded"
                >
                  END SESSION
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Architectural Context & Session Log (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white rounded-xl border border-[#E7E0D3] p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-stone-900">
              Why Offline Accessibility is Agrolink's Competitive Moat
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              While high-tech platforms often cater only to large commercial estates with smartphones and 4G coverage, over 65% of smallholder food in Kenya and East Africa is grown in rural zones with intermittent cellular data.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#FAF7F2] rounded border border-[#EDE7DC] space-y-1">
                <span className="font-semibold text-stone-900 block">
                  Zero Data Cost to Smallholder
                </span>
                <span className="text-stone-600">
                  Telco session costs are subsidized by institutional buyer matching fees.
                </span>
              </div>
              <div className="p-3 bg-[#FAF7F2] rounded border border-[#EDE7DC] space-y-1">
                <span className="font-semibold text-stone-900 block">
                  Synchronous Real-Time Dispatch
                </span>
                <span className="text-stone-600">
                  A farmer in Meru dialing *384*55# immediately posts ready tonnage to the enterprise dispatch grid.
                </span>
              </div>
            </div>
          </div>

          {/* Live Telco Gateway Log */}
          <div className="bg-white rounded-xl border border-[#E7E0D3] p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <span className="text-xs font-bold text-stone-900 uppercase">
                Live Telco USSD Gateway Transcript
              </span>
              <span className="text-[11px] text-stone-400 font-mono">
                Port 384 · Session ID #9821
              </span>
            </div>

            <div className="max-h-56 overflow-y-auto space-y-2 font-mono text-xs bg-[#FAF7F2] p-3 rounded border border-stone-200">
              {sessionLog.map((log, idx) => (
                <div
                  key={idx}
                  className={`leading-relaxed ${
                    log.startsWith('Farmer >')
                      ? 'text-[#C2593F] font-bold'
                      : log.startsWith('USSD >')
                      ? 'text-[#1C3D2D]'
                      : 'text-stone-500 italic'
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
