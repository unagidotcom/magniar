import React, { useState } from 'react';
import {
  ProjectRequestFormData,
  StartProjectStep,
  FormValidationErrors,
} from '../../types/startProject';
import { INITIAL_FORM_DATA, SAMPLE_FILLED_FORM_DATA } from '../../data/startProjectData';
import { StartProjectHero } from './StartProjectHero';
import { FormProgress } from './FormProgress';
import { FormSidebar } from './FormSidebar';
import { OpeningGoalStep } from './OpeningGoalStep';
import { AboutYouStep } from './AboutYouStep';
import { YourBusinessStep } from './YourBusinessStep';
import { WhatYouNeedStep } from './WhatYouNeedStep';
import { WhereYouAreStep } from './WhereYouAreStep';
import { BudgetTimingStep } from './BudgetTimingStep';
import { FinalDetailsStep } from './FinalDetailsStep';
import { ReviewSummaryStep } from './ReviewSummaryStep';
import { SubmissionSuccessStep } from './SubmissionSuccessStep';
import { submitProjectRequest } from '../../services/projectRequestService';

interface StartProjectPageProps {
  onReturnHome?: () => void;
  onExploreInsights?: () => void;
  externalStepOverride?: StartProjectStep;
  externalFormDataOverride?: Partial<ProjectRequestFormData>;
}

export const StartProjectPage: React.FC<StartProjectPageProps> = ({
  onReturnHome,
  onExploreInsights,
  externalStepOverride,
  externalFormDataOverride,
}) => {
  const [formData, setFormData] = useState<ProjectRequestFormData>(
    externalFormDataOverride
      ? { ...INITIAL_FORM_DATA, ...externalFormDataOverride }
      : INITIAL_FORM_DATA
  );

  const [currentStep, setCurrentStep] = useState<StartProjectStep>(
    externalStepOverride !== undefined ? externalStepOverride : 0
  );

  const [errors, setErrors] = useState<FormValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [requestId, setRequestId] = useState<string>('');
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Sync external overrides if passed from dev control panel
  React.useEffect(() => {
    if (externalStepOverride !== undefined) {
      setCurrentStep(externalStepOverride);
    }
  }, [externalStepOverride]);

  React.useEffect(() => {
    if (externalFormDataOverride) {
      setFormData((prev) => ({ ...prev, ...externalFormDataOverride }));
    }
  }, [externalFormDataOverride]);

  const handleFormChange = (fields: Partial<ProjectRequestFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
    // Clear errors when typing
    setErrors({});
    setSubmissionError(null);
  };

  // Step Validation Logic
  const validateStep = (step: StartProjectStep): boolean => {
    const errs: FormValidationErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) {
        errs.firstName = 'First name is required.';
      }
      if (!formData.lastName.trim()) {
        errs.lastName = 'Last name is required.';
      }
      if (!formData.email.trim() || !formData.email.includes('@') || !formData.email.includes('.')) {
        errs.email = 'Please enter a valid work email address.';
      }
    } else if (step === 2) {
      if (!formData.companyName.trim()) {
        errs.companyName = 'Company name is required.';
      }
      if (!formData.website.trim() || !formData.website.includes('.')) {
        errs.website = 'Please enter a valid website URL.';
      }
    } else if (step === 4) {
      if (!formData.tellUsMore.trim() || formData.tellUsMore.trim().length < 10) {
        errs.tellUsMore = 'Please provide at least 10 characters explaining your situation.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 7) {
        const nextStep = (currentStep + 1) as StartProjectStep;
        setCurrentStep(nextStep);
        window.scrollTo({ top: 120, behavior: 'smooth' });
      }
    }
  };

  const handleBackStep = () => {
    if (currentStep > 0) {
      const prevStep = (currentStep - 1) as StartProjectStep;
      setCurrentStep(prevStep);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleJumpToStep = (step: StartProjectStep) => {
    setCurrentStep(step);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!validateStep(1) || !validateStep(2) || !validateStep(4)) {
      setSubmissionError('Please review the required fields before submitting your project brief.');
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const created = await submitProjectRequest(formData);
      setRequestId(created.request_number);
      setIsSubmitting(false);
      setCurrentStep(8); // Submission success screen
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Project request submission failed', err);
      setIsSubmitting(false);
      setSubmissionError(
        err?.message || 'We could not submit your project brief. Please try again.'
      );
    }
  };

  return (
    <div className="w-full bg-[#050505] min-h-screen text-[#F5F7FA]">
      {/* 01: HERO HEADER */}
      <StartProjectHero currentStep={currentStep} />

      {/* 02: STICKY PROGRESS INDICATOR */}
      <FormProgress
        currentStep={currentStep}
        onStepClick={handleJumpToStep}
        onBack={handleBackStep}
        canGoBack={currentStep > 0 && currentStep < 8}
      />

      {/* 03: MAIN FORM WORKSPACE */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 py-8 lg:py-12">
        {currentStep === 8 ? (
          /* STEP 08: SUBMISSION SUCCESS SCREEN */
          <SubmissionSuccessStep
            formData={formData}
            requestId={requestId}
            onReturnHome={() => {
              if (onReturnHome) onReturnHome();
              else window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreInsights={() => {
              if (onExploreInsights) onExploreInsights();
              else window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onResetForm={() => {
              setFormData(INITIAL_FORM_DATA);
              setCurrentStep(0);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : (
          /* STEPS 00 TO 07: DUAL-COLUMN FORM + SIDEBAR */
          <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start justify-between">
            {/* MAIN FORM STEP CONTAINER */}
            <div className="w-full flex-1 bg-[#050505] border border-white/10 p-6 sm:p-8 lg:p-10 rounded-[2px] shadow-2xl space-y-8">
              {currentStep === 0 && (
                <OpeningGoalStep
                  formData={formData}
                  onChange={handleFormChange}
                  onNext={handleNextStep}
                />
              )}

              {currentStep === 1 && (
                <AboutYouStep
                  formData={formData}
                  errors={errors}
                  onChange={handleFormChange}
                  onNext={handleNextStep}
                  onBack={handleBackStep}
                />
              )}

              {currentStep === 2 && (
                <YourBusinessStep
                  formData={formData}
                  errors={errors}
                  onChange={handleFormChange}
                  onNext={handleNextStep}
                  onBack={handleBackStep}
                />
              )}

              {currentStep === 3 && (
                <WhatYouNeedStep
                  formData={formData}
                  onChange={handleFormChange}
                  onNext={handleNextStep}
                  onBack={handleBackStep}
                />
              )}

              {currentStep === 4 && (
                <WhereYouAreStep
                  formData={formData}
                  errors={errors}
                  onChange={handleFormChange}
                  onNext={handleNextStep}
                  onBack={handleBackStep}
                />
              )}

              {currentStep === 5 && (
                <BudgetTimingStep
                  formData={formData}
                  errors={errors}
                  onChange={handleFormChange}
                  onNext={handleNextStep}
                  onBack={handleBackStep}
                />
              )}

              {currentStep === 6 && (
                <FinalDetailsStep
                  formData={formData}
                  onChange={handleFormChange}
                  onNext={handleNextStep}
                  onBack={handleBackStep}
                />
              )}

              {currentStep === 7 && (
                <ReviewSummaryStep
                  formData={formData}
                  onEditStep={handleJumpToStep}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  submissionError={submissionError}
                />
              )}
            </div>

            {/* PERSISTENT DESKTOP SIDEBAR ("WHAT HAPPENS NEXT") */}
            <FormSidebar currentStep={currentStep} />
          </div>
        )}
      </div>
    </div>
  );
};
