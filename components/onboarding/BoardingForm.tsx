'use client';
import { useState } from 'react';
import ProgressBar from './ProgressBar';
import useMultiStepForm from '@/hooks/useMultiStepForm';

export default function BoardingForm() {
    const [isFinish, setIsFinish] = useState(false);
    const [uploadFilePath, setUploadFilePath] = useState<string | undefined>(undefined);
    const stepIndex = 1; // Set your current step index here
    const[step,stepIndex,formState,formState2,formState3,goBack,goNext,handleInputChange,handleInputChange2,handleInputChange3,fieldErrors,fieldErrors2,fieldErrors3]=useMultiStepForm()

    return (
        <div className="h-screen flex items-center justify-center relative mt-10">
            <div className="bg-white shadow-lg rounded-sm w-full max-w-4xl pt-10 pb-6 absolute z-30">
                {/* Form content goes here */}
            </div>
            <ProgressBar currentStep={stepIndex} isFinish={isFinish} />
        </div>
    );
}
