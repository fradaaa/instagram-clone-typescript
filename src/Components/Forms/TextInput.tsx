import { FieldMetaProps, useField, useFormikContext } from "formik";
import { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import {
  ErrorInfo,
  FormRow,
  Input,
  RowLabel,
  StyledTooltip,
  TooltipText,
} from "./style";

type TextInputProps = {
  label: string;
  errorInfo?: boolean;
  type: string;
  id: string;
  name: string;
  placeholder: string;
};

const TextInput = ({ label, errorInfo, ...props }: TextInputProps) => {
  const [field, meta] = useField(props);
  const { isSubmitting } = useFormikContext();

  return (
    <FormRow>
      <RowLabel htmlFor={props.id || props.name}>{label}</RowLabel>
      <Input disabled={isSubmitting} {...field} {...props} />
      {errorInfo && <InputInfo meta={meta} />}
    </FormRow>
  );
};

const InputInfo = ({ meta }: { meta: FieldMetaProps<any> }) => {
  return meta.touched ? (
    <ErrorInfo>
      {meta.error ? (
        <Tooltip text={meta.error}>
          <BiErrorCircle />
        </Tooltip>
      ) : (
        <AiOutlineCheckCircle fill="green" />
      )}
    </ErrorInfo>
  ) : null;
};

type TooltipProps = {
  text: string;
  children: React.ReactNode;
};

const Tooltip = ({ text, children }: TooltipProps) => {
  const [show, setShow] = useState(false);

  const handleMouseEnter = () => setShow(true);

  const handleMouseLeave = () => setShow(false);

  return (
    <StyledTooltip
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {show && <TooltipText>{text}</TooltipText>}
      {children}
    </StyledTooltip>
  );
};

export default TextInput;
