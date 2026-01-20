import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import penIcon from "../assets/pen.svg";
import settingsIcon from "../assets/settings.svg";
import profileIcon from "../assets/profile.svg";

function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <h1>Realworld blog</h1>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/">
            <img src={penIcon} alt="new-post" />
            New Post
          </NavLink>
          <NavLink to="/">
            <img src={settingsIcon} alt="settings" />
            Settings
          </NavLink>
          <NavLink to="/">
            <img src={profileIcon} alt="profile" />
            Profile
          </NavLink>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}

export default RootLayout;
