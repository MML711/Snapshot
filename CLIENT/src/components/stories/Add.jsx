import { useState } from "react";
import "./add.scss";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Add = ({ setOpenUpdate, pic }) => {
  const [file, setFile] = useState(null);
  const [clicked, setClicked] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newStory) => {
      return makeRequest.post("/stories", newStory, {
        withCredentials: true,
      });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["stories"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();

    setClicked(true);

    if (file) {
      try {
        const storageRef = ref(storage, `Images/${uuid()}`);

        await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            console.log("downloadURL: " + downloadURL);
            mutation.mutateAsync({ img: downloadURL });

            setClicked(false);
            setOpenUpdate(false);
          });
        });
      } catch (err) {
        console.log(err);
      }
    } 
    
    setFile(null);
  };

  return (
    <div className="addStory">
      <div className="wrapper">
        <h4>Add a Story</h4>
        <div className="file">
          <label htmlFor="add">
            <span>Story Picture</span>
            <div className="imgContainer">
              <img src={file ? URL.createObjectURL(file) : pic} alt="" />
              <CloudUploadIcon className="icon" />
            </div>
          </label>
          <input
            type="file"
            id="add"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
        {!file && clicked && <p>Please upload a picture</p>}
        <button className="add" onClick={handleClick}>
          Add
        </button>
      </div>
    </div>
  );
};

export default Add;
