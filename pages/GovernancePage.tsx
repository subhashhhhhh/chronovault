import React, { useEffect, useState } from 'react';
import { MockChainService } from '../services/mockChain';
import { GovernanceProposal } from '../types';
import { CheckCircle, X, Clock } from '../components/ui/Icons';

export const GovernancePage = () => {
    const [proposals, setProposals] = useState<GovernanceProposal[]>([]);

    useEffect(() => {
        MockChainService.getGovernanceProposals().then(setProposals);
    }, []);

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-white uppercase tracking-tighter mb-1">Governance</h2>
                <p className="text-gray-400 font-mono text-sm">Vote on Protocol Parameters</p>
            </div>

            <div className="grid gap-6">
                {proposals.map(proposal => (
                    <div key={proposal.id} className="bg-defi-800 border border-defi-700 p-6 rounded-sm relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className={`px-2 py-0.5 text-xs font-bold uppercase tracking-wider border ${proposal.status === 'ACTIVE' ? 'border-green-500 text-green-500' :
                                            proposal.status === 'PASSED' ? 'border-blue-500 text-blue-500' :
                                                'border-red-500 text-red-500'
                                        }`}>
                                        {proposal.status}
                                    </span>
                                    <span className="text-gray-500 text-xs font-mono">ID: #{proposal.id}</span>
                                </div>
                                <h3 className="text-xl font-bold text-white">{proposal.title}</h3>
                            </div>
                            <div className="text-right text-gray-400 text-xs font-mono">
                                Ends in {Math.ceil((proposal.endDate - Date.now()) / (1000 * 60 * 60 * 24))} days
                            </div>
                        </div>

                        <p className="text-gray-400 mb-6 max-w-2xl">{proposal.description}</p>

                        <div className="space-y-3">
                            {/* Progress Bars */}
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-green-500 font-bold">FOR</span>
                                    <span className="text-white">{proposal.votesFor.toLocaleString()}</span>
                                </div>
                                <div className="h-2 bg-black rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-green-600"
                                        style={{ width: `${(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-red-500 font-bold">AGAINST</span>
                                    <span className="text-white">{proposal.votesAgainst.toLocaleString()}</span>
                                </div>
                                <div className="h-2 bg-black rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-red-600"
                                        style={{ width: `${(proposal.votesAgainst / (proposal.votesFor + proposal.votesAgainst)) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-4">
                            <button className="flex-1 py-3 border border-green-900 text-green-500 hover:bg-green-900/20 uppercase font-bold text-sm transition-colors">
                                Vote For
                            </button>
                            <button className="flex-1 py-3 border border-red-900 text-red-500 hover:bg-red-900/20 uppercase font-bold text-sm transition-colors">
                                Vote Against
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
