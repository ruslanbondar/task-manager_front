import React, { useState } from "react";
import styles from "./SignUpModal.module.css";

import { connect } from "react-redux";
import { onAlertOpen, onAlertClose } from "../../redux/actions/modal";
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
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";

import { withTranslation } from "react-i18next";

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SignUpModal = ({
  postUser,
  onAlertOpen,
  onAlertClose,
  open,
  handleClose,
  t
}) => {
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
    handleClose();
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
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <HighlightOffIcon
        fontSize="large"
        className={styles.closeButton}
        onClick={handleClose}
      ></HighlightOffIcon>

      <div className={styles.modalContent}>
        <form onSubmit={submitChanges} className={styles.addUserForm}>
          <TextField
            style={{ marginBottom: "20px", width: "100%" }}
            id="outlined-basic"
            label={t("signUpModal.name")}
            defaultValue=""
            variant="outlined"
            onChange={e => setNewName(e.target.value)}
            required
          />
          <TextField
            style={{ marginBottom: "20px", width: "100%" }}
            id="outlined-basic"
            label={t("signUpModal.age")}
            defaultValue=""
            variant="outlined"
            onChange={e => setNewAge(e.target.value)}
            required
          />
          <TextField
            style={{ marginBottom: "20px", width: "100%" }}
            id="outlined-basic"
            label={t("signUpModal.email")}
            defaultValue=""
            variant="outlined"
            onChange={e => setNewEmail(e.target.value)}
            required
          />

          <FormControl
            variant="outlined"
            style={{ marginBottom: "20px", width: "100%" }}
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
    </Dialog>
  );
};

export default withTranslation()(
  connect(null, {
    postUser,
    onAlertOpen,
    onAlertClose
  })(SignUpModal)
);
