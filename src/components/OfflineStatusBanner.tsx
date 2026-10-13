import React, { useState } from 'react';
import { useOfflineSync } from '../context/OfflineSyncContext';
import { CACHED_OFFLINE_RECOMMENDATIONS, ACTIVE_DISEASE_ALERTS } from '../data/mockData';

export const OfflineStatusBanner: React.FC = () => {
  const {
    isOnline,
    isSimulatedOffline,
    toggleSimulateOffline,
    pendingCount,
    syncAllPending,
    isSyncing,
    syncNotification,
    dismissNotification,
  } = useOfflineSync();

  const [showOfflineDrawer, setShowOfflineDrawer] = useState<boolean>(false);

  return (
    <>
      {/* Toast Notification when sync actions happen */}
      {syncNotification && (
        <div className="bg-[#1C3D2D] text-white py-2 px-4 text-xs shadow-md border-b border-[#2D5A43] flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <div className="max-w-7xl mx-auto flex items-center gap-2 w-full justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E69D45]" />
              <span>{syncNotification}</span>
            </div>
            <button
              onClick={dismissNotification}
              className="text-stone-300 hover:text-white font-bold ml-4"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Connectivity Ribbon (shows if offline or simulated offline) */}
      {!isOnline && (
        <div className="bg-amber-600/90 backdrop-blur-xs text-white py-1.5 px-4 text-xs border-b border-amber-700/60 shadow-xs">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="font-bold uppercase tracking-wider text-[11px] bg-white/20 px-2 py-0.5 rounded">
                OFFLINE RURAL MODE ACTIVE
              </span>
              <span>
                Working without internet. You can still input harvests, view cached disease alerts, and submit ratings.
              </span>
            </div>

            <div className="flex items-center gap-3">
              {pendingCount > 0 && (
                <span className="font-mono font-bold bg-white/20 px-2 py-0.5 rounded text-[11px]">
                  {pendingCount} Queued to Sync
                </span>
              )}

              <button
                onClick={() => setShowOfflineDrawer(true)}
                className="underline hover:text-stone-100 font-semibold text-[11px]"
              >
                View Stored Offline Advisories
              </button>

              <button
                onClick={toggleSimulateOffline}
                className="px-2.5 py-0.5 bg-white text-stone-900 rounded font-semibold text-[11px] hover:bg-stone-100"
              >
                Restore Online Connection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Offline Stored Advisories Drawer / Modal */}
      {showOfflineDrawer && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#E7E0D3] max-w-xl w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200 text-stone-900">
            <div className="flex justify-between items-center border-b border-stone-100 pb-3">
              <div>
                <div className="text-[11px] uppercase tracking-wider font-bold text-[#1C3D2D]">
                  OFFLINE FIELD CACHE
                </div>
                <h3 className="text-base font-bold text-stone-900 mt-0.5">
                  Stored Critical Advisories & Emergency Protocols
                </h3>
              </div>
              <button
                onClick={() => setShowOfflineDrawer(false)}
                className="text-stone-400 hover:text-stone-700 text-xl font-bold p-1 leading-none"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto text-xs">
              <div className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
                Cached Emergency Farm Recommendations
              </div>
              {CACHED_OFFLINE_RECOMMENDATIONS.map((rec) => (
                <div
                  key={rec.id}
                  className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E7E0D3] space-y-1"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-stone-900">{rec.title}</span>
                    <span className="text-[10px] text-stone-500 font-mono">
                      {rec.category}
                    </span>
                  </div>
                  <p className="text-stone-600 leading-relaxed">{rec.summary}</p>
                </div>
              ))}

              <div className="font-bold text-stone-900 uppercase tracking-wider text-[11px] pt-2">
                Stored Pathogen Alerts Available Offline
              </div>
              {ACTIVE_DISEASE_ALERTS.map((alert) => (
                <div
                  key={alert.id}
                  className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E7E0D3] space-y-1"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-stone-900">
                      {alert.pathogenName}
                    </span>
                    <span className="text-red-700 font-semibold text-[10px]">
                      {alert.severity} SEVERITY
                    </span>
                  </div>
                  <div className="text-stone-700">
                    <strong>Organic Remedy:</strong> {alert.organicRemedy}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end border-t border-stone-100">
              <button
                onClick={() => setShowOfflineDrawer(false)}
                className="px-4 py-2 bg-[#1C3D2D] hover:bg-[#142D21] text-white text-xs font-bold uppercase rounded-lg"
              >
                Close Stored Cache
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
