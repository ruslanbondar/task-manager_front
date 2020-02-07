import React, { useState, useEffect } from "react";
import styles from "./AddUserModal.module.css";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import Backdrop from "../Backdrop/Backdrop";
import { onModalClose, postUser } from "../../redux/actions/actions";

const AddUserModal = ({ onModalClose, isOpen, postUser }) => {
  useEffect(() => {
    const handleEsc = e => {
      if (e.keyCode === 27) {
        onModalClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onModalClose]);

  const [newAge, setNewAge] = useState();
  const [newName, setNewName] = useState();
  const [newEmail, setNewEmail] = useState();
  const [newPassword, setNewPassword] = useState();

  const addUser = () => {
    const newUser = {
      age: newAge,
      name: newName,
      email: newEmail,
      password: newPassword
    };
    postUser(newUser);
  };

  const submitChanges = e => {
    addUser();
    onModalClose();
    e.preventDefault();
  };

  return (
    <>
      <div
        className={`${styles.modal} ${isOpen && styles.open} ${isOpen ===
          false && styles.close}`}
      >
        <Button close className={styles.closeButton} onClick={onModalClose} />

        <div className={styles.modalContent}>
          <form onSubmit={submitChanges} className={styles.addUserForm}>
            <input
              type="text"
              defaultValue=""
              placeholder="Name"
              className={styles.addUserInput}
              onChange={e => setNewName(e.target.value)}
              required
            />
            <input
              type="text"
              defaultValue=""
              placeholder="Age"
              className={styles.addUserInput}
              onChange={e => setNewAge(e.target.value)}
            />
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
              value="add"
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
    isOpen: state.isOpen
  };
};

export default connect(mapStateToProps, { onModalClose, postUser })(
  AddUserModal
);
