import React, { useEffect, useCallback } from "react";
import styles from "./Users.module.css";
import { connect } from "react-redux";
import { getUsers } from "../../redux/actions/users";
import { Preloader } from "../Preloader/Preloader";

const Users = ({ data, getUsers, loading }) => {
  const getUsersCallback = useCallback(() => getUsers(), [getUsers]);

  useEffect(() => {
    getUsersCallback();
  }, [getUsersCallback]);

  return (
    <div className="container">
      {loading ? (
        <Preloader />
      ) : (
        <div className={styles.usersContainer}>
          {data.map(user => (
            <div className={styles.userInfo} key={user._id}>
              <div>
                <p>Name: {user.name}</p>
                <p>Age: {user.age}</p>
                <p>Email: {user.email}</p>
              </div>
              <div>
                <p>{user.createdAt}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    data: state.users.data,
    loading: state.users.loading
  };
};

export default connect(mapStateToProps, { getUsers })(Users);
