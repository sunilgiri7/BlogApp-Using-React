import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
import LoadingBar from "../../loadingbar/LoadingBar";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(Context);

  if (isLoading) {
    return <LoadingBar />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "blogapp"); // replace with your Cloudinary upload preset
      formData.append("cloud_name", "dijtsdohg"); // replace with your Cloudinary cloud name

      try {
        setIsLoading(true);
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dijtsdohg/image/upload",
          formData
        );
        newPost.photo = res.data.secure_url;
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    }

    try {
      setIsLoading(true);
      const res = await axios.post(
        `https://blogapp-using-react.onrender.com/api/posts/`,
        newPost
      );
      setIsLoading(false);
      window.location.replace(`/post/` + res.data._id);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story"
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
