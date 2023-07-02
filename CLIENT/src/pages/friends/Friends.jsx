import React from "react";
import "./friends.scss";
import Friend from "../../components/friend/Friend";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";

const Friends = () => {
  const userId = +useLocation().pathname.split("/")[2];

  const { isLoading, data } = useQuery(["friend"], () =>
    makeRequest.get("/items/friends/" + userId).then((res) => {
      return res.data;
    })
  );

  /* const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
        return res.data;
      })
  ); 

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  ); */

  return (
    <div className="friends">
      <div className="container">
        {isLoading ? (
          "Loading..."
        ) : data.length === 0 ? (
          <h3>No Friends Yet</h3>
        ) : (
          data.map((u) => <Friend user={u} key={u.userId} />)
        )}
      </div>
    </div>
  );
};

export default Friends;
