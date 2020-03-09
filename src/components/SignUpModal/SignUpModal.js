import React, { useState, useEffect } from "react";
import styles from "./SignUpModal.module.css";
import { connect } from "react-redux";
import Backdrop from "../Backdrop/Backdrop";
import {
  onModalClose,
  onAlertOpen,
  onAlertClose
} from "../../redux/actions/modal";
import { postUser } from "../../redux/actions/users";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { withTranslation } from "react-i18next";

const SignUpModal = ({
  onModalClose,
  isOpen,
  postUser,
  onAlertOpen,
  onAlertClose,
  t
}) => {
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
  const [visible, setVisible] = useState(false);

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
    const form = e.target;
    addUser();
    onModalClose();
    onAlertOpen();
    onAlertClose();
    e.preventDefault();
    form.reset();
  };

  const handleClickShowPassword = () => {
    setVisible(!visible);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <>
      <div
        className={`${styles.modal} ${isOpen && styles.open} ${isOpen ===
          false && styles.close}`}
      >
        <HighlightOffIcon
          fontSize="large"
          className={styles.closeButton}
          onClick={onModalClose}
        ></HighlightOffIcon>

        <div className={styles.modalContent}>
          <form onSubmit={submitChanges} className={styles.addUserForm}>
            <TextField
              style={{ marginBottom: "20px", width: "70%" }}
              id="outlined-basic"
              label={t("signUpModal.name")}
              defaultValue=""
              variant="outlined"
              onChange={e => setNewName(e.target.value)}
              required
            />
            <TextField
              style={{ marginBottom: "20px", width: "70%" }}
              id="outlined-basic"
              label={t("signUpModal.age")}
              defaultValue=""
              variant="outlined"
              onChange={e => setNewAge(e.target.value)}
              required
            />
            <TextField
              style={{ marginBottom: "20px", width: "70%" }}
              id="outlined-basic"
              label={t("signUpModal.email")}
              defaultValue=""
              variant="outlined"
              onChange={e => setNewEmail(e.target.value)}
              required
            />

            <FormControl
              variant="outlined"
              style={{ marginBottom: "20px", width: "70%" }}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                {t("signUpModal.password")}
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={visible ? "text" : "password"}
                defaultValue=""
                onChange={e => setNewPassword(e.target.value)}
                required
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {visible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>

            <Button type="submit" variant="contained" color="primary">
              {t("signUpModal.signUpButton")}
            </Button>
          </form>
        </div>
      </div>
      <Backdrop />
    </>
  );
};

const mapStateToProps = state => {
  return {
    isOpen: state.modal.isOpen
  };
};

export default withTranslation()(
  connect(mapStateToProps, {
    onModalClose,
    postUser,
    onAlertOpen,
    onAlertClose
  })(SignUpModal)
);
