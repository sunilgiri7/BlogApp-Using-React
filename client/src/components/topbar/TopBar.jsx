import { useContext } from "react";
import { Context } from "../../context/Context";
import "./topbar.css";
import { Link } from "react-router-dom";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="top">
      <div className="topLeft">
        {/* Social media icons with links */}
        <a
          href="https://www.facebook.com/seun.giri.3"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="topIcon fab fa-facebook-square"></i>
        </a>
        <a
          href="https://www.instagram.com/thenameissunil7/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="topIcon fab fa-instagram-square"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/sunil-giri77/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="topIcon fab fa-linkedin"></i>
        </a>
        <a
          href="https://twitter.com/sunilgiri77"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="topIcon fab fa-twitter-square"></i>
        </a>
      </div>
      <div className="topCenter">
        {/* Navigation links */}
        <ul className="topList">
          <li className="topListItem">
            <Link to="/" className="link">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/settings" className="link">
              PROFILE
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/contact" className="link">
              CONTACT
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/write" className="link">
              WRITE
            </Link>
          </li>
          {user && (
            <li className="topListItem" onClick={handleLogout}>
              {user && "LOGOUT"}
            </li>
          )}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link className="link" to="/settings">
            <img className="topImg" src={user.profilePic} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
