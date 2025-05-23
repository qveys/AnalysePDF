import React from 'react';
import { FileText, FileSearch, Database, FileOutput, Settings } from 'lucide-react';
import { WorkflowStep as WorkflowStepType } from '../../types';
import { WorkflowStep } from './WorkflowStep';

interface WorkflowHeaderProps {
  currentStep: WorkflowStepType;
  isProcessing: boolean;
  onStepClick: (step: WorkflowStepType) => void;
}

export const WorkflowHeader: React.FC<WorkflowHeaderProps> = ({ 
  currentStep, 
  isProcessing,
  onStepClick 
}) => {
  const steps = [
    { 
      id: 'upload' as WorkflowStepType, 
      label: 'Téléversement', 
      icon: <FileText className="h-5 w-5" /> 
    },
    { 
      id: 'analyze' as WorkflowStepType, 
      label: 'Analyse', 
      icon: <FileSearch className="h-5 w-5" /> 
    },
    { 
      id: 'normalize' as WorkflowStepType, 
      label: 'Uniformisation', 
      icon: <Database className="h-5 w-5" /> 
    },
    { 
      id: 'export' as WorkflowStepType, 
      label: 'Exportation', 
      icon: <FileOutput className="h-5 w-5" /> 
    },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <a 
            href="/"
            title="Retour à l'accueil"
            className="text-2xl font-bold text-blue-700 mb-4 md:mb-0 hover:text-blue-800 transition-colors"
          >
            AnalysePDF
          </a>

          <div className="flex items-center space-x-6">
            <nav>
              <ol className="flex items-center space-x-2 md:space-x-4">
                {steps.map((step, index) => (
                  <li key={step.id} className="flex items-center">
                    {index > 0 && (
                      <div className={`h-px w-8 md:w-12 mr-2 md:mr-4 ${
                        index <= currentStepIndex ? 'bg-blue-500' : 'bg-gray-300'
                      }`} />
                    )}
                    
                    <WorkflowStep
                      step={step}
                      isActive={currentStep === step.id}
                      isPast={currentStepIndex >= index}
                      isProcessing={isProcessing}
                      onClick={() => onStepClick(step.id)}
                    />
                  </li>
                ))}
              </ol>
            </nav>

            <button
              onClick={() => onStepClick('settings')}
              className={`p-2 rounded-full transition-colors ${
                currentStep === 'settings'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Paramètres"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};