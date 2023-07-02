import { useContext } from "react";
import { useLocation } from "react-router-dom";
import "./rightBar.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { DarkModeContext } from "../../context/darkModeContext";
import Friend from "../friend/Friend";

const RightBar = () => {
  const location = useLocation().pathname.split("/")[1];

  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  const { isLoading: sIsLoading, data: suggestionData } = useQuery(
    ["suggestion"],
    () =>
      makeRequest.get("/items/suggestions/" + currentUser.id).then((res) => {
        return res.data;
      })
  );

  /*  
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following) return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", {userId});
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const handleFollow = () => {
    
    mutation.mutate(relationshipData.includes(currentUser.id));
  }; */

  const STYLE = {
    height: "155px",
    width: "155px",
    backgroundColor: darkMode ? "#333" : "#f6f3f3",
  };

  return (
    location !== "chat" && (
      <div className="rightBar">
        <div className="container">
          <div className="suggestion">
            <span>Suggestions For You</span>
            <div className="wrapper">
              {sIsLoading
                ? "Loading..."
                : suggestionData.map((s) => (
                    <div className="user" key={s.userId}>
                      <Friend user={s} key={s.userId} sty={STYLE} />
                    </div>
                  ))}
            </div>
          </div>

          <div className="item">
            <span>Online</span>
            <div className="wrapper">
              <div className="user">
                <div className="userInfo">
                  <img
                    src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt=""
                  />
                  <div className="online" />
                  <span>Jane Doe</span>
                </div>
              </div>
              <div className="user">
                <div className="userInfo">
                  <img
                    src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt=""
                  />
                  <div className="online" />
                  <span>Jane Doe</span>
                </div>
              </div>
              <div className="user">
                <div className="userInfo">
                  <img
                    src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt=""
                  />
                  <div className="online" />
                  <span>Jane Doe</span>
                </div>
              </div>
              <div className="user">
                <div className="userInfo">
                  <img
                    src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt=""
                  />
                  <div className="online" />
                  <span>Jane Doe</span>
                </div>
              </div>
              <div className="user">
                <div className="userInfo">
                  <img
                    src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt=""
                  />
                  <div className="online" />
                  <span>Jane Doe</span>
                </div>
              </div>
              <div className="user">
                <div className="userInfo">
                  <img
                    src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt=""
                  />
                  <div className="online" />
                  <span>Jane Doe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default RightBar;
