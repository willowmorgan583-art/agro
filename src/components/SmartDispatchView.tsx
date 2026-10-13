import React, { useState } from 'react';
import {
  INITIAL_READY_HARVESTS,
  LOGISTICS_VEHICLE_FLEET,
  KENYA_COUNTIES,
} from '../data/mockData';
import { ReadyHarvestLot, TransportVehicle, FeedbackModuleType } from '../types';

interface SmartDispatchViewProps {
  pilotCounty: string;
  onOpenFeedbackModal?: (moduleType: FeedbackModuleType, targetItem: string, defaultPredicted?: string) => void;
}

export const SmartDispatchView: React.FC<SmartDispatchViewProps> = ({
  pilotCounty,
  onOpenFeedbackModal,
}) => {
  const [harvestLots, setHarvestLots] = useState<ReadyHarvestLot[]>(
    INITIAL_READY_HARVESTS
  );
  const [selectedLot, setSelectedLot] = useState<ReadyHarvestLot>(
    INITIAL_READY_HARVESTS[0]
  );
  const [selectedVehicle, setSelectedVehicle] = useState<TransportVehicle>(
    LOGISTICS_VEHICLE_FLEET[0]
  );

  const [calculating, setCalculating] = useState<boolean>(false);
  const [dispatchResult, setDispatchResult] = useState<any>(null);
  const [showAddLotModal, setShowAddLotModal] = useState<boolean>(false);

  // New Harvest Lot Form state
  const [newFarmer, setNewFarmer] = useState<string>('Njoro Organic Growers Co-op');
  const [newCrop, setNewCrop] = useState<string>('Baby Spinach & Bok Choy');
  const [newTons, setNewTons] = useState<number>(2.5);
  const [newCounty, setNewCounty] = useState<string>(pilotCounty);
  const [newPrice, setNewPrice] = useState<number>(85);

  const handleCalculateAndDispatch = async (lot: ReadyHarvestLot) => {
    setCalculating(true);
    try {
      const res = await fetch('/api/smart-dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originCounty: lot.county,
          destinationMarket: 'Nairobi Wakulima Wholesale & Export Cargo Depot',
          produceTonnage: lot.quantityTons,
          produceType: lot.crop,
          harvestHoursAgo: 4,
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setDispatchResult({
          ...data.data,
          lotId: lot.id,
          vehicleId: selectedVehicle.id,
          driverName: selectedVehicle.driverName,
        });
      } else {
        // Fallback dispatch parameters
        setDispatchResult({
          lotId: lot.id,
          recommendedTransportType: 'REFRIGERATED_4C',
          estimatedDistanceKm: 215,
          estimatedTransitTimeHours: 3.8,
          spoilageRiskWithoutRefrigerationPercent: 36,
          projectedLossWithColdChainPercent: 2.1,
          netFarmerLossPreventedKES: lot.quantityTons * 1000 * lot.pricePerKgKES * 0.339,
          recommendedDepartureTime: 'Immediate Departure (Within 30 mins)',
          recommendedRoute: 'A2 Meru-Embu-Thika Superhighway corridor',
          transitWaybillCode: `WB-AGRO-${Math.floor(100000 + Math.random() * 900000)}`,
          co2FootprintKg: 48.2,
          vehicleId: selectedVehicle.id,
          driverName: selectedVehicle.driverName,
        });
      }

      // Update lot status to DISPATCHED
      setHarvestLots((prev) =>
        prev.map((item) =>
          item.id === lot.id
            ? {
                ...item,
                status: 'DISPATCHED',
                matchedHauler: `${selectedVehicle.carrierCompany} (${selectedVehicle.driverName})`,
                targetBuyer: 'Nairobi Export Terminal / Fresh Procurement',
              }
            : item
        )
      );
    } catch {
      setDispatchResult({
        lotId: lot.id,
        recommendedTransportType: 'REFRIGERATED_4C',
        estimatedDistanceKm: 210,
        estimatedTransitTimeHours: 3.5,
        spoilageRiskWithoutRefrigerationPercent: 35,
        projectedLossWithColdChainPercent: 2.0,
        netFarmerLossPreventedKES: lot.quantityTons * 1000 * lot.pricePerKgKES * 0.33,
        recommendedDepartureTime: 'Immediate Departure (Within 30 mins)',
        recommendedRoute: 'A2 Meru-Thika Highway Route',
        transitWaybillCode: `WB-AGRO-${Math.floor(100000 + Math.random() * 900000)}`,
        co2FootprintKg: 46.5,
        vehicleId: selectedVehicle.id,
        driverName: selectedVehicle.driverName,
      });

      setHarvestLots((prev) =>
        prev.map((item) =>
          item.id === lot.id
            ? {
                ...item,
                status: 'DISPATCHED',
                matchedHauler: `${selectedVehicle.carrierCompany}`,
              }
            : item
        )
      );
    } finally {
      setCalculating(false);
    }
  };

  const handleAddNewLot = (e: React.FormEvent) => {
    e.preventDefault();
    const createdLot: ReadyHarvestLot = {
      id: `LOT-${newCounty.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      farmerName: newFarmer,
      farmLocation: `${newCounty} Farm Gate`,
      county: newCounty,
      crop: newCrop,
      grade: 'Export Premium',
      quantityTons: newTons,
      harvestTimestamp: 'Harvested just now',
      spoilageDeadlineHours: 24,
      status: 'AWAITING_MATCH',
      pricePerKgKES: newPrice,
    };
    setHarvestLots([createdLot, ...harvestLots]);
    setSelectedLot(createdLot);
    setShowAddLotModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Title & Stats */}
      <div className="border-b border-[#E7E0D3] pb-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-extrabold text-[#1C3D2D] tracking-tight">
            Smart Distribution Matching & Fleet Dispatch
          </h2>
          <p className="text-xs text-stone-600 mt-0.5">
            Synchronizing freshly harvested produce with certified solar-chilled haulers and commercial off-takers
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddLotModal(true)}
            className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#1C3D2D] hover:bg-[#142D21] rounded-md transition-colors shadow-xs"
          >
            + Register Ready Harvest
          </button>
        </div>
      </div>

      {/* Add Lot Modal */}
      {showAddLotModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-[#E7E0D3] max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b border-stone-100 pb-2">
              <h3 className="text-sm font-bold text-stone-900">
                Register New Harvest for Instant Matching
              </h3>
              <button
                onClick={() => setShowAddLotModal(false)}
                className="text-stone-400 hover:text-stone-600 text-lg leading-none"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddNewLot} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  Farmer / Cooperative Name
                </label>
                <input
                  type="text"
                  required
                  value={newFarmer}
                  onChange={(e) => setNewFarmer(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#D5CEBE] rounded p-2 text-stone-800"
                />
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  Harvested Commodity
                </label>
                <input
                  type="text"
                  required
                  value={newCrop}
                  onChange={(e) => setNewCrop(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#D5CEBE] rounded p-2 text-stone-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    Quantity (Metric Tonnes)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newTons}
                    onChange={(e) => setNewTons(parseFloat(e.target.value) || 1)}
                    className="w-full bg-[#FAF7F2] border border-[#D5CEBE] rounded p-2 text-stone-800 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    Price Floor (KES / kg)
                  </label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(parseInt(e.target.value, 10) || 50)}
                    className="w-full bg-[#FAF7F2] border border-[#D5CEBE] rounded p-2 text-stone-800 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  County Origin
                </label>
                <select
                  value={newCounty}
                  onChange={(e) => setNewCounty(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#D5CEBE] rounded p-2 text-stone-800"
                >
                  {KENYA_COUNTIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddLotModal(false)}
                  className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#1C3D2D] text-white font-semibold rounded hover:bg-[#142D21]"
                >
                  Submit to Board
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Grid: Active Lots Table (Left) + Dispatcher Calculator (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Harvest Lots Board (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#E7E0D3] p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-2">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Active Ready-Harvest Board & Spoilage Timers
            </h3>
            <span className="text-xs text-stone-500">
              {harvestLots.length} Active Lots Monitored
            </span>
          </div>

          <div className="space-y-3">
            {harvestLots.map((lot) => {
              const isSelected = selectedLot.id === lot.id;
              const isDispatched = lot.status === 'DISPATCHED';

              return (
                <div
                  key={lot.id}
                  onClick={() => setSelectedLot(lot)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#FAF7F2] border-[#1C3D2D] shadow-2xs'
                      : 'bg-white hover:bg-[#FAF7F2] border-[#E7E0D3]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono text-stone-500">{lot.id}</span>
                    <span
                      className={`font-semibold ${
                        isDispatched
                          ? 'text-[#15803D]'
                          : 'text-[#C2593F]'
                      }`}
                    >
                      {lot.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-sm font-bold text-stone-900">
                        {lot.crop} ({lot.quantityTons} Metric Tonnes)
                      </div>
                      <div className="text-xs text-stone-600 mt-0.5">
                        {lot.farmerName} · {lot.farmLocation}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-stone-900 tabular-nums">
                        KES {lot.pricePerKgKES} / kg
                      </div>
                      <div className="text-[10px] text-stone-500">
                        Total: KES {(lot.quantityTons * 1000 * lot.pricePerKgKES).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Spoilage Countdown & Meta */}
                  <div className="mt-3 flex items-center justify-between text-[11px] text-stone-500 border-t border-stone-100 pt-2">
                    <span className="flex items-center gap-1">
                      <span className="font-medium text-stone-700">Spoilage Window:</span>
                      <span className="font-mono font-bold text-red-700">
                        ~{lot.spoilageDeadlineHours}h remaining
                      </span>
                    </span>

                    <span>{lot.harvestTimestamp}</span>
                  </div>

                  {lot.matchedHauler && (
                    <div className="mt-2 text-[11px] text-[#1C3D2D] bg-[#F4EFE6] px-2 py-1 rounded">
                      Matched Carrier: {lot.matchedHauler}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Fleet Matching & Transit Optimizer (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#E7E0D3] p-5 shadow-2xs space-y-4">
          <div className="border-b border-stone-100 pb-2">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Fleet Matching & Route Optimization
            </h3>
            <p className="text-[11px] text-stone-500">
              Selected Lot: {selectedLot.crop} ({selectedLot.id})
            </p>
          </div>

          {/* Vehicle Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-700 block">
              Available Solar & Refrigerated Haulers:
            </label>
            <div className="space-y-2">
              {LOGISTICS_VEHICLE_FLEET.map((veh) => {
                const isChosen = selectedVehicle.id === veh.id;
                return (
                  <div
                    key={veh.id}
                    onClick={() => setSelectedVehicle(veh)}
                    className={`p-3 rounded-lg border cursor-pointer text-xs transition-colors ${
                      isChosen
                        ? 'bg-[#F4EFE6] border-[#1C3D2D] font-medium'
                        : 'bg-white hover:bg-stone-50 border-stone-200'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="font-bold text-stone-900">{veh.carrierCompany}</span>
                      <span className="font-mono text-stone-500">{veh.id}</span>
                    </div>
                    <div className="text-stone-600">{veh.vehicleType}</div>
                    <div className="mt-1 flex justify-between text-[11px] text-stone-500">
                      <span>{veh.coolingCapacity}</span>
                      <span className="font-mono">{veh.availableFrom}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-1">
            <button
              onClick={() => handleCalculateAndDispatch(selectedLot)}
              disabled={calculating}
              className="w-full py-2.5 px-4 bg-[#1C3D2D] hover:bg-[#142D21] text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors disabled:opacity-60 shadow-xs"
            >
              {calculating
                ? 'Calculating Cold Route & Transit Loss...'
                : 'Dispatch Cold Haul & Generate Waybill'}
            </button>
          </div>

          {/* Dispatch Result Card */}
          {dispatchResult && (
            <div className="mt-4 p-4 rounded-xl bg-[#FAF7F2] border border-[#E7E0D3] space-y-3 text-xs">
              <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                <span className="font-bold text-[#1C3D2D]">
                  OFFICIAL DIGITAL WAYBILL
                </span>
                <span className="font-mono font-bold text-stone-700">
                  {dispatchResult.transitWaybillCode}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[11px] text-stone-500 block">Transit Duration</span>
                  <span className="font-mono font-bold text-stone-900">
                    {dispatchResult.estimatedTransitTimeHours} Hours ({dispatchResult.estimatedDistanceKm} km)
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-stone-500 block">Food Loss Prevented</span>
                  <span className="font-mono font-bold text-[#15803D]">
                    KES {Math.round(dispatchResult.netFarmerLossPreventedKES || 0).toLocaleString()}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[11px] text-stone-500 block">Optimized Transit Route</span>
                <span className="text-stone-700">{dispatchResult.recommendedRoute}</span>
              </div>

              <div className="p-2 bg-white rounded border border-stone-200 text-[11px] text-stone-600 flex justify-between items-center">
                <span>Assigned Carrier: {dispatchResult.driverName}</span>
                <span className="font-mono text-emerald-700 font-semibold">Active Dispatch</span>
              </div>

              {/* Rate Hauler Punctuality & Loss Prevention */}
              <div className="border-t border-stone-200 pt-2 flex items-center justify-between text-[11px]">
                <span className="text-stone-500">Produce arrived at buyer?</span>
                <button
                  type="button"
                  onClick={() =>
                    onOpenFeedbackModal &&
                    onOpenFeedbackModal(
                      'smart_dispatch',
                      `${selectedLot.crop} via ${dispatchResult.driverName}`,
                      `Transit ${dispatchResult.estimatedTransitTimeHours}h · Loss < 2%`
                    )
                  }
                  className="px-2.5 py-1 bg-white hover:bg-stone-100 border border-stone-300 rounded font-bold text-stone-800 transition-colors shadow-2xs"
                >
                  ★ Rate Hauler & Spoilage Quality
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
