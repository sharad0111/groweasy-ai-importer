"use client";

import { Progress } from "@/components/ui/progress";

interface Props {
  loading: boolean;
  progress: number;
}

export default function LoadingOverlay({
  loading,
  progress,
}: Props) {
  if (!loading) return null;

  return (
    <div className="mt-8">
      <p className="mb-2 font-semibold">
        AI is processing your CSV...
      </p>

      <Progress value={progress} />
    </div>
  );
}