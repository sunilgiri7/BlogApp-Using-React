import "./post.css";
import LoadingBar from "../../loadingbar/LoadingBar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Post({ post }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <LoadingBar />;
  }

  return (
    <div className="post">
      {post.photo && (
        <img
          className="imgPost"
          src={post.photo} // Change the source to Cloudinary URL
          alt=""
        />
      )}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c, index) => (
            <span className="postCat" key={index}>
              {c.name}
            </span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}
