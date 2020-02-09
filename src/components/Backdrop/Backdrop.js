import React, { useRef } from 'react';
import styles from './Backdrop.module.css';
import { connect } from 'react-redux';
import { onModalClose, onLoginClose } from '../../redux/actions/actions';

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

  return (isOpen || isLoginOpen) && <div className={styles.backdrop} onClick={handleBackdropClick}></div>;
};

const mapStateToProps = state => {
  return {
    isOpen: state.isOpen,
    isLoginOpen: state.isLoginOpen,
  };
};

export default connect(mapStateToProps, { onModalClose, onLoginClose })(Backdrop);
