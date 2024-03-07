import './sidebar.css'

export default function Sidebar() {
    return (
      <div className="sidebar">
        <div className="sidebarItem">
          <span className="sidebarTitle">ABOUT ME</span>
          <img
            src="https://th.bing.com/th/id/OIP.e3ZFB4Gynn4aYWpuhBDFWAHaEo?rs=1&pid=ImgDetMain"
            alt=""
          />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac quam
            libero. Vivamus fermentum, dolor non condimentum luctus, leo justo
            condimentum odio, id hendrerit nisi justo ac mauris.
          </p>
        </div>
        <div className="sidebarItem">
          <span className="sidebarTitle">CATEGORIES</span>
          <ul className="sidebarList">
            <li className="sidebarListItem">Life</li>
            <li className="sidebarListItem">Music</li>
            <li className="sidebarListItem">Sport</li>
            <li className="sidebarListItem">Tech</li>
            <li className="sidebarListItem">Cinema</li>
            <li className="sidebarListItem">Style</li>
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
