import React, { useState } from 'react';
import { FeedbackModuleType, FarmerFeedbackRecord } from '../types';
import { useOfflineSync } from '../context/OfflineSyncContext';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  moduleType: FeedbackModuleType;
  targetItemTitle: string;
  defaultPredictedValue?: string;
  county: string;
  onSubmitted: (feedback: FarmerFeedbackRecord) => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  moduleType,
  targetItemTitle,
  defaultPredictedValue = 'KES 115 / kg',
  county,
  onSubmitted,
}) => {
  const { enqueueOfflineItem, isOnline } = useOfflineSync();

  const [farmerName, setFarmerName] = useState<string>('Wanjiku Mwangi');
  const [cooperative, setCooperative] = useState<string>('Meru Green Growers Co-op');
  const [rating, setRating] = useState<number>(5);
  const [predictedValue, setPredictedValue] = useState<string>(defaultPredictedValue);
  const [actualOutcomeValue, setActualOutcomeValue] = useState<string>('KES 112 / kg');
  const [accuracyPercentage, setAccuracyPercentage] = useState<number>(96);
  const [comments, setComments] = useState<string>(
    'The harvest timing window predicted by AI was accurate to within 2 days. The verified export buyer bought at KES 112/kg.'
  );

  if (!isOpen) return null;

  const moduleLabels: Record<FeedbackModuleType, string> = {
    demand_prediction: 'Demand Prediction & Price Accuracy',
    early_warning: 'Early Warning & Pathogen Radar Accuracy',
    smart_dispatch: 'Logistics Matching & Cold-Chain Punctuality',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const record: FarmerFeedbackRecord = {
      id: `FB-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
      moduleType,
      targetItemTitle,
      farmerName,
      cooperative,
      county,
      rating,
      predictedValue,
      actualOutcomeValue,
      accuracyPercentage,
      comments,
      timestamp: 'Just now',
      modelAdjustmentStatus: 'APPLIED_TO_WEIGHTS',
    };

    // Enqueue in offline sync system
    enqueueOfflineItem(
      'FARMER_FEEDBACK',
      `Feedback: ${moduleLabels[moduleType]} (${rating}★)`,
      record
    );

    onSubmitted(record);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-[#E7E0D3] max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200 text-stone-900">
        <div className="flex justify-between items-center border-b border-stone-100 pb-3">
          <div>
            <div className="text-[11px] uppercase tracking-wider font-bold text-[#1C3D2D]">
              FARMER AI ACCURACY FEEDBACK
            </div>
            <h3 className="text-base font-bold text-stone-900 mt-0.5">
              {moduleLabels[moduleType]}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 text-xl font-bold p-1 leading-none"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <span className="text-stone-500 block mb-0.5">Subject Item:</span>
            <span className="font-semibold text-stone-800 bg-[#FAF7F2] p-2 rounded block border border-[#E7E0D3]">
              {targetItemTitle} · {county}
            </span>
          </div>

          {/* 5-Star Rating Selector */}
          <div>
            <label className="block font-semibold text-stone-800 mb-1.5">
              Accuracy & Satisfaction Rating (1 to 5 Stars):
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`w-9 h-9 rounded-lg font-bold text-sm transition-all flex items-center justify-center ${
                    star <= rating
                      ? 'bg-[#E69D45] text-white shadow-xs scale-105'
                      : 'bg-stone-100 text-stone-400 hover:bg-stone-200'
                  }`}
                >
                  ★
                </button>
              ))}
              <span className="ml-2 font-mono font-bold text-stone-700">
                {rating} / 5 Stars
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-stone-700 mb-1">
                AI Predicted Value
              </label>
              <input
                type="text"
                required
                value={predictedValue}
                onChange={(e) => setPredictedValue(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#D5CEBE] rounded-lg p-2 font-mono text-stone-800"
              />
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Actual Realized Field Outcome
              </label>
              <input
                type="text"
                required
                value={actualOutcomeValue}
                onChange={(e) => setActualOutcomeValue(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#D5CEBE] rounded-lg p-2 font-mono text-stone-800 font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Farmer / Cooperative
              </label>
              <input
                type="text"
                required
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#D5CEBE] rounded-lg p-2 text-stone-800"
              />
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Calculated Accuracy %
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={accuracyPercentage}
                onChange={(e) => setAccuracyPercentage(parseInt(e.target.value, 10) || 90)}
                className="w-full bg-[#FAF7F2] border border-[#D5CEBE] rounded-lg p-2 font-mono text-stone-800 font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-stone-700 mb-1">
              Field Feedback & Model Refinement Notes
            </label>
            <textarea
              rows={3}
              required
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Explain how close the prediction was to your actual harvest or market reality..."
              className="w-full bg-[#FAF7F2] border border-[#D5CEBE] rounded-lg p-2 text-stone-800 text-xs"
            />
          </div>

          {!isOnline && (
            <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-amber-800 text-[11px] flex items-center gap-1.5">
              <span>⚡</span>
              <span>
                You are currently in offline mode. Your feedback will be saved locally on your device and synced automatically when network connectivity is restored.
              </span>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-stone-600 hover:bg-stone-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#1C3D2D] hover:bg-[#142D21] text-white font-bold uppercase tracking-wider rounded-lg transition-colors shadow-xs"
            >
              Submit Accuracy Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
