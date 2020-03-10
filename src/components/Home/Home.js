import React, { useEffect, useCallback } from "react";
import styles from "./Home.module.css";
import TasksContainer from "./TasksContainer";

import { connect } from "react-redux";
import { getLoggedInUser } from "../../redux/actions/users";

import { withTranslation } from "react-i18next";

const Home = ({ getLoggedInUser, user, tasks = [], t }) => {
  const { name } = user;

  const getLoggedInUserCallback = useCallback(() => {
    getLoggedInUser();
  }, [getLoggedInUser]);

  useEffect(() => {
    getLoggedInUserCallback();
  }, [getLoggedInUserCallback]);

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
          <h3 className={styles.subTitle}>{t("home.signUp")}</h3>
          <h3 className={styles.subTitle}>{t("home.signIn")}</h3>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.users.singleUser,
    tasks: state.tasks.tasks
  };
};

export default withTranslation()(
  connect(mapStateToProps, {
    getLoggedInUser
  })(Home)
);
