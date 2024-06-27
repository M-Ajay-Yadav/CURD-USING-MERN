import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Nav.module.css";
import { GiRamProfile } from "react-icons/gi";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  let userName = "";
  try {
    console.warn("Auth:", auth);
    if (auth !== null) {
      const user = JSON.parse(auth);
      console.warn("Parsed User:", user);
      userName = user.name || "";
      console.warn("User Name:", userName);
    }
  } catch (error) {
    console.error("Error parsing user data:", error);
  }

  return (
    <div className={styles.Nav}>
      {auth ? (
        <ul className={styles["nav-ul"]}>
          <Link to="/profile">
            <GiRamProfile />
          </Link>
          <li>
            <Link to="/">Product</Link>
          </li>
          <li>
            <Link to="/add">Add product</Link>
          </li>
          <li>
            <Link to="/profile">{userName ? `${userName}` : "Shree Ram"}</Link>
          </li>
          <li>
            <Link onClick={logout} to="/login">
              Logout
            </Link>
          </li>
        </ul>
      ) : (
        <ul className={`${styles["nav-ul"]} ${styles["nav-right"]}`}>
          <li>
            <Link to="/signup">SignUp</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
