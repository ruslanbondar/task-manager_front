import React, { useState, useEffect } from "react";
import styles from "./SignInModal.module.css";
import { connect } from "react-redux";
import Backdrop from "../Backdrop/Backdrop";
import { onLoginClose } from "../../redux/actions/modal";
import { loginUser } from "../../redux/actions/users";
import showPassword from "../../assets/show-password.png";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const SignInModal = ({ onLoginClose, isLoginOpen, loginUser }) => {
  useEffect(() => {
    const handleEsc = e => {
      if (e.keyCode === 27) {
        onLoginClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onLoginClose]);

  const [newEmail, setNewEmail] = useState();
  const [newPassword, setNewPassword] = useState();
  const [visible, setVisible] = useState(false);

  const signInUser = () => {
    const newUser = {
      email: newEmail,
      password: newPassword
    };
    loginUser(newUser);
  };

  const submitChanges = e => {
    signInUser();
    onLoginClose();
    e.preventDefault();
  };

  return (
    <>
      <div
        className={`${styles.modal} ${isLoginOpen &&
          styles.open} ${isLoginOpen === false && styles.close}`}
      >
        <HighlightOffIcon
          fontSize="large"
          className={styles.closeButton}
          onClick={onLoginClose}
        ></HighlightOffIcon>

        <div className={styles.modalContent}>
          <form onSubmit={submitChanges} className={styles.addUserForm}>
            <input
              type="text"
              defaultValue=""
              placeholder="Email"
              className={styles.addUserInput}
              onChange={e => setNewEmail(e.target.value)}
              required
            />
            {visible ? (
              <div className={styles.passwordContainer}>
                <input
                  type="text"
                  defaultValue=""
                  placeholder="Password"
                  className={styles.addUserInput}
                  onChange={e => setNewPassword(e.target.value)}
                  required
                />

                <div className={styles.showPassword}>
                  <img
                    className={styles.showPasswordImg}
                    src={showPassword}
                    alt="show"
                    onClick={() => setVisible(false)}
                  />
                </div>
              </div>
            ) : (
              <div className={styles.passwordContainer}>
                <input
                  type="password"
                  defaultValue=""
                  placeholder="Password"
                  className={styles.addUserInput}
                  onChange={e => setNewPassword(e.target.value)}
                  required
                />

                <div className={styles.showPassword}>
                  <img
                    className={styles.showPasswordImg}
                    src={showPassword}
                    alt="show"
                    onClick={() => setVisible(true)}
                  />
                </div>
              </div>
            )}

            <input
              className={styles.addUserButton}
              type="submit"
              value="sign in"
            />
          </form>
        </div>
      </div>
      <Backdrop />
    </>
  );
};

const mapStateToProps = state => {
  return {
    isLoginOpen: state.modal.isLoginOpen
  };
};

export default connect(mapStateToProps, { onLoginClose, loginUser })(
  SignInModal
);
