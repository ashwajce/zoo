import React, { useState } from 'react';
import { FullWorkflow } from '../types';
import { Settings, Save, RefreshCw } from 'lucide-react';

interface ConfigPanelProps {
  currentWorkflow: FullWorkflow;
  onUpdate: (workflow: FullWorkflow) => void;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({ currentWorkflow, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [jsonText, setJsonText] = useState(JSON.stringify(currentWorkflow, null, 2));
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonText);
      // Basic validation could go here
      onUpdate(parsed);
      setError(null);
      setIsOpen(false);
    } catch (e) {
      setError("Invalid JSON format. Please check your syntax.");
    }
  };

  const handleReset = () => {
      setJsonText(JSON.stringify(currentWorkflow, null, 2));
      setError(null);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-white p-3 rounded-full shadow-lg border-2 border-zoo-pathBorder text-zoo-wood hover:bg-zoo-path transition-colors"
        title="Admin Config"
      >
        <Settings size={24} />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col border-4 border-zoo-pathBorder">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-zoo-path">
          <h2 className="font-display font-bold text-xl text-zoo-wood flex items-center gap-2">
             <Settings size={20} /> Workflow Configuration
          </h2>
          <div className="flex gap-2">
              <button onClick={handleReset} className="p-2 text-slate-600 hover:text-zoo-wood hover:bg-white/50 rounded-lg">
                  <RefreshCw size={20} />
              </button>
              <button onClick={() => setIsOpen(false)} className="text-sm font-bold text-slate-500 hover:text-slate-800 px-3 py-1">
                Close
              </button>
          </div>
        </div>
        
        <div className="flex-1 p-0 relative">
          <textarea
            className="w-full h-full p-4 font-mono text-sm bg-slate-50 text-slate-800 resize-none focus:outline-none focus:ring-2 focus:ring-zoo-grass inset-0"
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            spellCheck={false}
          />
        </div>

        {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 text-sm font-bold border-t border-red-200">
                {error}
            </div>
        )}

        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center">
            <p className="text-xs text-slate-500">
                Paste your JSON definition here. Includes `steps` (process MD) and `currentState`.
            </p>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2 bg-zoo-grassDark text-white font-bold rounded-lg hover:bg-green-700 transition-colors shadow-md"
          >
            <Save size={18} /> Update Workflow
          </button>
        </div>
      </div>
    </div>
  );
};