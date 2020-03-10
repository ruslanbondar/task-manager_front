import React from "react";

import { connect } from "react-redux";
import { deleteUser } from "../../redux/actions/users";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import { withTranslation } from "react-i18next";

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AccountDialog = ({ open, handleClose, deleteUser, t }) => {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t("confirmModal.question")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("confirmModal.text")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t("confirmModal.noButton")}
          </Button>
          <Button
            onClick={() => {
              deleteUser();
              handleClose();
            }}
            color="primary"
            autoFocus
          >
            {t("confirmModal.yesButton")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withTranslation()(connect(null, { deleteUser })(AccountDialog));
