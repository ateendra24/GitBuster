"use client";

import { MultiStepLoader, LoadingState } from "@/components/ui/multi-step-loader";

export const REPO_LOADING_STATES: LoadingState[] = [
  { text: "Validating repository & session" },
  { text: "Cloning repository from GitHub" },
  { text: "Scanning & filtering source files" },
  { text: "Chunking code & building index" },
  { text: "Saving metadata to Redis cache" },
  { text: "Finalizing AI context & ready" },
];

interface LoadingSectionProps {
  currentStep?: number;
  loading?: boolean;
}

function LoadingSection({ currentStep, loading = true }: LoadingSectionProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] w-full">
      <MultiStepLoader
        loadingStates={REPO_LOADING_STATES}
        loading={loading}
        value={currentStep}
        duration={2500}
        loop={false}
      />
    </div>
  );
}

export default LoadingSection;
