import './header.css'

export default function header() {
  return (
    <div className="header">
      <div className="headerTitle">
        <span className="headerTitleSm">ReactAndNode</span>
        <span className="headerTitleLg">BLOG</span>
      </div>
      <img
        className="headerImg"
        src="https://i.pinimg.com/originals/ae/41/07/ae4107956b28439588782359127047c2.jpg"
        alt=""
      />
    </div>
  );
}

