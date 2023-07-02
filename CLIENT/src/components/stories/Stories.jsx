import { useContext, useState } from "react";
import "./stories.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Add from "./Add";
import Story from "./Story";

const Stories = () => {
  const [openUpdate, setOpenUpdate] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const { isLoading, data } = useQuery(["stories"], () =>
    makeRequest.get("/stories").then((res) => {
      return res.data;
    })
  );

  return (
    <div className="stories">
      <div className="userStory">
        <img src={currentUser.profilePic} alt="" />
        <span>{currentUser.name}</span>
        <button onClick={() => setOpenUpdate(true)}>+</button>
      </div>
      {isLoading ? (
        "Loading..."
      ) : (
        <div className="container">
          <div className="wrapper">
            {data?.map((story) => (
              <Story key={story.id} story={story} />
            ))}
          </div>
        </div>
      )}
      {openUpdate && (
        <Add setOpenUpdate={setOpenUpdate} pic={currentUser.profilePic} />
      )}
    </div>
  );
};

export default Stories;
