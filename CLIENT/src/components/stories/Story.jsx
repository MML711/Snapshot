import { useContext, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import Modal from "../Modal/Modal";

const Story = ({ story }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [clickedImg, setClickedImg] = useState(null);

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    (storyId) => {
      return makeRequest.delete("/stories/" + storyId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["stories"]);
      },
    }
  );

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const close = () => {
    setClickedImg(null);
  };

  return (
    <div className="story">
      {story.userId === currentUser.id && (
        <MoreVertIcon className="more" onClick={() => setMenuOpen(!menuOpen)} />
      )}
      {menuOpen && (
        <button onClick={() => handleDelete(story.id)}>delete</button>
      )}
      <img onClick={() => setClickedImg(story.img)} src={story.img} alt="" />
      <span>{story.name}</span>

      {clickedImg && (
        <Modal onClose={close}>
          <img
            style={{ width: "100%", height: "auto" }}
            src={clickedImg}
            alt=""
          />
        </Modal>
      )}
    </div>
  );
};

export default Story;
