import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import SignUpModal from "../SignUpModal/SignUpModal";
import SignInModal from "../SignInModal/SignInModal";
import AccountDialog from "../AccountDialog/AccountDialog";

import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/users";

import Alert from "@material-ui/lab/Alert";

import { withTranslation } from "react-i18next";

const Header = ({ logoutUser, alert, i18n, t }) => {
  const [accountDeleteOpen, setAccountDeleteOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  const handleAccDeleteOpen = () => {
    setAccountDeleteOpen(true);
  };

  const handleAccDeleteClose = () => {
    setAccountDeleteOpen(false);
  };

  const handleSignUpOpen = () => {
    setSignUpOpen(true);
  };

  const handleSignUpClose = () => {
    setSignUpOpen(false);
  };

  const handleSignInOpen = () => {
    setSignInOpen(true);
  };

  const handleSignInClose = () => {
    setSignInOpen(false);
  };

  return (
    <div className={styles.header}>
      <div className="container">
        <div className={styles.headerContainer}>
          <div>
            <Link to="/">
              <button
                className={`${styles.addUserButton} ${styles.homeButton}`}
              >
                {t("header.home")}
              </button>
            </Link>
            <Link to="/profile">
              {localStorage["user-token"] && (
                <button
                  className={`${styles.addUserButton} ${styles.homeButton}`}
                >
                  {t("header.profile")}
                </button>
              )}
            </Link>
          </div>

          <div
            style={
              localStorage["user-token"]
                ? { marginRight: i18n.language === "ua" && "37px" }
                : { marginRight: i18n.language === "ua" && "9px" }
            }
            className={styles.languageBlock}
          >
            <span
              className={styles.languageItem}
              style={{ fontWeight: i18n.language === "en" && "bold" }}
              onClick={() => i18n.changeLanguage("en")}
            >
              en
            </span>
            <span
              className={styles.languageItem}
              style={{ fontWeight: i18n.language === "ua" && "bold" }}
              onClick={() => i18n.changeLanguage("ua")}
            >
              ua
            </span>
          </div>

          <div>
            {localStorage["user-token"] ? (
              <div className={styles.buttonContainer}>
                <button
                  className={styles.addUserButton}
                  onClick={() => logoutUser()}
                >
                  {t("header.logout")}
                </button>
                <button
                  onClick={handleAccDeleteOpen}
                  className={styles.addUserButton}
                >
                  {t("header.deleteAcc")}
                </button>
              </div>
            ) : (
              <div className={styles.buttonContainer}>
                <button
                  className={styles.addUserButton}
                  onClick={handleSignUpOpen}
                >
                  {t("header.signUp")}
                </button>

                <button
                  className={styles.addUserButton}
                  onClick={handleSignInOpen}
                >
                  {t("header.signIn")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Alert
        variant="filled"
        severity="success"
        className={`${styles.alertWindow} ${alert && styles.alertWindowShow}`}
      >
        {t("header.alert")}
      </Alert>

      <SignUpModal open={signUpOpen} handleClose={handleSignUpClose} />
      <SignInModal open={signInOpen} handleClose={handleSignInClose} />
      <AccountDialog
        open={accountDeleteOpen}
        handleClose={handleAccDeleteClose}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.users.singleUser,
    alert: state.modal.isAlertOpen
  };
};

export default withTranslation()(
  connect(mapStateToProps, {
    logoutUser
  })(Header)
);
