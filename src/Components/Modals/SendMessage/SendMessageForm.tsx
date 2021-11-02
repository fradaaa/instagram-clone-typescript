import { ErrorMessage, Field, Formik, FormikHelpers } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFirebase, useProfile } from "../../../Hooks";
import { SubmitButton } from "../../Buttons";
import {
  SendMessageError,
  SendMessageFormCotainer,
  SendMessageTextArea,
  StyledSendMessageForm,
} from "../style";

type Values = {
  message: string;
};

const initialValues: Values = {
  message: "",
};

const validationSchema = Yup.object({
  message: Yup.string()
    .required("Required")
    .max(255, "Too many characters")
    .trim(),
});

const SendMessageForm = ({ closeModal }: { closeModal: () => void }) => {
  const { id } = useProfile();
  const firebase = useFirebase();

  return (
    <SendMessageFormCotainer>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (
          values: Values,
          { setErrors }: FormikHelpers<Values>
        ) => {
          try {
            await firebase.sendMessageInProfile(id, values.message);
            toast("Message has been sent.");
            closeModal();
          } catch (error) {
            setErrors({ message: (error as Error).message });
            console.error(error);
          }
        }}
      >
        <StyledSendMessageForm>
          <label htmlFor="message"></label>
          <Field
            as={SendMessageTextArea}
            id="message"
            name="message"
            placeholder="Write a message..."
            autoComplete="off"
            autoCorrect="off"
          />
          <ErrorMessage name="message" component={SendMessageError} />
          <SubmitButton>Send</SubmitButton>
        </StyledSendMessageForm>
      </Formik>
    </SendMessageFormCotainer>
  );
};

export default SendMessageForm;
