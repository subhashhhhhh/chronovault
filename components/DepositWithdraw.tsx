import React, { useState } from 'react';
import { useVault } from '../context/VaultContext';
import { VaultStats, UserAccount, Deposit, TransactionState, TransactionStatus } from '../types';
import { ArrowRight, ArrowLeft, AlertTriangle, Lock, Unlock, CheckCircle, AlertCircle, Clock, History } from './ui/Icons';
import { Modal } from './ui/Modal';

interface Props {
  stats: VaultStats;
  user: UserAccount;
  onUpdate: () => void;
}

export const DepositWithdraw: React.FC<Props> = ({ stats, user, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState<string>('');
  const [txState, setTxState] = useState<TransactionState>({ status: TransactionStatus.IDLE });

  // Withdrawal Modal State
  const [depositToWithdraw, setDepositToWithdraw] = useState<Deposit | null>(null);
  const [acknowledgePenalty, setAcknowledgePenalty] = useState(false);

  // History Pagination
  const [historyPage, setHistoryPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // Deposit Logic
  const { approve, deposit, withdraw } = useVault();

  const handleApprove = async () => {
    try {
      setTxState({ status: TransactionStatus.PENDING, message: 'APPROVING TOKEN...' });
      await approve(Number(amount));
      setTxState({ status: TransactionStatus.SUCCESS, message: 'APPROVAL SUCCESSFUL' });
      onUpdate();
      setTimeout(() => setTxState({ status: TransactionStatus.IDLE }), 2000);
    } catch (e) {
      setTxState({ status: TransactionStatus.ERROR, message: 'APPROVAL FAILED' });
    }
  };

  const handleDeposit = async () => {
    try {
      setTxState({ status: TransactionStatus.PENDING, message: 'DEPOSITING FUNDS...' });
      await deposit(Number(amount));
      setTxState({ status: TransactionStatus.SUCCESS, message: 'DEPOSIT SUCCESSFUL' });
      setAmount('');
      onUpdate();
      setTimeout(() => setTxState({ status: TransactionStatus.IDLE }), 3000);
    } catch (e: any) {
      setTxState({ status: TransactionStatus.ERROR, message: e.message || 'DEPOSIT FAILED' });
    }
  };

  // Initiate Withdraw (Opens Modal)
  const initiateWithdraw = (deposit: Deposit) => {
    setDepositToWithdraw(deposit);
    setAcknowledgePenalty(false);
  };

  // Execute Withdraw (Called from Modal)
  const handleWithdrawConfirm = async () => {
    if (!depositToWithdraw) return;

    try {
      setTxState({ status: TransactionStatus.PENDING, message: 'WITHDRAWING...' });
      // Close modal immediately so we can show status in the main panel
      const depositId = Number(depositToWithdraw.id);
      setDepositToWithdraw(null);

      await withdraw(depositId);
      setTxState({ status: TransactionStatus.SUCCESS, message: 'WITHDRAWAL SUCCESSFUL' });
      onUpdate();
      setTimeout(() => setTxState({ status: TransactionStatus.IDLE }), 3000);
    } catch (e) {
      setTxState({ status: TransactionStatus.ERROR, message: 'WITHDRAWAL FAILED' });
    }
  };

  // UI Helpers
  const needsApproval = Number(amount) > user.allowance;
  const canDeposit = Number(amount) > 0 && Number(amount) <= user.balance;

  // Calculate Unlock Date for Deposit Input
  const getUnlockDate = () => {
    const now = Date.now();
    const unlockTime = now + (stats.lockPeriodDays * 24 * 60 * 60 * 1000);
    return new Date(unlockTime).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Helpers for Modal display
  const getWithdrawalDetails = (deposit: Deposit | null) => {
    if (!deposit) return null;
    const now = Date.now();
    const isEarly = now < deposit.unlockDate;
    const penalty = isEarly ? deposit.amount * stats.penaltyRate : 0;
    const netReturn = deposit.amount + deposit.accruedInterest - penalty;

    return { isEarly, penalty, netReturn };
  };

  const withdrawalDetails = getWithdrawalDetails(depositToWithdraw);

  // History Pagination Calculations
  const totalHistoryPages = Math.ceil(user.history.length / ITEMS_PER_PAGE);
  const currentHistory = user.history.slice(
    (historyPage - 1) * ITEMS_PER_PAGE,
    historyPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <div className="bg-black border border-defi-700">
        {/* Tabs */}
        <div className="flex border-b border-defi-700">
          <button
            onClick={() => setActiveTab('deposit')}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'deposit'
              ? 'text-white bg-defi-800 border-r border-defi-700'
              : 'text-gray-500 hover:text-white hover:bg-defi-900 border-r border-defi-800'
              }`}
          >
            Deposit
          </button>
          <button
            onClick={() => setActiveTab('withdraw')}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'withdraw'
              ? 'text-white bg-defi-800 border-l border-defi-700'
              : 'text-gray-500 hover:text-white hover:bg-defi-900'
              }`}
          >
            Withdraw
          </button>
        </div>

        <div className="p-8 bg-defi-800 min-h-[400px]">
          {/* Transaction Status Overlay/Banner */}
          {txState.status !== TransactionStatus.IDLE && (
            <div className={`mb-6 p-4 border flex items-center gap-3 ${txState.status === TransactionStatus.PENDING ? 'bg-black border-white text-white' :
              txState.status === TransactionStatus.SUCCESS ? 'bg-success text-white border-success' :
                'bg-danger text-white border-danger'
              }`}>
              {txState.status === TransactionStatus.PENDING && <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />}
              {txState.status === TransactionStatus.SUCCESS && <CheckCircle className="h-5 w-5" />}
              {txState.status === TransactionStatus.ERROR && <AlertCircle className="h-5 w-5" />}
              <span className="font-bold uppercase tracking-wide">{txState.message}</span>
            </div>
          )}

          {/* Deposit Tab Content */}
          {activeTab === 'deposit' && (
            <div className="space-y-8">
              <div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                  <span className="text-gray-400">Amount to Deposit</span>
                  <span className="text-gray-400">Balance: <span className="text-white font-mono">{user.balance.toLocaleString()}</span></span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-black border border-defi-700 p-4 text-lg text-white placeholder-defi-600 focus:outline-none focus:border-defi-accent focus:ring-1 focus:ring-defi-accent font-mono transition-all"
                    disabled={txState.status === TransactionStatus.PENDING}
                  />
                  <button
                    onClick={() => setAmount(user.balance.toString())}
                    className="absolute right-3 top-3 bg-defi-700 hover:bg-white hover:text-black text-xs font-bold text-white px-3 py-2 uppercase transition-colors"
                  >
                    Max
                  </button>
                </div>
              </div>

              <div className="border border-defi-700 bg-black p-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 uppercase tracking-wide text-xs font-bold mt-1">Lock Period</span>
                  <span className="text-white font-mono text-lg">{stats.lockPeriodDays} DAYS</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 uppercase tracking-wide text-xs font-bold mt-1">APR</span>
                  <span className="text-defi-accent font-mono text-lg">{stats.apr}%</span>
                </div>

                {amount && !isNaN(Number(amount)) && Number(amount) > 0 && (
                  <div className="mt-4 pt-4 border-t border-defi-700/50">
                    <div className="flex justify-between text-sm items-center mb-1">
                      <span className="text-gray-400 flex items-center gap-2 uppercase text-xs font-bold">
                        <Clock className="h-4 w-4" />
                        Unlock Date
                      </span>
                      <span className="text-white font-mono">
                        {getUnlockDate()}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {needsApproval ? (
                <button
                  onClick={handleApprove}
                  disabled={!canDeposit || txState.status === TransactionStatus.PENDING}
                  className="w-full bg-transparent border-2 border-defi-accent text-defi-accent hover:bg-defi-accent hover:text-white disabled:opacity-50 disabled:cursor-not-allowed font-bold py-4 px-4 uppercase tracking-widest transition-all flex items-center justify-center gap-2 text-sm"
                >
                  Approve Token
                </button>
              ) : (
                <button
                  onClick={handleDeposit}
                  disabled={!canDeposit || txState.status === TransactionStatus.PENDING}
                  className="w-full bg-defi-accent hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-4 uppercase tracking-widest transition-all flex items-center justify-center gap-2 text-sm"
                >
                  Deposit Funds <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          )}

          {/* Withdraw Tab Content */}
          {activeTab === 'withdraw' && (
            <div className="space-y-8">
              {/* Active Positions */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Active Positions</h3>

                {user.deposits.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-defi-700 bg-black">
                    <Lock className="h-8 w-8 mx-auto mb-3 text-defi-700" />
                    <p className="text-gray-500 uppercase text-sm font-bold">No active deposits</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {user.deposits.map((deposit) => {
                      const now = Date.now();
                      const isLocked = now < deposit.unlockDate;
                      const daysLeft = Math.ceil((deposit.unlockDate - now) / (1000 * 60 * 60 * 24));

                      return (
                        <div
                          key={deposit.id}
                          className="bg-black border border-defi-700 p-4 hover:border-gray-500 transition-colors group"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <p className="text-xl font-bold text-white font-mono">${deposit.amount.toLocaleString()}</p>
                              <p className="text-xs text-gray-500 uppercase font-bold mt-1">ID: {deposit.id.substring(0, 8)}</p>
                            </div>
                            <div className={`px-2 py-1 text-xs font-bold uppercase border ${isLocked ? 'border-warning text-warning' : 'border-success text-success'
                              }`}>
                              {isLocked ? `${daysLeft} DAYS LOCK` : 'UNLOCKED'}
                            </div>
                          </div>

                          <div className="flex justify-between items-center bg-defi-800 p-2 mb-4 border border-defi-700">
                            <span className="text-xs text-gray-400 uppercase font-bold">Interest</span>
                            <span className="text-white font-mono">+${deposit.accruedInterest.toFixed(2)}</span>
                          </div>

                          <button
                            onClick={() => initiateWithdraw(deposit)}
                            disabled={txState.status === TransactionStatus.PENDING}
                            className={`w-full text-xs font-bold uppercase tracking-wider py-3 border transition-colors flex justify-center items-center gap-2 ${isLocked
                              ? 'border-warning text-warning hover:bg-warning hover:text-white'
                              : 'border-white text-white hover:bg-white hover:text-black'
                              }`}
                          >
                            {isLocked && <AlertTriangle className="h-3 w-3" />}
                            {isLocked ? 'Early Withdraw' : 'Withdraw Funds'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Transaction History Section */}
              <div className="border-t border-defi-700 pt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    <History className="h-4 w-4" />
                    Recent Transactions
                  </h3>
                  <div className="flex gap-2">
                    <button
                      disabled={historyPage === 1}
                      onClick={() => setHistoryPage(p => p - 1)}
                      className="p-1 border border-defi-700 hover:bg-white hover:text-black disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-current transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <span className="text-xs font-mono py-1 px-2 border border-defi-700 bg-black">
                      {historyPage}/{Math.max(1, totalHistoryPages)}
                    </span>
                    <button
                      disabled={historyPage >= totalHistoryPages}
                      onClick={() => setHistoryPage(p => p + 1)}
                      className="p-1 border border-defi-700 hover:bg-white hover:text-black disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-current transition-colors"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-black border border-defi-700">
                  <div className="grid grid-cols-4 gap-2 p-3 border-b border-defi-700 text-xs font-bold text-gray-500 uppercase">
                    <span>Type</span>
                    <span>Amount</span>
                    <span className="text-right">Date</span>
                    <span className="text-right">Hash</span>
                  </div>
                  {currentHistory.length > 0 ? (
                    currentHistory.map((tx) => (
                      <div key={tx.id} className="grid grid-cols-4 gap-2 p-3 border-b border-defi-700/50 last:border-0 hover:bg-defi-800 transition-colors text-xs font-mono">
                        <span className={tx.type === 'DEPOSIT' ? 'text-success' : 'text-danger'}>
                          {tx.type}
                        </span>
                        <span className="text-white">${tx.amount.toLocaleString()}</span>
                        <span className="text-right text-gray-400">{new Date(tx.timestamp).toLocaleDateString()}</span>
                        <span className="text-right text-gray-500">{tx.hash}</span>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-gray-500 uppercase font-mono">
                      No records found
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={!!depositToWithdraw}
        onClose={() => setDepositToWithdraw(null)}
        title={withdrawalDetails?.isEarly ? "EARLY WITHDRAWAL" : "CONFIRM WITHDRAWAL"}
      >
        {depositToWithdraw && withdrawalDetails && (
          <div className="space-y-6">
            {withdrawalDetails.isEarly && (
              <div className="bg-warning text-black p-4 flex gap-4">
                <AlertTriangle className="h-6 w-6 shrink-0" />
                <div className="text-sm">
                  <p className="font-bold uppercase tracking-wide mb-1">Penalty Warning</p>
                  <p className="font-medium leading-relaxed">
                    WITHDRAWING NOW INCURS A <span className="font-bold border-b border-black">{(stats.penaltyRate * 100).toFixed(0)}% PENALTY</span> ON PRINCIPAL.
                  </p>
                </div>
              </div>
            )}

            <div className="bg-black border border-defi-700 p-5 space-y-3 font-mono text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">PRINCIPAL</span>
                <span className="text-white">${depositToWithdraw.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">INTEREST</span>
                <span className="text-success">+${depositToWithdraw.accruedInterest.toFixed(2)}</span>
              </div>

              {withdrawalDetails.isEarly && (
                <div className="flex justify-between items-center border-t border-defi-700 pt-2 text-danger">
                  <span>PENALTY</span>
                  <span>-${withdrawalDetails.penalty.toFixed(2)}</span>
                </div>
              )}

              <div className="border-t-2 border-white pt-3 flex justify-between items-center text-lg">
                <span className="text-white font-bold">TOTAL</span>
                <span className="text-white font-bold">${withdrawalDetails.netReturn.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>

            {/* Acknowledgment Checkbox for Early Withdrawals */}
            {withdrawalDetails.isEarly && (
              <div className="pt-2">
                <label className="flex items-start gap-4 cursor-pointer group p-2 hover:bg-defi-700 transition-colors border border-transparent hover:border-defi-700">
                  <div className="relative flex items-center mt-1">
                    <input
                      type="checkbox"
                      className="peer h-5 w-5 cursor-pointer appearance-none border border-white bg-black checked:bg-defi-accent checked:border-defi-accent transition-all"
                      checked={acknowledgePenalty}
                      onChange={(e) => setAcknowledgePenalty(e.target.checked)}
                    />
                    <CheckCircle className="absolute left-0.5 top-0.5 h-4 w-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                  </div>
                  <span className="text-xs text-gray-400 font-bold uppercase leading-relaxed group-hover:text-white transition-colors select-none">
                    I ACKNOWLEDGE THE FORFEITURE OF <span className="text-danger">${withdrawalDetails.penalty.toFixed(2)}</span>.
                  </span>
                </label>
              </div>
            )}

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setDepositToWithdraw(null)}
                className="flex-1 bg-black border border-defi-700 hover:bg-white hover:text-black text-white py-3 font-bold uppercase tracking-wider text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleWithdrawConfirm}
                disabled={withdrawalDetails.isEarly && !acknowledgePenalty}
                className={`flex-1 py-3 font-bold uppercase tracking-wider text-sm transition-all flex items-center justify-center gap-2 ${withdrawalDetails.isEarly
                  ? (acknowledgePenalty ? 'bg-danger text-white hover:bg-red-600' : 'bg-defi-700 text-gray-500 cursor-not-allowed')
                  : 'bg-defi-accent hover:bg-white hover:text-black text-white'
                  }`}
              >
                {withdrawalDetails.isEarly ? 'Accept & Withdraw' : 'Confirm'}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};