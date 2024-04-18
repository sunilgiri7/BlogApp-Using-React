import { useContext, useRef, useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";
import LoadingBar from "../../loadingbar/LoadingBar";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <LoadingBar />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      setIsLoading(false);
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username.."
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password.."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <br />
      <p>Not Registered Yet?</p>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          REGISTER
        </Link>
      </button>
    </div>
  );
}
