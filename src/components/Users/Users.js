import React, { useEffect, useCallback } from "react";
import styles from "./Users.module.css";

import { connect } from "react-redux";
import { getUsers } from "../../redux/actions/users";

import { withTranslation } from "react-i18next";

const Users = ({ data, getUsers, loading, t }) => {
  const getUsersCallback = useCallback(() => getUsers(), [getUsers]);

  useEffect(() => {
    getUsersCallback();
  }, [getUsersCallback]);

  return (
    <div className="container">
      <div className={styles.usersContainer}>
        {data.map(user => (
          <div className={styles.userInfo} key={user._id}>
            <div>
              <p>
                {t("users.name")}: {user.name}
              </p>
              <p>
                {t("users.age")}: {user.age}
              </p>
              <p>
                {t("users.email")}: {user.email}
              </p>
            </div>
            <div>
              <p>{user.createdAt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    data: state.users.data
  };
};

export default withTranslation()(connect(mapStateToProps, { getUsers })(Users));
