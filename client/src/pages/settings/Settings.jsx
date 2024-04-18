import "./settings.css";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { Image, Transformation } from "cloudinary-react";
import LoadingBar from "../../loadingbar/LoadingBar";

export default function Settings() {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <LoadingBar />;
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if required fields are empty
    if (!username || !email || !password) {
      alert("Please fill all the required fields");
      return;
    }

    setIsLoading(true);
    dispatch({ type: "UPDATE_START" });
    console.log("start");
    // Set a timeout for the request
    const timeout = setTimeout(async () => {
      setIsLoading(false);
      setSuccess(false);
      dispatch({ type: "UPDATE_FAILURE" });
      console.log("Request timed out");
    }, 10000);

    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "blogapp");
        formData.append("cloud_name", "dijtsdohg");
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dijtsdohg/image/upload",
          formData
        );
        updatedUser.profilePic = res.data.secure_url;
      } catch (err) {
        console.log(err);
      }
    }
    try {
      console.log(user._id);
      console.log(updatedUser);
      const res = await axios.put("/users/" + user._id, updatedUser);
      clearTimeout(timeout);
      setSuccess(true);
      setIsLoading(false);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      clearTimeout(timeout);
      dispatch({ type: "UPDATE_FAILURE" });
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Your Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            ) : user.photo ? (
              <Image publicId={user.photo}>
                <Transformation width="150" height="150" crop="fill" />
              </Image>
            ) : (
              <label htmlFor="fileInput">
                <i className="settingsPPIcon far fa-user-circle"></i>
              </label>
            )}
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated!!
            </span>
          )}
        </form>
      </div>
    </div>
  );
}
