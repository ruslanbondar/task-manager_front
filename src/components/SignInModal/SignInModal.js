import React, { useState, useEffect } from "react";
import styles from "./SignInModal.module.css";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import Backdrop from "../Backdrop/Backdrop";
import { onLoginClose, postUser } from "../../redux/actions/actions";

const SignInModal = ({ onLoginClose, isLoginOpen, postUser }) => {
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

  const addUser = () => {
    const newUser = {
      email: newEmail,
      password: newPassword
    };
    postUser(newUser);
  };

  const submitChanges = e => {
    addUser();
    onLoginClose();
    e.preventDefault();
  };

  return (
    <>
      <div
        className={`${styles.modal} ${isLoginOpen && styles.open} ${isLoginOpen ===
          false && styles.close}`}
      >
        <Button close className={styles.closeButton} onClick={onLoginClose} />

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
            <input
              type="text"
              defaultValue=""
              placeholder="Password"
              className={styles.addUserInput}
              onChange={e => setNewPassword(e.target.value)}
              required
            />

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
    isLoginOpen: state.isLoginOpen
  };
};

export default connect(mapStateToProps, { onLoginClose, postUser })(
  SignInModal
);
