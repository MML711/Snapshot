import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [err, setErr] = useState(null);
  const [fireErr, setFireErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { login } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    // CHECK THIS OUT
    // MAKE SURE TO ADD THE LOGOUT FEATURE
    try {
      try {
        await signInWithEmailAndPassword(auth, inputs.email, inputs.password);
      } catch (err) {
        setFireErr(err.response);
      }

      await login(inputs);
      navigate("/")
    } catch (err) {
      console.log(err);
      setErr(err);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello There.</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam
            eveniet nostrum non omnis mollitia nulla nobis similique nisi autem.
          </p>
          <span>Don't have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
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
            { err && err }
            <Link to="/">
              <button onClick={handleLogin}>Login</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
