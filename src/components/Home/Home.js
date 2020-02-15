import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import styles from "./Home.module.css";
import TasksContainer from './TasksContainer';
import {
  onModalOpen,
  onLoginOpen,
  getLoggedInUser,
  getTasks,
} from "../../redux/actions/actions";

const Home = ({
  onModalOpen,
  onLoginOpen,
  getLoggedInUser,
  user,
  getTasks,
  tasks,
  currentPage,
  onCompleted,
  date,
  skip,
}) => {
  const { name } = user;

  const getLoggedInUserCallback = useCallback(() => {
    getLoggedInUser();
  }, [getLoggedInUser]);

  const getTasksCallback = useCallback(() => {
    getTasks(currentPage, onCompleted, date, skip);
  }, [getTasks, currentPage, onCompleted, date, skip]);

  useEffect(() => {
    getTasksCallback();
    getLoggedInUserCallback();
  }, [getLoggedInUserCallback, getTasksCallback]);

  return (
    <div className="container">
      {localStorage["user-token"] ? (
        <div className={styles.home}>
          <h1 className={styles.title}>Hello, {name}</h1>
          {tasks.length ? (
            <h3 className={styles.subTitle}>You have some tasks to do</h3>
          ) : (
            <h3 className={styles.subTitle}>
              You have no tasks in this category
            </h3>
          )}

          <TasksContainer />
        </div>
      ) : (
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
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.singleUser,
    tasks: state.tasks,
    currentPage: state.currentPage,
    onCompleted: state.completed,
    date: state.date,
    skip: state.skip
  };
};

export default connect(mapStateToProps, {
  onModalOpen,
  onLoginOpen,
  getLoggedInUser,
  getTasks,
})(Home);
