import { useEffect, useState } from "react";
import "./sidebar.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get(
        `https://blogapp-using-react.onrender.com/api/categories`
      );
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://th.bing.com/th/id/OIP.e3ZFB4Gynn4aYWpuhBDFWAHaEo?rs=1&pid=ImgDetMain"
          alt=""
        />
        <p className="sidebarParagraph">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac quam
          libero. Vivamus fermentum, dolor non condimentum luctus, leo justo
          condimentum odio, id hendrerit nisi justo ac mauris.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c, index) => (
            <Link to={`/?cat=${c.name}`} className="link">
              <li className="sidebarListItem" key={index}>
                {c.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}
