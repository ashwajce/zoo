import React from 'react';
import { FullWorkflow } from '../types';
import { Enclosure } from './Enclosure';

interface ZooMapProps {
  workflow: FullWorkflow;
  onStepClick: (stepId: string) => void;
}

export const ZooMap: React.FC<ZooMapProps> = ({ workflow, onStepClick }) => {
  return (
    <div className="relative w-full max-w-3xl mx-auto py-12 px-4">
      {/* The Winding Path SVG Layer */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" style={{ minHeight: '100%' }}>
         {/* Define dashed line pattern */}
         <defs>
           <pattern id="grass-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
             <circle cx="2" cy="2" r="1" fill="#70A83B" opacity="0.3" />
           </pattern>
         </defs>
         
         {/* Draw Path connecting centers of nodes */}
         {/* This is a simplified calculation assuming fixed height per node approx 120px + gaps */}
         <path 
           d={workflow.steps.map((_, i) => {
             const y = 48 + 24 + (i * 120); // Top padding + half height + index offset
             const x = i % 2 === 0 ? '50%' : '50%'; // Actually, we want a zig zag
             // For a true zig zag, we need absolute coords or approximate percentages.
             // Let's use a simpler central spine path for mobile, and zig zag for desktop.
             // Since we use Flex layout in Enclosure, the button is always center.
             // Let's just draw a line down the middle for simplicity in this demo version, 
             // but visually style it as a dirt road.
             if (i === 0) return `M 50% ${y}`;
             return `L 50% ${y}`;
           }).join(' ')}
           fill="none"
           stroke="#E6D5B8"
           strokeWidth="60"
           strokeLinecap="round"
           className="drop-shadow-sm"
         />
         <path 
           d={workflow.steps.map((_, i) => {
             const y = 48 + 24 + (i * 120);
             if (i === 0) return `M 50% ${y}`;
             return `L 50% ${y}`;
           }).join(' ')}
           fill="none"
           stroke="#C1A883"
           strokeWidth="64" // Border
           strokeLinecap="round"
           style={{ zIndex: -1 }}
           strokeDasharray="0"
         />
           {/* Dashed Center Line */}
         <path 
           d={workflow.steps.map((_, i) => {
             const y = 48 + 24 + (i * 120);
             if (i === 0) return `M 50% ${y}`;
             return `L 50% ${y}`;
           }).join(' ')}
           fill="none"
           stroke="#C1A883"
           strokeWidth="4"
           strokeDasharray="10 10"
           opacity="0.6"
         />
      </svg>

      {/* Decorative Trees/Elements */}
      <div className="absolute top-10 left-10 text-4xl opacity-80 pointer-events-none">🌳</div>
      <div className="absolute top-40 right-10 text-5xl opacity-80 pointer-events-none">🌲</div>
      <div className="absolute bottom-20 left-16 text-4xl opacity-80 pointer-events-none">🌴</div>
      <div className="absolute bottom-60 right-20 text-3xl opacity-80 pointer-events-none">🎋</div>

      {/* Steps List */}
      <div className="space-y-[0px] relative z-10 pb-24"> 
        {/* Start Sign */}
        <div className="flex justify-center mb-8">
            <div className="bg-zoo-wood text-white px-6 py-2 rounded-lg font-display font-bold text-xl shadow-lg border-2 border-yellow-900 transform -rotate-2">
                ENTRANCE
            </div>
        </div>

        {workflow.steps.map((step, index) => (
          <Enclosure
            key={step.id}
            step={step}
            status={workflow.currentState[step.id]?.status || 'locked'}
            onClick={() => onStepClick(step.id)}
            isLeft={index % 2 === 1}
          />
        ))}

        {/* Finish Sign */}
        <div className="flex justify-center mt-8">
            <div className="bg-zoo-wood text-white px-6 py-2 rounded-lg font-display font-bold text-xl shadow-lg border-2 border-yellow-900 transform rotate-2">
                EXIT
            </div>
        </div>
      </div>
    </div>
  );
};