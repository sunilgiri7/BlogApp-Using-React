import { useContext, useRef, useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";
import LoadingBar from "../../loadingbar/LoadingBar";
import Modal from "../../loadingbar/modal"; // Import Modal component

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false); // State for showing warning message
  const [warningMessage, setWarningMessage] = useState(""); // State for warning message content

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
      setShowWarning(false); // Hide warning message on successful login
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      setIsLoading(false);
      setShowWarning(true); // Show warning message on failed login
      setWarningMessage("Invalid username or password. Please try again.");
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

      {/* Warning modal */}
      <Modal
        isOpen={showWarning}
        message={{ title: "Warning", body: warningMessage }}
        onClose={() => setShowWarning(false)}
      />
    </div>
  );
}
