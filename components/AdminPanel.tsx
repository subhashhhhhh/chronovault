import React, { useState } from 'react';
import { VaultStats, TransactionState, TransactionStatus } from '../types';
import { MockChainService } from '../services/mockChain';
import { Settings, AlertTriangle, Activity, CheckCircle, AlertCircle } from './ui/Icons';

interface Props {
  stats: VaultStats;
  onUpdate: () => void;
}

export const AdminPanel: React.FC<Props> = ({ stats, onUpdate }) => {
  const [newApr, setNewApr] = useState<string>(stats.apr.toString());
  const [txState, setTxState] = useState<TransactionState>({ status: TransactionStatus.IDLE });

  const handleUpdateAPR = async () => {
    try {
      setTxState({ status: TransactionStatus.PENDING, message: 'UPDATING APR...' });
      await MockChainService.setAPR(Number(newApr));
      setTxState({ status: TransactionStatus.SUCCESS, message: 'APR UPDATED' });
      onUpdate();
      setTimeout(() => setTxState({ status: TransactionStatus.IDLE }), 2000);
    } catch (e) {
      setTxState({ status: TransactionStatus.ERROR, message: 'UPDATE FAILED' });
    }
  };

  const handleTogglePause = async () => {
    try {
      const action = stats.isPaused ? 'UNPAUSING' : 'PAUSING';
      setTxState({ status: TransactionStatus.PENDING, message: `${action} VAULT...` });
      await MockChainService.togglePause();
      setTxState({ status: TransactionStatus.SUCCESS, message: `VAULT ${stats.isPaused ? 'UNPAUSED' : 'PAUSED'}` });
      onUpdate();
      setTimeout(() => setTxState({ status: TransactionStatus.IDLE }), 2000);
    } catch (e) {
      setTxState({ status: TransactionStatus.ERROR, message: 'TOGGLE FAILED' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-defi-800 border border-defi-700 p-6 mb-6">
        <div className="flex items-center gap-4 mb-8 border-b border-defi-700 pb-4">
          <div className="p-2 bg-white text-black">
            <Settings className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white uppercase tracking-widest">Admin Controls</h2>
            <p className="text-xs text-gray-500 uppercase font-mono mt-1">SYSTEM CONFIGURATION MODE</p>
          </div>
        </div>

        {/* Status Messages */}
        {txState.status !== TransactionStatus.IDLE && (
          <div className={`mb-6 p-4 border flex items-center gap-3 ${
            txState.status === TransactionStatus.PENDING ? 'bg-black border-white text-white' :
            txState.status === TransactionStatus.SUCCESS ? 'bg-success border-success text-white' :
            'bg-danger border-danger text-white'
          }`}>
             {txState.status === TransactionStatus.PENDING && <Activity className="animate-spin h-5 w-5" />}
             {txState.status === TransactionStatus.SUCCESS && <CheckCircle className="h-5 w-5" />}
             {txState.status === TransactionStatus.ERROR && <AlertCircle className="h-5 w-5" />}
             <span className="font-bold uppercase text-sm">{txState.message}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* APR Control */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest bg-defi-700 p-2 inline-block">Yield Config</h3>
            <div className="bg-black p-6 border border-defi-700">
              <label className="block text-xs font-bold text-gray-400 uppercase mb-3">Base APY (%)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={newApr}
                  onChange={(e) => setNewApr(e.target.value)}
                  className="flex-1 bg-defi-900 border border-defi-600 px-4 py-3 text-white focus:outline-none focus:border-defi-accent font-mono"
                />
                <button
                  onClick={handleUpdateAPR}
                  disabled={txState.status === TransactionStatus.PENDING}
                  className="bg-defi-accent hover:bg-white hover:text-black border border-defi-accent hover:border-white px-6 py-2 text-white font-bold uppercase transition-colors"
                >
                  Set
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3 font-mono">
                CURRENT RATE: <span className="text-white">{stats.apr}%</span>
              </p>
            </div>
          </div>

          {/* Emergency Controls */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest bg-defi-700 p-2 inline-block">Emergency</h3>
            <div className="bg-black p-6 border border-danger">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-gray-400 uppercase">Vault Status</span>
                <span className={`px-2 py-1 text-xs font-bold uppercase border ${
                  stats.isPaused ? 'bg-danger text-white border-danger' : 'bg-success text-white border-success'
                }`}>
                  {stats.isPaused ? 'PAUSED' : 'ACTIVE'}
                </span>
              </div>
              
              <button
                onClick={handleTogglePause}
                disabled={txState.status === TransactionStatus.PENDING}
                className={`w-full py-3 font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors border ${
                  stats.isPaused
                    ? 'border-success text-success hover:bg-success hover:text-white'
                    : 'border-danger text-danger hover:bg-danger hover:text-white'
                }`}
              >
                <AlertTriangle className="h-4 w-4" />
                {stats.isPaused ? 'Unpause Deposits' : 'Pause Deposits'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};