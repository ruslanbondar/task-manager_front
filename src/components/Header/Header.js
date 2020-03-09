import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { onModalOpen, onLoginOpen } from "../../redux/actions/modal";
import { logoutUser } from "../../redux/actions/users";
import styles from "./Header.module.css";
import SignUpModal from "../SignUpModal/SignUpModal";
import SignInModal from "../SignInModal/SignInModal";
import Alert from "@material-ui/lab/Alert";
import AccountDialog from "../AccountDialog/AccountDialog";
import { withTranslation } from "react-i18next";

const Header = ({
  onModalOpen,
  onLoginOpen,
  logoutUser,
  alert,
  i18n,
  t
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
                  onClick={handleClickOpen}
                  className={styles.addUserButton}
                >
                  {t("header.deleteAcc")}
                </button>
              </div>
            ) : (
              <div className={styles.buttonContainer}>
                <button className={styles.addUserButton} onClick={onModalOpen}>
                  {t("header.signUp")}
                </button>

                <button className={styles.addUserButton} onClick={onLoginOpen}>
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

      <SignUpModal />
      <SignInModal />
      <AccountDialog open={open} handleClose={handleClose} />
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
    onModalOpen,
    onLoginOpen,
    logoutUser
  })(Header)
);
