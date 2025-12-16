import React from 'react';
import { WorkflowStep, StepStatus } from '../types';
import { X, Map } from 'lucide-react';

interface DetailModalProps {
  step: WorkflowStep | null;
  status: StepStatus;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ step, status, onClose }) => {
  if (!step) return null;

  // Simple "Markdown" renderer - splits by newline and handles headers loosely
  const renderContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('# ')) {
        return <h2 key={index} className="text-2xl font-display font-bold text-zoo-wood mt-6 mb-3 border-b-2 border-zoo-path pb-2">{trimmed.substring(2)}</h2>;
      }
      if (trimmed.startsWith('## ')) {
        return <h3 key={index} className="text-xl font-display font-bold text-zoo-wood mt-4 mb-2">{trimmed.substring(3)}</h3>;
      }
      if (trimmed.startsWith('- [ ]')) {
         return <li key={index} className="flex items-center gap-2 py-1 text-slate-700"><span className="w-4 h-4 rounded border border-slate-400 bg-white"></span> {trimmed.substring(5)}</li>;
      }
      if (trimmed.startsWith('- ')) {
        return <li key={index} className="list-disc ml-5 py-1 text-slate-700">{trimmed.substring(2)}</li>;
      }
      if (trimmed.startsWith('> ')) {
        return <blockquote key={index} className="border-l-4 border-zoo-grass pl-4 italic text-slate-600 my-4 bg-green-50 p-2 rounded-r">{trimmed.substring(2)}</blockquote>;
      }
      if (trimmed.length === 0) return <div key={index} className="h-2"></div>;
      
      return <p key={index} className="text-slate-700 leading-relaxed mb-2">{trimmed}</p>;
    });
  };

  const statusColor = {
    [StepStatus.COMPLETED]: 'bg-green-100 text-green-800 border-green-200',
    [StepStatus.IN_PROGRESS]: 'bg-blue-100 text-blue-800 border-blue-200',
    [StepStatus.PENDING]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    [StepStatus.BLOCKED]: 'bg-red-100 text-red-800 border-red-200',
    [StepStatus.LOCKED]: 'bg-slate-100 text-slate-800 border-slate-200',
  }[status];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col border-4 border-zoo-pathBorder">
        {/* Header */}
        <div className="bg-zoo-path p-6 flex items-center justify-between border-b-2 border-zoo-pathBorder">
          <div className="flex items-center gap-4">
            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-sm border border-zoo-pathBorder">
              {{
                elephant: '🐘', lion: '🦁', monkey: '🐒', giraffe: '🦒',
                hippo: '🦛', penguin: '🐧', owl: '🦉', panda: '🐼',
                zebra: '🦓', tiger: '🐅'
              }[step.animal]}
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-zoo-wood">{step.title}</h2>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${statusColor} uppercase tracking-wider`}>
                {status.replace('_', ' ')}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-black/10 rounded-full transition-colors text-zoo-wood">
            <X size={28} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-8 bg-paper-pattern">
          {renderContent(step.instructions)}
          
          <div className="mt-8 p-4 bg-yellow-50 rounded-xl border border-yellow-200 flex items-start gap-3">
             <Map className="text-zoo-wood shrink-0 mt-1" />
             <div>
               <h4 className="font-bold text-zoo-wood">Zoo Keeper's Note</h4>
               <p className="text-sm text-slate-600">Ensure all checklist items are marked off in your actual cloud console before proceeding to the next enclosure!</p>
             </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
           <button 
             onClick={onClose}
             className="px-6 py-2 bg-zoo-wood text-white rounded-xl font-bold hover:bg-yellow-900 transition-colors shadow-lg active:scale-95"
           >
             Got it!
           </button>
        </div>
      </div>
    </div>
  );
};