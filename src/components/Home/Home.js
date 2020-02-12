import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import styles from "./Home.module.css";
import Tasks from './Tasks/Tasks';
import {
  onModalOpen,
  onLoginOpen,
  getLoggedInUser,
  getTasks
} from "../../redux/actions/actions";

const Home = ({
  onModalOpen,
  onLoginOpen,
  getLoggedInUser,
  user,
  getTasks,
  tasks
}) => {
  const { name, _id } = user;

  const getLoggedInUserCallback = useCallback(() => {
    getLoggedInUser();
  }, [getLoggedInUser]);

  const getTasksCallback = useCallback(() => {
    getTasks(_id);
  }, [getTasks, _id]);

  useEffect(() => {
    getLoggedInUserCallback();
    getTasksCallback(_id);
  }, [getLoggedInUserCallback, getTasksCallback, _id]);

  return (
    <div className="container">
      {localStorage["user-token"] ? (
        <div className={styles.home}>
          <h1 className={styles.title}>Hello, {name}</h1>
          <h3 className={styles.subTitle}>Please, create your tasks</h3>

          <div>
            {tasks &&
              tasks.map(task => {
                return <Tasks {...task} key={task._id} />
              })}
          </div>
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
    tasks: state.tasks
  };
};

export default connect(mapStateToProps, {
  onModalOpen,
  onLoginOpen,
  getLoggedInUser,
  getTasks
})(Home);
