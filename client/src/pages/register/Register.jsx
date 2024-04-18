import { useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState(false);

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
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
      res.data && window.location.replace("/login");
    } catch (error) {
      setError(true);
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
      {error && (
        <span style={{ color: "red", marginRight: "100px" }}>
          Something went wrong!!
        </span>
      )}
    </div>
  );
}
