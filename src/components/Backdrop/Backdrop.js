import React, { useRef } from 'react';
import styles from './Backdrop.module.css';
import { connect } from 'react-redux';
import { onModalClose } from '../../redux/actions/actions';

const Backdrop = ({ isOpen, onModalClose }) => {
  const backdropRef = useRef();

  const handleBackdropClick = e => {
    const { current } = backdropRef;

    if (current && e.target !== current) {
      return;
    }

    onModalClose();
  };

  return isOpen && <div className={styles.backdrop} onClick={handleBackdropClick}></div>;
};

const mapStateToProps = state => {
  return {
    isOpen: state.isOpen,
  };
};

export default connect(mapStateToProps, { onModalClose })(Backdrop);
