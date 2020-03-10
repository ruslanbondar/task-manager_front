import React, { useState, useEffect, useCallback } from "react";
import styles from "./Profile.module.css";

import { connect } from "react-redux";
import {
  updateUser,
  getLoggedInUser,
  addPhoto,
  getPhoto
} from "../../redux/actions/users";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";

import { withTranslation } from "react-i18next";

const Profile = ({
  user,
  updateUser,
  getLoggedInUser,
  addPhoto,
  getPhoto,
  t
}) => {
  const getLoggedInUserCallback = useCallback(() => {
    getLoggedInUser();
  }, [getLoggedInUser]);

  useEffect(() => {
    getLoggedInUserCallback();
    getPhoto();
  }, [getLoggedInUserCallback, getPhoto]);

  const { name, email, age, avatar } = user;
  const base64 = `data:image/jpg;base64,${avatar}`;
  const imgUrl = `http://localhost:3001/users/me/${base64}`;

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
                {user && photo && (
                  <div className={styles.imgContainer}>
                    <img className={styles.avatar} src={imgUrl} alt="avatar" />
                  </div>
                )}
              </div>
              <div className={styles.buttonBlock}>
                <Fab
                  color="secondary"
                  aria-label="edit"
                  size="large"
                  onClick={() => setEditing(true)}
                >
                  <EditIcon />
                </Fab>
              </div>
            </div>
          ) : (
            <div className={styles.editingBlock}>
              <form onSubmit={submitChanges} className={styles.userInfoForm}>
                <TextField
                  style={{ marginBottom: "20px" }}
                  id="outlined-basic"
                  label={t("signUpModal.name")}
                  defaultValue={newName}
                  variant="outlined"
                  onChange={e => setNewName(e.target.value)}
                  autoFocus
                />
                <TextField
                  style={{ marginBottom: "20px" }}
                  className={styles.userInput}
                  id="outlined-basic"
                  label={t("signUpModal.age")}
                  defaultValue={newAge}
                  variant="outlined"
                  onChange={e => setNewAge(e.target.value)}
                  autoFocus
                />
                <TextField
                  style={{ marginBottom: "20px" }}
                  className={styles.userInput}
                  id="outlined-basic"
                  label={t("signUpModal.email")}
                  defaultValue={newEmail}
                  variant="outlined"
                  onChange={e => setNewEmail(e.target.value)}
                  autoFocus
                />
                <div className={styles.buttonBlock}>
                  <input
                    type="file"
                    className={styles.avatarInput}
                    onChange={onPhotoSelect}
                  />
                  <Button
                    color="primary"
                    size="large"
                    type="submit"
                    variant="contained"
                    startIcon={<SaveIcon />}
                  >
                    {t("taskContainer.saveTaskButton")}
                  </Button>
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
    user: state.users.singleUser
  };
};

export default withTranslation()(
  connect(mapStateToProps, {
    updateUser,
    getLoggedInUser,
    addPhoto,
    getPhoto
  })(Profile)
);
