import React, { useState } from "react";
import styles from "./SignInModal.module.css";

import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/users";

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

const SignInModal = ({ loginUser, t, open, handleClose }) => {
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
    const form = e.target;
    signInUser();
    handleClose();
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
            {t("signUpModal.signInButton")}
          </Button>
        </form>
      </div>
    </Dialog>
  );
};

export default withTranslation()(connect(null, { loginUser })(SignInModal));
