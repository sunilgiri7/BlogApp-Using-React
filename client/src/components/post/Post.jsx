import "./post.css";
import LoadingBar from "../../loadingbar/LoadingBar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as farHeart,
  faComment as farComment,
} from "@fortawesome/free-regular-svg-icons"; // Import empty heart and comment icons

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
      <div className="imageContainer">
        {post.photo && (
          <img
            className="imgPost"
            src={post.photo} // Change the source to Cloudinary URL
            alt=""
          />
        )}
        <div className="imageOverlay">
          <FontAwesomeIcon icon={farHeart} className="likeIcon" />
          <FontAwesomeIcon icon={farComment} className="commentIcon" />
        </div>
      </div>
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c, index) => (
            <span className="postCat" key={index}>
              {c.name}
            </span>
          ))}
        </div>
        <div className="postTitleContainer">
          {/* Like Icon */}
          <div className="likes" onClick={() => clickLikes(post)}>
            <FontAwesomeIcon
              icon={farHeart}
              className={
                post?.likes?.includes(user?._id) ? "Redlike" : "Emptylike"
              }
            />
            <span className="likes-count">{post?.likes?.length}</span>
          </div>
          {/* Like Icon */}
          {/* POST TITLE */}
          <Link to={`/post/${post._id}`} className="link">
            <span className="postTitle">{post.title}</span>
          </Link>
          {/* POST TITLE */}
          {/* Comment Icon */}
          <div className="commentIcon" onClick={()=>setCommentsIcon(!commentsIcon)}>
          <Link className="link" to={`/comment/${_id}`}><FontAwesomeIcon icon={farComment} className="commentIcon" /><span className="likes-count"><BsFillPencilFill/></span></Link>
          {/* Comment Icon */}
        </div>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}
