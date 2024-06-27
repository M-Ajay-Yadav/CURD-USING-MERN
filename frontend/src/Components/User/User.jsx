import React from "react";
import styles from "./User.module.css";

const ProfilePage = () => {
  const auth = localStorage.getItem("user");
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
    <div className={styles.profileContainer}>
      <img
        className={styles.profilePicture}
        src="https://lh3.googleusercontent.com/a/ACg8ocILceBghRfLt1h_yeKNVwGfVJYEU8zmc-eVfHGnPf7qOOM9jlg=s96-c"
        alt="Profile"
      />
      <h1 className={styles.userName}>
        {userName ? `${userName}` : "Shree Ram"}
      </h1>
      <p className={styles.userBio}>
        Passionate web developer with 5+ years of experience in creating dynamic
        and responsive websites. Skilled in JavaScript, React, and CSS, with a
        keen eye for detail and design. Adept at working collaboratively in
        agile environments and continuously learning new technologies. Committed
        to delivering high-quality, user-friendly web applications.
      </p>
      <div className={styles.socialLinks}>
        <a
          className={styles.socialLink}
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
        <a
          className={styles.socialLink}
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          className={styles.socialLink}
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </div>
  );
};

export default ProfilePage;
