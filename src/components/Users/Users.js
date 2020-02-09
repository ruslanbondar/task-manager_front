import React, { useEffect, useCallback } from "react";
import styles from "./Users.module.css";
import { connect } from "react-redux";
import { getUsers } from "../../redux/actions/actions";

const Users = ({ data, getUsers }) => {
  const getUsersCallback = useCallback(() => getUsers(), [getUsers]);

  useEffect(() => {
    getUsersCallback();
  }, [getUsersCallback]);

  return (
    <div className="container">
      <div className={styles.usersContainer}>
        {data.map(user => (
          <div className={styles.userInfo} key={user._id}>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>Email: {user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    data: state.data
  };
};

export default connect(mapStateToProps, { getUsers })(Users);
