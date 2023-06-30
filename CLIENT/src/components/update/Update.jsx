import { useContext, useState } from "react";
import "./update.scss";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { FirebaseAuthContext } from "../../context/firebaseAuthContext";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../context/authContext";

const Update = ({ setOpenUpdate, user }) => {
  const [profile, setProfile] = useState(null);
  const [cover, setCover] = useState(null);
  const [texts, setTexts] = useState({
    email: user.email,
    password: user.password,
    name: user.name,
    city: user.city,
    website: user.website,
  });

  const { firebaseCurrentUser } = useContext(FirebaseAuthContext);
  const { isUpdated } = useContext(AuthContext);

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (user) => {
      return makeRequest.put("/users", user, {
        withCredentials: true,
      });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();

    //TODO: find a better way to get image URL

    let profileUrl = user.profilePic;
    let coverUrl = user.coverPic;    
    
    if (profile)  {
      try {
        const storageRef = ref(storage, `ProfilePicture/${uuid()}`);
        
        await uploadBytesResumable(storageRef, profile).then(async () => {
          await getDownloadURL(storageRef).then(async (downloadURL) => {
            console.log("downloadURL: " + downloadURL);

            //Update profile
            await updateProfile(firebaseCurrentUser, {
              photoURL: downloadURL,
            });

            await updateDoc(doc(db, "users", firebaseCurrentUser.uid), {
              email: texts.email,
              photoURL: downloadURL,
            });

            profileUrl = downloadURL
            console.log("profile: " + profileUrl);

            mutation.mutateAsync({ ...texts, profilePic: profileUrl, coverPic: coverUrl });
            console.log("done in profile");
          })
        })
      } catch (err) {
        console.log("profile upload error: " + err);
      }
    } else if(cover) {
      try {
        const storageRef = ref(storage, `CoverPicture/${uuid()}`);
        
        await uploadBytesResumable(storageRef, cover).then(async () => {
          await getDownloadURL(storageRef).then(async (downloadURL) => {
            console.log("downloadURL: " + downloadURL);
            coverUrl = downloadURL
            console.log("cover: " + coverUrl);

            mutation.mutateAsync({ ...texts, profilePic: profileUrl, coverPic: coverUrl });
            console.log("done in cover");
          })
        })
      } catch (err) {
        console.log("cover upload error: " + err);
      }
    } else {
      mutation.mutateAsync({ ...texts, profilePic: profileUrl, coverPic: coverUrl });
      console.log("done in profile");
    }

    // Update currentUser context when profile is updated
    isUpdated(user.id)

    setOpenUpdate(false);
    setCover(null);
    setProfile(null);
  };

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <div className="files">
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    profile
                    ? URL.createObjectURL(profile)
                    : user.profilePic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={(e) => setProfile(e.target.files[0])}
              />
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    cover
                      ? URL.createObjectURL(cover)
                      : user.coverPic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={(e) => setCover(e.target.files[0])}
            />
          </div>
          <label>Email</label>
          <input
            type="text"
            value={texts.email}
            name="email"
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="text"
            value={texts.password}
            name="password"
            onChange={handleChange}
          />
          <label>Name</label>
          <input
            type="text"
            value={texts.name}
            name="name"
            onChange={handleChange}
          />
          <label>Country / City</label>
          <input
            type="text"
            name="city"
            value={texts.city}
            onChange={handleChange}
          />
          <label>Website</label>
          <input
            type="text"
            name="website"
            value={texts.website}
            onChange={handleChange}
          />
          <button onClick={handleClick}>Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
      </div>
    </div>
  );
};

export default Update;
