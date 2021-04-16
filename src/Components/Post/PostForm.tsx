import { Field, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { IComment } from "../../Firebase/types";
import { useAuthUser, useFirebase, usePost } from "../../Hooks";
import { SubmitButton } from "../Buttons";
import {
  PostFormContainer,
  PostLoginLink,
  PostLoginText,
  PostTextArea,
  StyledPostForm,
} from "./style";

interface Values {
  comment: string;
}

const initialValues: Values = {
  comment: "",
};

const validationSchema = Yup.object({
  comment: Yup.string().required().max(255, "Too many characters").trim(),
});

type PostFormProps = {
  add: (data: IComment | IComment[]) => Promise<void> | null;
};

const PostForm = ({ add }: PostFormProps) => {
  const { id } = usePost();
  const authUser = useAuthUser();
  const firebase = useFirebase();

  return (
    <PostFormContainer>
      {authUser ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (
            values: Values,
            { resetForm }: FormikHelpers<Values>
          ) => {
            try {
              add({
                authorId: authUser?.uid!,
                comment: values.comment,
                timestamp: firebase.FieldValue.serverTimestamp() as firebase.default.firestore.Timestamp,
              });
              resetForm();
            } catch (error) {
              console.error(error);
            }
          }}
        >
          <StyledPostForm>
            <label htmlFor="comment"></label>
            <Field
              id="comment"
              name="comment"
              as={PostTextArea}
              placeholder="Add comment..."
              autoComplete="off"
              autoCorrect="off"
            />
            <SubmitButton>Send</SubmitButton>
          </StyledPostForm>
        </Formik>
      ) : (
        <PostLoginText>
          <PostLoginLink to={`/accounts/login?next=/p/${id}`}>
            Log in{" "}
          </PostLoginLink>
          to like or comment.
        </PostLoginText>
      )}
    </PostFormContainer>
  );
};

export default PostForm;
