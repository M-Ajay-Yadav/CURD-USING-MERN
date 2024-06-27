import React from "react";
import styles from "./Footer.module.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <h1 className={styles.heading}>Best Regards,</h1>
      <details>
        <summary className={styles.heading}>Ajay Yadav</summary>
        <h2 className={styles.heading}>MCA Student</h2>
        <h2 className={styles.heading}>Contact No :9573069748</h2>
        <h2 className={styles.heading}>
          LinkedIn :
          <a
            href="https://www.linkedin.com/in/m-ajay-yadav-8b35321a7"
            target="_blank"
          >
            View Profile
          </a>
        </h2>
      </details>
    </div>
  );
};

export default Footer;
