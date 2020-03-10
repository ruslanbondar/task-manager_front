import React, { useEffect, useCallback } from "react";
import styles from "./Home.module.css";
import TasksContainer from "./TasksContainer";

import { connect } from "react-redux";
import { onModalOpen, onLoginOpen } from "../../redux/actions/modal";
import { getTasks } from "../../redux/actions/tasks";
import { getLoggedInUser } from "../../redux/actions/users";

import { withTranslation } from "react-i18next";

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
  t
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
          <h1 className={`${styles.title} ${styles.titleMod}`}>
            {t("home.hello")}, {name}
          </h1>
          {tasks.length ? (
            <h3 className={styles.subTitle}>{t("home.yesTasks")}</h3>
          ) : (
            <h3 className={styles.subTitle}>{t("home.noTasks")}</h3>
          )}

          <TasksContainer />
        </div>
      ) : (
        <div className={styles.home}>
          <h1 className={styles.title}>{t("home.title")}</h1>
          <h3 className={styles.subTitle}>
            <span onClick={onModalOpen} className={styles.underline}>
              {t("home.signUp")}
            </span>{" "}
            {t("home.signUpText")}
          </h3>
          <h3 className={styles.subTitle}>
            <span onClick={onLoginOpen} className={styles.underline}>
              {t("home.signIn")}
            </span>{" "}
            {t("home.signInText")}
          </h3>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.users.singleUser,
    tasks: state.tasks.tasks,
    currentPage: state.tasks.currentPage,
    onCompleted: state.tasks.completed,
    date: state.tasks.date,
    skip: state.tasks.skip
  };
};

export default withTranslation()(
  connect(mapStateToProps, {
    onModalOpen,
    onLoginOpen,
    getLoggedInUser,
    getTasks
  })(Home)
);
