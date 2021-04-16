import { useHistory, useLocation } from "react-router";
import { toast } from "react-toastify";
import { usePost } from "../../Hooks";
import { PostMenu, PostMenuItem } from "./style";

const PostMenuModal = ({ closeModal }: { closeModal: () => void }) => {
  const { id } = usePost();
  const history = useHistory();
  const location = useLocation();
  const postURL = `/p/${id}`;

  const goToPost = (e: React.MouseEvent<HTMLDivElement>) => {
    history.push(postURL);
    closeModal();
  };

  const copyPostURL = async (e: React.MouseEvent<HTMLDivElement>) => {
    try {
      await navigator.clipboard.writeText(postURL);
      toast("Link copied to clipboard.");
    } catch (error) {
      console.error(error);
    }
    closeModal();
  };

  return (
    <PostMenu>
      {!location.pathname.includes("/p") && (
        <PostMenuItem onClick={goToPost}>Go To Post</PostMenuItem>
      )}
      <PostMenuItem onClick={copyPostURL}>Copy Link</PostMenuItem>
      <PostMenuItem onClick={closeModal}>Cancel</PostMenuItem>
    </PostMenu>
  );
};

export default PostMenuModal;
