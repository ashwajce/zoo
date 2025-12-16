import React, { useState, useEffect } from 'react';
import { INITIAL_WORKFLOW } from './utils/mockData';
import { FullWorkflow, WorkflowStep, StepStatus } from './types';
import { ZooMap } from './components/ZooMap';
import { DetailModal } from './components/DetailModal';
import { ConfigPanel } from './components/ConfigPanel';
import { Map, Trophy } from 'lucide-react';

const App: React.FC = () => {
  const [workflow, setWorkflow] = useState<FullWorkflow>(INITIAL_WORKFLOW);
  const [selectedStep, setSelectedStep] = useState<WorkflowStep | null>(null);

  const handleStepClick = (stepId: string) => {
    const step = workflow.steps.find(s => s.id === stepId);
    if (step) {
      setSelectedStep(step);
    }
  };

  const getStepStatus = (stepId: string) => {
    return workflow.currentState[stepId]?.status || StepStatus.LOCKED;
  };

  // Calculate progress
  const totalSteps = workflow.steps.length;
  const completedSteps = Object.values(workflow.currentState).filter((s: any) => s.status === StepStatus.COMPLETED).length;
  const progressPercentage = Math.round((completedSteps / totalSteps) * 100);

  return (
    <div className="flex flex-col h-full bg-zoo-grass overflow-hidden relative font-body">
      {/* Header Bar */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg border-b-4 border-zoo-grassDark z-30 sticky top-0">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="bg-zoo-grassDark p-2 rounded-lg text-white">
                    <Map size={24} />
                </div>
                <div>
                    <h1 className="font-display font-bold text-xl text-zoo-wood leading-tight">Cloud Zoo Adventure</h1>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Onboarding Guide</p>
                </div>
            </div>

            {/* Progress Pill */}
            <div className="flex items-center gap-3 bg-slate-100 rounded-full pl-4 pr-2 py-1 border border-slate-200">
                <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-slate-500 uppercase">Progress</span>
                    <span className="text-sm font-bold text-zoo-grassDark leading-none">{progressPercentage}% Complete</span>
                </div>
                <div className="h-10 w-10 rounded-full bg-white border-2 border-zoo-grass flex items-center justify-center shadow-sm">
                   {progressPercentage === 100 ? <Trophy size={18} className="text-yellow-500" /> : 
                    <div className="relative w-full h-full rounded-full flex items-center justify-center">
                       <svg className="w-full h-full transform -rotate-90">
                           <circle cx="18" cy="18" r="14" fill="transparent" stroke="#e2e8f0" strokeWidth="3" />
                           <circle 
                             cx="18" cy="18" r="14" 
                             fill="transparent" 
                             stroke="#70A83B" 
                             strokeWidth="3" 
                             strokeDasharray={88}
                             strokeDashoffset={88 - (88 * progressPercentage) / 100}
                             className="transition-all duration-1000 ease-out"
                           />
                       </svg>
                    </div>
                   }
                </div>
            </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth">
          <div className="max-w-5xl mx-auto min-h-full">
            <ZooMap 
                workflow={workflow} 
                onStepClick={handleStepClick}
            />
          </div>
      </main>

      {/* Modals & Overlays */}
      <DetailModal 
        step={selectedStep} 
        status={selectedStep ? getStepStatus(selectedStep.id) : StepStatus.LOCKED}
        onClose={() => setSelectedStep(null)} 
      />

      <ConfigPanel 
        currentWorkflow={workflow}
        onUpdate={setWorkflow}
      />
      
    </div>
  );
};

export default App;