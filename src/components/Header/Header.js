import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  onModalOpen,
  onLoginOpen,
  logoutUser,
  deleteUser
} from "../../redux/actions/actions";
import styles from "./Header.module.css";
import SignUpModal from "../SignUpModal/SignUpModal";
import SignInModal from "../SignInModal/SignInModal";

const Header = ({ onModalOpen, onLoginOpen, logoutUser, deleteUser }) => {
  return (
    <div className={styles.header}>
      <div className="container">
        <div className={styles.headerContainer}>
          <div>
            <Link to="/">
              <button
                className={`${styles.addUserButton} ${styles.homeButton}`}
              >
                Home
              </button>
            </Link>
            <Link to="/profile">
              {localStorage["user-token"] && (
                <button
                  className={`${styles.addUserButton} ${styles.homeButton}`}
                >
                  Profile
                </button>
              )}
            </Link>
          </div>

          <div>
            {localStorage["user-token"] ? (
              <div className={styles.buttonContainer}>
                <button
                  className={styles.addUserButton}
                  onClick={() => logoutUser()}
                >
                  Logout
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure?")) {
                      deleteUser();
                    }
                  }}
                  className={styles.addUserButton}
                >
                  Delete account
                </button>
              </div>
            ) : (
              <div className={styles.buttonContainer}>
                <button className={styles.addUserButton} onClick={onModalOpen}>
                  Sign up
                </button>

                <button className={styles.addUserButton} onClick={onLoginOpen}>
                  Sign in
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <SignUpModal />
      <SignInModal />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.singleUser
  };
};

export default connect(mapStateToProps, {
  onModalOpen,
  onLoginOpen,
  logoutUser,
  deleteUser
})(Header);
