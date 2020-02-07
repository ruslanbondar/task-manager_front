import React from 'react';
import { connect } from 'react-redux';
import { onModalOpen } from '../../redux/actions/actions';
import styles from './Header.module.css';
import SignUpModal from "../SignUpModal/SignUpModal";

const Header = ({ onModalOpen }) => {
  return (
    <div className={styles.header}>
      <div className="container">
        <div className={styles.buttonContainer}>
          <button className={styles.addUserButton} onClick={onModalOpen}>
            Sign up
          </button>

          <button className={styles.addUserButton} onClick={onModalOpen}>
            Sign in
          </button>
        </div>
      </div>

      <SignUpModal />
    </div>
  );
};

export default connect(null, { onModalOpen })(Header);