import defaultAvatar from "../assets/woImage.png";
import heartImg from "../assets/favorite-alt-green.svg";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="profile">
      <div className="profile-header">
        <img
          src={user?.image || defaultAvatar}
          alt="author-img"
          className="author-img"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultAvatar;
          }}
        />
        <p>{user?.username}</p>
        <button className="profile-favoriteBtn">
          <img src={heartImg} alt="heartImg" className="profile-img" />
          <span>Like</span>
        </button>
      </div>
      <div className="profile-body">
        <div className="profile-body-upper"></div>
      </div>
    </div>
  );
}

export default Profile;
