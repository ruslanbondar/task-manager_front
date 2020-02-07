import React, { useEffect, useCallback } from "react";
import styles from "./Users.module.css";
import { connect } from "react-redux";
import { getUsers, onModalOpen } from "../../redux/actions/actions";
import AddUserModal from '../AddUserModal/AddUserModal';

const Users = ({ data, getUsers, onModalOpen }) => {
  const getUsersCallback = useCallback(() => getUsers(), [getUsers]);

  useEffect(() => {
    getUsersCallback();
  }, [getUsersCallback]);

  return (
    <div className="container">
      <button className={styles.addUserButton} onClick={onModalOpen}>Add User</button>

      {data.map(user => (
        <div key={user._id}>
          <p>name: {user.name}</p>
          {/* <p>age: {user.age}</p> */}
        </div>
      ))}

      <AddUserModal />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    data: state.data
  };
};

export default connect(mapStateToProps, { getUsers, onModalOpen })(Users);
