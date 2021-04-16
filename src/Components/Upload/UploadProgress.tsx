import React from "react";
import { ProgressBar, ProgressContainer } from "./style";

type ProgressProps = {
  percentage: number;
};

const UploadProgress = React.memo(({ percentage }: ProgressProps) => {
  return (
    <ProgressContainer>
      <ProgressBar percentage={percentage} />
    </ProgressContainer>
  );
});

export default UploadProgress;
