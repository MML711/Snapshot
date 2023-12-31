import React, { useContext } from "react";
import "./friend.scss";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const Friend = ({ user, sty }) => {
  const { currentUser } = useContext(AuthContext);

  /* const { isLoading, error, data } = useQuery(["friend"], () =>
    makeRequest.get("/items/friends/" + userId).then((res) => {
      return res.data;
    })
  ); */

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest
        .get("/relationships?followedUserId=" + user.userId)
        .then((res) => {
          return res.data;
        })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    () => {
      return makeRequest.post("/relationships", { userId: user.userId });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["suggestion"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };

  return (
    <Link
      to={`/profile/${user.userId}`}
      style={{ textDecoration: "inherit", color: "inherit" }}
    >
      <div className="friend" style={sty}>
        <div className="container">
          <img src={user.profilePic} alt="" />
          <span>{user.name}</span>
          {sty ? (
            <button onClick={handleFollow}>
              {rIsLoading ? "Loading..." : "Follow"}
            </button>
          ) : (
            <PersonOutlinedIcon className="icon" />
          )}
        </div>
      </div>
    </Link>
  );
};

export default Friend;
