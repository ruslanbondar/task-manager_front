import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { onModalOpen, onLoginOpen } from "../../redux/actions/actions";
import styles from "./Header.module.css";
import SignUpModal from "../SignUpModal/SignUpModal";
import SignInModal from "../SignInModal/SignInModal";

const Header = ({ onModalOpen, onLoginOpen }) => {
  return (
    <div className={styles.header}>
      <div className="container">
        <div className={styles.headerContainer}>
          <Link to="/">
            <button className={`${styles.addUserButton} ${styles.homeButton}`}>
              Home
            </button>
          </Link>
          <div className={styles.buttonContainer}>
            <button className={styles.addUserButton} onClick={onModalOpen}>
              Sign up
            </button>

            <button className={styles.addUserButton} onClick={onLoginOpen}>
              Sign in
            </button>
          </div>
        </div>
      </div>

      <SignUpModal />
      <SignInModal />
    </div>
  );
};

export default connect(null, { onModalOpen, onLoginOpen })(Header);
