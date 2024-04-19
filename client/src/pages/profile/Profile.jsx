import { useContext } from "react";
import "./profile.css";
import { Image, Transformation } from "cloudinary-react";
import { Context } from "../../context/Context";

export default function Profile() {
  const { user } = useContext(Context);

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <div className="profile-title">
          <span className="profile-title-text">{user.username}'s Profile</span>
        </div>
        <div className="profile-form">
          <div className="profile-picture-container">
            {user.profilePic ? (
              <Image
                cloudName="dijtsdohg"
                publicId={user.profilePic}
                width="200"
                height="200"
                crop="fill"
                gravity="face"
              >
                <Transformation radius="max" />
              </Image>
            ) : (
              <i className="profile-picture-icon far fa-user-circle"></i>
            )}
          </div>
          <div className="profile-details">
            <div className="profile-field">
              <label>Username</label>
              <input
                type="text"
                value={user.username}
                readOnly
                className="profile-input"
              />
            </div>
            <div className="profile-field">
              <label>Email</label>
              <input
                type="email"
                value={user.email}
                readOnly
                className="profile-input"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
