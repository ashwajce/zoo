import React from 'react';
import { AnimalType, StepStatus, WorkflowStep } from '../types';
import { CheckCircle2, Lock, AlertCircle, Clock, Construction } from 'lucide-react';

interface EnclosureProps {
  step: WorkflowStep;
  status: StepStatus;
  onClick: () => void;
  isLeft: boolean; // Position for zigzag layout
}

const AnimalIcon: React.FC<{ type: AnimalType }> = ({ type }) => {
  const emojis: Record<AnimalType, string> = {
    elephant: '🐘',
    lion: '🦁',
    monkey: '🐒',
    giraffe: '🦒',
    hippo: '🦛',
    penguin: '🐧',
    owl: '🦉',
    panda: '🐼',
    zebra: '🦓',
    tiger: '🐅'
  };
  return <span className="text-4xl filter drop-shadow-md">{emojis[type]}</span>;
};

const StatusBadge: React.FC<{ status: StepStatus }> = ({ status }) => {
  switch (status) {
    case StepStatus.COMPLETED:
      return <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1 shadow-md border-2 border-white"><CheckCircle2 size={16} /></div>;
    case StepStatus.IN_PROGRESS:
      return <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1 shadow-md border-2 border-white animate-pulse"><Construction size={16} /></div>;
    case StepStatus.BLOCKED:
      return <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md border-2 border-white"><AlertCircle size={16} /></div>;
    case StepStatus.LOCKED:
      return <div className="absolute -top-2 -right-2 bg-slate-500 text-white rounded-full p-1 shadow-md border-2 border-white"><Lock size={16} /></div>;
    case StepStatus.PENDING:
    default:
      return <div className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full p-1 shadow-md border-2 border-white"><Clock size={16} /></div>;
  }
};

export const Enclosure: React.FC<EnclosureProps> = ({ step, status, onClick, isLeft }) => {
  const isLocked = status === StepStatus.LOCKED;

  return (
    <div 
      className={`relative flex items-center group ${isLeft ? 'flex-row-reverse text-right' : 'flex-row text-left'} transition-all duration-300`}
      style={{ minHeight: '120px' }}
    >
      {/* Label Info - Shifts based on side */}
      <div className={`flex-1 px-4 ${isLocked ? 'opacity-50 blur-[1px]' : 'opacity-100'}`}>
        <h3 className="font-display font-bold text-xl text-zoo-wood drop-shadow-sm">{step.title}</h3>
        <p className="text-sm text-slate-700 font-medium bg-white/60 inline-block px-2 py-1 rounded-lg mt-1 backdrop-blur-sm">
          {step.description}
        </p>
      </div>

      {/* The Enclosure (Button) */}
      <button
        onClick={onClick}
        disabled={isLocked}
        className={`
          relative z-10 w-24 h-24 rounded-full flex items-center justify-center 
          border-4 shadow-[0_8px_0_rgba(0,0,0,0.2)] transition-transform active:translate-y-[4px] active:shadow-[0_4px_0_rgba(0,0,0,0.2)]
          ${isLocked 
            ? 'bg-slate-200 border-slate-300 cursor-not-allowed grayscale' 
            : 'bg-white border-zoo-pathBorder hover:scale-105 cursor-pointer hover:bg-yellow-50'}
        `}
      >
        <AnimalIcon type={step.animal} />
        <StatusBadge status={status} />
        
        {/* Decorative Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-slate-300 opacity-50 m-1"></div>
      </button>

      {/* Spacer to center the path */}
      <div className="flex-1"></div>
    </div>
  );
};