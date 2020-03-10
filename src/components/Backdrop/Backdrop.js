import React, { useRef } from "react";
import styles from "./Backdrop.module.css";

import { connect } from "react-redux";
import { onModalClose, onLoginClose } from "../../redux/actions/modal";

const Backdrop = ({ isOpen, onModalClose, isLoginOpen, onLoginClose }) => {
  const backdropRef = useRef();

  const handleBackdropClick = e => {
    const { current } = backdropRef;

    if (current && e.target !== current) {
      return;
    }

    onModalClose();
    onLoginClose();
  };

  return (
    (isOpen || isLoginOpen) && (
      <div className={styles.backdrop} onClick={handleBackdropClick}></div>
    )
  );
};

const mapStateToProps = state => {
  return {
    isOpen: state.modal.isOpen,
    isLoginOpen: state.modal.isLoginOpen
  };
};

export default connect(mapStateToProps, { onModalClose, onLoginClose })(
  Backdrop
);
