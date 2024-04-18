import { useContext, useState } from "react";
import "./settings.css";
import axios from "axios";
import LoadingBar from "../../loadingbar/LoadingBar";
import Modal from "../../loadingbar/modal"; // Import Modal component
import { Context } from "../../context/Context";
import { Image, Transformation } from "cloudinary-react";

export default function Settings() {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false); // State for showing warning message
  const [warningMessage, setWarningMessage] = useState(""); // State for warning message content
  const [showSuccess, setShowSuccess] = useState(false); // State for showing success modal
  const [successMessage, setSuccessMessage] = useState(""); // State for success message content

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

    try {
      const updatedUser = {
        userId: user._id,
        username,
        email,
        password,
      };
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "blogapp");
        formData.append("cloud_name", "dijtsdohg");
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dijtsdohg/image/upload",
          formData
        );
        updatedUser.profilePic = res.data.secure_url;
      }

      const res = await axios.put("/users/" + user._id, updatedUser);
      setIsLoading(false);
      setSuccess(true);
      setSuccessMessage("Profile updated successfully!"); // Set success message content
      setShowSuccess(true); // Show success modal
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      setShowWarning(true); // Show warning message on failed update
      setWarningMessage("Something went wrong! Please try again."); // Set warning message content
      setIsLoading(false);
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  // Function to close success modal
  const handleCloseSuccessModal = () => {
    setShowSuccess(false);
    setSuccessMessage("");
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Your Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Change Profile Picture</label>
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

          <Modal show={showSuccess} handleClose={handleCloseSuccessModal}>
            <div className="modal-content">
              <h2>Success</h2>
              <p>{successMessage}</p>
            </div>
          </Modal>

          {/* Modal for warning message */}
          <Modal isOpen={showWarning} onClose={() => setShowWarning(false)}>
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-header">
                  <h3>Error</h3>
                </div>
                <div className="modal-body">
                  <p>{warningMessage}</p>
                </div>
                <div className="modal-footer">
                  <button
                    className="modal-btn"
                    onClick={() => setShowWarning(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </form>
      </div>
    </div>
  );
}
