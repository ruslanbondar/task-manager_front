import React from "react";
import { connect } from 'react-redux';
import styles from "./Home.module.css";
import { onModalOpen, onLoginOpen } from '../../redux/actions/actions';

const Home = ({ onModalOpen, onLoginOpen }) => {
  return (
    <div className="container">
      <div className={styles.home}>
        <h1 className={styles.title}>Welcome to task manager</h1>
        <h3 className={styles.subTitle}>
          Please, <span onClick={onModalOpen} className={styles.underline}>sign up</span> to create
          your account
        </h3>
        <h3 className={styles.subTitle}>
          or <span onClick={onLoginOpen} className={styles.underline}>sign in</span> if you have one
        </h3>
      </div>
    </div>
  );
};

export default connect(null, { onModalOpen, onLoginOpen })(Home);
