import { NavLink, Outlet, useLocation, Navigate } from "react-router-dom";
import penIcon from "../assets/pen.svg";
import settingsIcon from "../assets/settings.svg";
import profileIcon from "../assets/profile.svg";
import { useAuth } from "../context/AuthContext";

function RootLayout() {
  const { user, logout, isAuthChecked } = useAuth();
  const location = useLocation();

  const publicPath = ["/", "/sign-up", "/sign-in"];
  const isPublic = publicPath.includes(location.pathname);
  if (!isAuthChecked) {
    return null;
  }
  if (!user && !isPublic) {
    return <Navigate to="/sign-up" replace />;
  }

  return (
    <div className="root-layout">
      <header>
        <h1>Realworld blog</h1>
        <nav>
          <NavLink to="/">Home</NavLink>
          {user ? (
            <>
              <NavLink to="/new-post">
                <img src={penIcon} alt="new-post" />
                New Post
              </NavLink>
              <NavLink to="/settings">
                <img src={settingsIcon} alt="settings" />
                Settings
              </NavLink>
              <NavLink to="/profile">
                <img src={profileIcon} alt="profile" />
                {user.username}
              </NavLink>
              <button onClick={logout} className="logout">
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/sign-up">
                <img src={penIcon} alt="new-post" />
                New Post
              </NavLink>
              <NavLink to="/sign-in">
                <img src={settingsIcon} alt="settings" />
                Settings
              </NavLink>
              <NavLink to="/sign-in">Sign In</NavLink>
              <NavLink to="/sign-up">Sign Up</NavLink>
            </>
          )}
        </nav>
      </header>
      <Outlet />
    </div>
  );
}

export default RootLayout;
