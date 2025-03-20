import React from 'react';
import { STEP_INFO } from '../../src/hooks/useMultiStepForm';

const ProgressBar = ({ currentStep, isFinish }: { currentStep: number; isFinish: boolean }) => {
  const steps = Object.values(STEP_INFO);
  const progressWidth = (currentStep / steps.length) * 100; // Convert to percentage

  return (
    <div className="relative w-full">
      {/* Progress Bar Background */}
      <div className="w-full bg-gray-300 h-2 rounded-full">
        {/* Filled Progress Bar */}
        <div
          className="h-2 bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${progressWidth}%` }}
        ></div>
      </div>

      {/* Steps Indicator */}
      <div className="max-w-screen-lg flex justify-between mt-2">
        {steps.map((step) => (
          <div key={step.id} className="text-center flex-1">
            {/* Step Circle */}
            <div
              className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center 
                transition-all duration-300 border-2 
                ${isFinish ? 'bg-green-500 border-green-500' : 
                  currentStep >= step.id ? 'bg-blue-500 border-blue-500' : 
                  'bg-gray-300 border-gray-400'}`}
            >
              {step.id}
            </div>

            {/* Step Title */}
            <h6
              className={`text-sm font-bold ${
                isFinish ? 'text-green-500' : currentStep === step.id ? 'text-black' : 'text-gray-400'
              }`}
            >
              {step.title}
            </h6>

            {/* Additional Step Circle with Border */}
            <div className="flex items-center w-full justify-center"></div>
            <div
              className={`w-6 h-6 z-50 relative overflow-hidden shrink-0 -mx-[1px] flex items-center justify-center rounded-full 
                ${isFinish ? 'bg-green-500 border-4 border-green-700' : 
                  currentStep === step.id ? 'border-4 border-[#24abff] bg-white' : 
                  'bg-slate-200'}`}
            >
              {/* Conditional Step Indicator */}
              {currentStep >= step.id || isFinish ? (
                <span className="text-black text-xs p-2:">

                </span> 
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
