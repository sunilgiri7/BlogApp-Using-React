import { useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingBar from "../../loadingbar/LoadingBar";
import Modal from "../../loadingbar/modal"; // Import Modal component

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false); // State for showing warning message
  const [warningMessage, setWarningMessage] = useState(""); // State for warning message content

  if (isLoading) {
    return <LoadingBar />;
  }

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      if (profilePic) {
        formData.append("profilePic", profilePic);
      }

      const res = await axios.post("/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsLoading(false);
      res.data && window.location.replace("/login");
    } catch (error) {
      setIsLoading(false);
      setShowWarning(true); // Show warning message on failed registration
      setWarningMessage("Something went wrong! Please try again."); // Set warning message content
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your username.."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your email.."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Enter your password.."
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Profile Picture</label>
        <input
          type="file"
          className="registerInput"
          onChange={handleFileChange}
        />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <p className="hint">Already Registered?</p>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          LOGIN
        </Link>
      </button>
      {/* Warning modal */}
      <Modal
        isOpen={showWarning}
        message={{ title: "Error", body: warningMessage }}
        onClose={() => setShowWarning(false)}
      />
    </div>
  );
}
