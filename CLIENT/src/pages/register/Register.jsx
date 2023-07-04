import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import axios from "axios";
import Add from  "../../assets/Img/addAvatar.png"
import AddPic from  "../../assets/Img/addPicture.png"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const profileDefault = "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg";
  const coverDefault = "https://images.pexels.com/photos/14918477/pexels-photo-14918477.jpeg?auto=compress&cs=tinysrgb&w=600";

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    profilePic: profileDefault,
    coverPic: coverDefault,
  });  

  const [profilePic, setProfilePic] = useState(profileDefault)
  const [coverPic, setCoverPic] = useState(coverDefault)

  const [err, setErr] = useState(null);
  const [fireErr, setFireErr] = useState(null);
  // const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.files) {
      e.target.name === "profilePic" ? setProfilePic(e.target.files[0]) : setCoverPic(e.target.files[0])
      console.log(profilePic);
      console.log(coverPic);
    } 
    console.log(profilePic);
    console.log(coverPic);
  };

  /* const handlePic = (e) => {
    if (e.target.files) {
      e.target.name === "profilePic" ? setProfilePic(e.target.files[0]) : setCoverPic(e.target.files[0])
      console.log(profilePic);
      console.log(coverPic);
    }
  } */

  // 1. Profile
  // 2. Cover


  const handleClick = async (e) => {
    // setLoading(true);
    e.preventDefault();
    
    try {

      //Create user for chat in firebase
      const res = await createUserWithEmailAndPassword(auth, inputs.email, inputs.password)

      //Create a unique image name
      const date = new Date().getTime();
      const coverStorageRef = ref(storage, `CoverPicture/${inputs.username + "-" + date}-coverPic`);
      const profileStorageRef = ref(storage, `ProfilePicture/${inputs.username + "-" + date}-profilePic`);
      
      await uploadBytesResumable(coverStorageRef, coverPic).then(() => {
        getDownloadURL(coverStorageRef).then(async (downloadURL) => {
          inputs.coverPic = downloadURL;
        })
      })

      await uploadBytesResumable(profileStorageRef, profilePic).then(() => {
        getDownloadURL(profileStorageRef).then(async (downloadURL) => {
          try {
             //Update profile
             await updateProfile(res.user, {
              displayName: inputs.username,
              photoURL: downloadURL,
            });

            inputs.profilePic = downloadURL;

            //Create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName: inputs.username,
              email: inputs.email,
              photoURL: downloadURL,
            }).catch((e) => {  console.log(e); });

            //Create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {}).catch((e) => {  console.log(e); });

          } catch (err) {
            setFireErr(err);
            console.log(fireErr);
            // setLoading(false);
          }
        })
      })

      console.log(inputs);

      await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/register`, inputs);
      navigate("/login");
    } catch (err) {
      setErr(err);
      console.log(err);
    }
  };

  // console.log(inputs);
  // console.log(err);

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            <div className="pic">
              <input required style={{ display: "none" }} type="file" id="file1" name="profilePic" onChange={handleChange} />
              <label htmlFor="file1">
              <img src={Add} alt="" />
              <span>Add a profile picture</span>
              </label>
              <input required style={{ display: "none" }} type="file" id="file2" name="coverPic" onChange={handleChange} />
              <label htmlFor="file2">
              <img src={AddPic} alt="" />
              <span>Add a cover picture</span>
              </label>
            </div>
            {err && err}
            {/* loading && "Uploading the image please wait..." */}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
        <div className="right">
          <h1>Hello There.</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam
            eveniet nostrum non omnis mollitia nulla nobis similique nisi autem.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
