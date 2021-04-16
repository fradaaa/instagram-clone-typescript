import { useFormikContext } from "formik";
import { forwardRef } from "react";
import { Button } from "./style";

type Props = {
  children: React.ReactNode;
};

const SubmitButton = forwardRef<HTMLButtonElement, Props>(
  ({ children }, ref) => {
    const { isValid, dirty, isSubmitting } = useFormikContext<{}>();

    return (
      <Button
        ref={ref}
        type="submit"
        disabled={!isValid || !dirty || isSubmitting}
      >
        {children}
      </Button>
    );
  }
);

export default SubmitButton;
