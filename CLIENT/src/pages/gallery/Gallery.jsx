import React, { useState } from "react";
import "./gallery.scss";
import { useLocation } from "react-router-dom";
import { makeRequest } from "../../axios";
import { useQuery } from "@tanstack/react-query";
import Modal from "../../components/Modal/Modal";

const Gallery = () => {
  const [clickedImg, setClickedImg] = useState(null);

  const userId = +useLocation().pathname.split("/")[2];

  const { isLoading, error, data } = useQuery(["picture"], () =>
    makeRequest.get("/items/pictures/" + userId).then((res) => {
      return res.data;
    })
  );

  const close = () => {
    setClickedImg(null);
  }

  return (
    <div className="gallery">
      <div className="container">
        {isLoading ? (
          "Loading..."
        ) : data.length === 0 ? (
          <h3>No pictures</h3>
        ) : (
          data.map(
            (i) =>
              i.img && (
                <div
                  className="picture"
                  key={i.createdAt}
                  onClick={() => setClickedImg(i.img)}
                >
                  <img src={i.img} alt="" />
                </div>
              )
          )
        )}
        {clickedImg && <Modal onClose={close}><img style={{width: "100%", height: "auto"}} src={clickedImg} alt="" /></Modal>}
      </div>
    </div>
  );
};

export default Gallery;
