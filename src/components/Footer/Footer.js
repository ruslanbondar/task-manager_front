import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className="container">
        <div className={styles.rightsContainer}>
          <span className={styles.rights}>
            © 2020 BEETROOT ACADEMY, ALL RIGHTS RESERVED
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
