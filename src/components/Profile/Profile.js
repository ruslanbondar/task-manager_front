import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import styles from "./Profile.module.css";
import {
  updateUser,
  getLoggedInUser,
  addPhoto
} from "../../redux/actions/actions";

const Profile = ({ user, updateUser, getLoggedInUser, addPhoto }) => {
  const getLoggedInUserCallback = useCallback(() => {
    getLoggedInUser();
  }, [getLoggedInUser]);

  useEffect(() => {
    getLoggedInUserCallback();
  }, [getLoggedInUserCallback]);

  const { name, email, age } = user;

  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState();
  const [newEmail, setNewEmail] = useState();
  const [newAge, setNewAge] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    if (name || email || age) {
      setNewName(name);
      setNewEmail(email);
      setNewAge(age);
    }
  }, [name, email, age]);

  const setUpdate = () => {
    const newData = {
      name: newName,
      email: newEmail,
      age: newAge
    };
    updateUser(newData);
  };

  const setAvatar = () => {
    const newData = {
      avatar: photo
    };
    addPhoto(newData);
  };

  const onPhotoSelect = async e => {
    setPhoto(e.target.files[0]);
  };

  const submitChanges = e => {
    setEditing(false);
    setUpdate();
    setAvatar();
    e.preventDefault();
  };
  console.log(photo)

  return (
    <div className={styles.profile}>
      {localStorage["user-token"] && (
        <div className="container">
          {!editing ? (
            <div className={styles.nonEditingBlock}>
              <div className={styles.infoBlock}>
                <h3 className={styles.infoTitle}>{name}</h3>
                <h3 className={styles.infoTitle}>{age}</h3>
                <h3 className={styles.infoTitle}>{email}</h3>
              </div>
              <div className={styles.buttonBlock}>
                <button
                  className={styles.button}
                  onClick={() => setEditing(true)}
                >
                  Edit
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.editingBlock}>
              <form onSubmit={submitChanges} className={styles.userInfoForm}>
                <input
                  type="text"
                  defaultValue={newName}
                  onChange={e => setNewName(e.target.value)}
                  className={styles.userInput}
                  autoFocus
                />
                <input
                  type="text"
                  defaultValue={newAge}
                  onChange={e => setNewAge(e.target.value)}
                  className={styles.userInput}
                />
                <input
                  type="text"
                  defaultValue={newEmail}
                  onChange={e => setNewEmail(e.target.value)}
                  className={styles.userInput}
                />
                <div className={styles.buttonBlock}>
                  <input
                    type="file"
                    className={styles.avatarInput}
                    onChange={onPhotoSelect}
                  />
                  <input type="submit" value="save" className={styles.button} />
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.singleUser
  };
};

export default connect(mapStateToProps, {
  updateUser,
  getLoggedInUser,
  addPhoto
})(Profile);
