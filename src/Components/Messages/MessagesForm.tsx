import { Field, Formik, FormikHelpers } from "formik";
import { useEffect, useRef } from "react";
import { useFirebase } from "../../Hooks";
import { SubmitButton } from "../Buttons";
import {
  MessagesFormContainer,
  MessagesTextArea,
  StyledMessagesForm,
} from "./style";

type Values = {
  message: string;
};

const initialValues: Values = {
  message: "",
};

const MessagesForm = ({ dialogId }: { dialogId: string }) => {
  const firebase = useFirebase();
  const sbutton = useRef<HTMLButtonElement>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.shiftKey) return;

    if (e.code === "Enter") {
      sbutton.current?.click();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <MessagesFormContainer>
      <Formik
        initialValues={initialValues}
        onSubmit={async (
          values: Values,
          { resetForm }: FormikHelpers<Values>
        ) => {
          try {
            await firebase.sendMessageInDialog(dialogId, values.message);
            resetForm();
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <StyledMessagesForm>
          <label htmlFor="message"></label>
          <Field
            id="message"
            name="message"
            as={MessagesTextArea}
            placeholder="Write a message..."
            autoComplete="off"
            autoCorrect="off"
          />
          <SubmitButton ref={sbutton}>Send</SubmitButton>
        </StyledMessagesForm>
      </Formik>
    </MessagesFormContainer>
  );
};

export default MessagesForm;
