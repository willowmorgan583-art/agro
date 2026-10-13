import React, { useState } from 'react';
import {
  INITIAL_WAREHOUSE_DEPOSITS,
  INITIAL_ESCROW_TRANSACTIONS,
} from '../data/mockData';
import { WarehouseDeposit, EscrowTransaction } from '../types';

export const AgriFinanceView: React.FC = () => {
  const [warehouseDeposits, setWarehouseDeposits] = useState<WarehouseDeposit[]>(
    INITIAL_WAREHOUSE_DEPOSITS
  );
  const [escrowList, setEscrowList] = useState<EscrowTransaction[]>(
    INITIAL_ESCROW_TRANSACTIONS
  );
  const [payoutLoading, setPayoutLoading] = useState<boolean>(false);
  const [lastPayoutNotice, setLastPayoutNotice] = useState<string>('');

  // Handle pledging warehouse receipt
  const handlePledgeReceipt = (receiptNo: string) => {
    setWarehouseDeposits((prev) =>
      prev.map((item) =>
        item.receiptNumber === receiptNo
          ? { ...item, status: 'PLEDGED_AS_COLLATERAL' }
          : item
      )
    );
  };

  // Simulate Instant Mobile Escrow Release
  const handleReleaseEscrow = (txId: string) => {
    setPayoutLoading(true);
    setTimeout(() => {
      setEscrowList((prev) =>
        prev.map((tx) =>
          tx.id === txId
            ? { ...tx, escrowStatus: 'COMPLETED' }
            : tx
        )
      );
      setLastPayoutNotice(
        `Instant M-Pesa B2B payout verified. Funds settled into farmer cooperative bank account.`
      );
      setPayoutLoading(false);
    }, 700);
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="border-b border-[#E7E0D3] pb-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-extrabold text-[#1C3D2D] tracking-tight">
            Post-Harvest Optimization & AgriFinance
          </h2>
          <p className="text-xs text-stone-600 mt-0.5">
            Warehouse Receipt System (WRS), digital input credit scoring, and mobile escrow settlements
          </p>
        </div>
        <div className="text-xs text-stone-500">
          Compliant with Kenya Warehouse Receipt System Council (WRSC) Standards
        </div>
      </div>

      {/* Credit Readiness & Liquidity Banner */}
      <div className="bg-white rounded-xl border border-[#E7E0D3] p-6 shadow-2xs grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-1">
          <div className="text-xs text-stone-500">Farmer Credit Readiness Index</div>
          <div className="text-3xl font-extrabold text-[#1C3D2D] font-mono tabular-nums">
            86 / 100
          </div>
          <div className="text-xs text-stone-600">
            Tier-A Certified · Pre-approved for subsidized seasonal inputs
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-xs text-stone-500">Warehouse Collateral Pledged</div>
          <div className="text-3xl font-extrabold text-[#C2593F] font-mono tabular-nums">
            KES 1,706,000
          </div>
          <div className="text-xs text-stone-600">
            Backed by 36.9 Metric Tonnes in accredited NCPB & cold hubs
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-xs text-stone-500">Settled Digital Escrow Volume</div>
          <div className="text-3xl font-extrabold text-stone-900 font-mono tabular-nums">
            KES 12,480,000
          </div>
          <div className="text-xs text-stone-600">
            Average settlement latency: &lt; 4 hours post inspection
          </div>
        </div>
      </div>

      {/* Warehouse Receipt System (WRS) Section */}
      <section className="bg-white rounded-xl border border-[#E7E0D3] p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Accredited Warehouse Receipts (WRS) Ledger
            </h3>
            <p className="text-xs text-stone-500">
              Grain silos and cold storage receipts convertible into collateralized working capital
            </p>
          </div>
          <span className="text-xs text-stone-500">
            {warehouseDeposits.length} Registered Deposits
          </span>
        </div>

        <div className="space-y-3">
          {warehouseDeposits.map((w) => (
            <div
              key={w.receiptNumber}
              className="p-4 rounded-xl border border-[#E7E0D3] bg-[#FAF7F2] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-stone-900">
                    {w.receiptNumber}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-stone-600">{w.storageDate}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium text-[#1C3D2D]">
                    {w.qualityGrade}
                  </span>
                </div>
                <div className="text-sm font-bold text-stone-900">
                  {w.commodity} ({w.tonnage} MT)
                </div>
                <div className="text-stone-500">
                  {w.facilityName} · {w.location}
                </div>
              </div>

              <div className="flex items-center gap-4 justify-between md:justify-end">
                <div className="text-right">
                  <div className="text-[11px] text-stone-500">Credit Eligible Value</div>
                  <div className="text-sm font-mono font-bold text-[#1C3D2D] tabular-nums">
                    KES {w.creditEligibleKES.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-stone-500">
                    Status: {w.status.replace(/_/g, ' ')}
                  </div>
                </div>

                <div>
                  {w.status === 'SECURED_IN_SILO' ? (
                    <button
                      onClick={() => handlePledgeReceipt(w.receiptNumber)}
                      className="px-3 py-1.5 bg-[#1C3D2D] hover:bg-[#142D21] text-white font-semibold rounded text-xs transition-colors whitespace-nowrap shadow-xs"
                    >
                      Pledge for Microcredit
                    </button>
                  ) : (
                    <span className="px-2.5 py-1 text-[11px] font-semibold text-stone-600 bg-stone-200 rounded whitespace-nowrap">
                      Pledged Collateral
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Digital Escrow & Trade Settlements */}
      <section className="bg-white rounded-xl border border-[#E7E0D3] p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Automated Digital Escrow & M-Pesa Settlement
            </h3>
            <p className="text-xs text-stone-500">
              Buyer funds locked at order confirmation, automatically disbursed to farmers upon certified arrival
            </p>
          </div>
          {lastPayoutNotice && (
            <span className="text-xs text-emerald-800 font-medium">
              {lastPayoutNotice}
            </span>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E7E0D3] text-stone-500 font-medium">
                <th className="py-2.5 px-3">Escrow ID</th>
                <th className="py-2.5 px-3">Commercial Buyer</th>
                <th className="py-2.5 px-3">Cooperative Beneficiary</th>
                <th className="py-2.5 px-3">Commodity Volume</th>
                <th className="py-2.5 px-3">Total (KES)</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Settlement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {escrowList.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#FAF7F2] transition-colors">
                  <td className="py-3 px-3 font-mono text-stone-500">
                    {tx.referenceNumber}
                  </td>
                  <td className="py-3 px-3 font-semibold text-stone-900">
                    {tx.buyerName}
                  </td>
                  <td className="py-3 px-3 text-stone-600">
                    {tx.farmerOrCoopName}
                  </td>
                  <td className="py-3 px-3 text-stone-600">{tx.commodity}</td>
                  <td className="py-3 px-3 font-mono font-bold text-stone-900 tabular-nums">
                    KES {tx.amountKES.toLocaleString()}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`font-semibold ${
                        tx.escrowStatus === 'COMPLETED'
                          ? 'text-[#15803D]'
                          : tx.escrowStatus === 'RELEASED_UPON_INSPECTION'
                          ? 'text-[#B45309]'
                          : 'text-[#C2593F]'
                      }`}
                    >
                      {tx.escrowStatus.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    {tx.escrowStatus !== 'COMPLETED' ? (
                      <button
                        onClick={() => handleReleaseEscrow(tx.id)}
                        disabled={payoutLoading}
                        className="px-2.5 py-1 bg-[#1C3D2D] hover:bg-[#142D21] text-white rounded font-medium text-[11px] transition-colors whitespace-nowrap"
                      >
                        Release Payout
                      </button>
                    ) : (
                      <span className="text-emerald-700 font-semibold text-[11px]">
                        Settled
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
