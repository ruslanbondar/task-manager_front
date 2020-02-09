import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import styles from "./Home.module.css";
import {
  onModalOpen,
  onLoginOpen,
  getLoggedInUser
} from "../../redux/actions/actions";

const Home = ({ onModalOpen, onLoginOpen, getLoggedInUser, user }) => {
  const getLoggedInUserCallback = useCallback(() => {
    getLoggedInUser();
  }, [getLoggedInUser]);

  useEffect(() => {
    getLoggedInUserCallback();
  }, [getLoggedInUserCallback]);

  const { name } = user;

  return (
    <div className="container">
      <div className={styles.home}>
        <h1 className={styles.title}>Welcome to task manager</h1>
        <h3 className={styles.subTitle}>
          Please,{" "}
          <span onClick={onModalOpen} className={styles.underline}>
            sign up
          </span>{" "}
          to create your account
        </h3>
        <h3 className={styles.subTitle}>
          or{" "}
          <span onClick={onLoginOpen} className={styles.underline}>
            sign in
          </span>{" "}
          if you have one
        </h3>
      </div>
      <h1>{name}</h1>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.singleUser
  };
};

export default connect(mapStateToProps, { onModalOpen, onLoginOpen, getLoggedInUser })(
  Home
);
