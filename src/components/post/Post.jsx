import './post.css';

export default function Post() {
  return (
    <div className="post">
      <img
        className="imgPost"
        src="https://images.squarespace-cdn.com/content/v1/5aee2382f93fd4603e621996/1530883337137-72P1R42DRUHHKBMH7Y8O/Lake+Bled+Slovenia+DJI+Drone+Aerial+View.jpg"
        alt=""
      />
      <div className="postInfo">
        <div className="postCats">
          <span className="postCat">Music</span>
          <span className="postCat">Life</span>
        </div>
        <span className="postTitle">Lorem ipsum is a random raw data</span>
        <hr />
        <span className="postDate">1 hour ago</span>
      </div>
      <p className="postDesc">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac quam
        libero. Vivamus fermentum, dolor non condimentum luctus, leo justo
        condimentum odio, id hendrerit nisi justo ac mauris. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Sed ac quam libero. Vivamus
        fermentum, dolor non condimentum luctus, leo justo condimentum odio, id
        hendrerit nisi justo ac mauris. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Sed ac quam libero. Vivamus fermentum, dolor non
        condimentum luctus, leo justo condimentum odio, id hendrerit nisi justo
        ac mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
        ac quam libero. Vivamus fermentum, dolor non condimentum luctus, leo
        justo condimentum odio, id hendrerit nisi justo ac mauris.
      </p>
    </div>
  );
}
