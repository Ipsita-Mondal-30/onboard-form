import { useState } from "react";
import useZodVerifySchema from "./useVerifyZodSchema";
import { formSchema, formSchema2, formSchema3 } from "../../schemas/formSchema"
export const STEP_INFO = {
  register: { id: 1, title: "Register" },
  details: { id: 2, title: "User Detail" },
  preferences: { id: 3, title: "Preferences" },
  overview: { id: 4, title: "Final Overview" },
};

export const STEP_INFO_LIST = Object.keys(STEP_INFO) as (keyof typeof STEP_INFO)[];
export type STEP_TYPE = keyof typeof STEP_INFO;
export const MAX_STEPS = STEP_INFO_LIST.length;

// Form State Interfaces
export interface FormState {
  email: string;
  phone: string;
  password: string;
}
const initialState: FormState = {
  email: "",
  phone: "",
  password: "",
};

export interface FormState2 {
  fullName: string;
  file?: string | File;
  dob: string;
  gender: string;
}
const initialState2: FormState2 = {
  fullName: "",
  file: undefined,
  dob: "",
  gender: "",
};

export interface FormState3 {
  role: string;
}
const initialState3: FormState3 = {
  role: "",
};

const useMultiStepForm = () => {
  const [step, setStep] = useState<STEP_TYPE>("register");
  const [stepIndex, setStepIndex] = useState(1);
  const [formState, setFormState] = useState<FormState>(initialState);
  const [formState2, setFormState2] = useState<FormState2>(initialState2);
  const [formState3, setFormState3] = useState<FormState3>(initialState3);

  // Validation Hooks (Corrected)
  const [verifySchema, fieldErrors, setFieldErrors] = useZodVerifySchema(formSchema, formState);
  const [verifySchema2, fieldErrors2, setFieldErrors2] = useZodVerifySchema(formSchema2, formState2);
  const [verifySchema3, fieldErrors3, setFieldErrors3] = useZodVerifySchema(formSchema3, formState3);

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldErrors({});
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputChange2 = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFieldErrors2({});
    const { name, value, type, files } = event.target as HTMLInputElement;
    setFormState2((prevState) => ({
      ...prevState,
      [name]: type === "file" ? files?.[0] : value,
    }));
  };

  const handleInputChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldErrors3({});
    const { name, value } = event.target;
    setFormState3((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to move to the next step
  const nextStepCall = () => {
    setStepIndex((prevStep) => {
      const newIndex = prevStep + 1;
      if (newIndex > MAX_STEPS) return prevStep;
      setStep(STEP_INFO_LIST[newIndex - 1]);
      return newIndex;
    });
  };

  // Function to handle going to the next step with validation
  const goNext = async () => {
    let isValid = false;

    if (step === "register") {
      isValid = await verifySchema();
    } else if (step === "details") {
      isValid = await verifySchema2();
    } else if (step === "preferences") {
      isValid = await verifySchema3();
    } else if (step === "overview") {
      isValid = true;
    }

    if (!isValid) return;
    nextStepCall();
  };

  // Function to go back to the previous step
  const goBack = () => {
    setStepIndex((prevStep) => {
      if (prevStep === 1) return prevStep;
      const newIndex = prevStep - 1;
      setStep(STEP_INFO_LIST[newIndex - 1]);
      return newIndex;
    });
  };

  return {
    step,
    setStep,
    stepIndex,
    setStepIndex,
    formState,
    setFormState,
    formState2,
    setFormState2,
    formState3,
    setFormState3,
    fieldErrors,
    fieldErrors2,
    fieldErrors3,
    handleInputChange,
    handleInputChange2,
    handleInputChange3,
    goNext,
    goBack,
  };
};

export default useMultiStepForm;
