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
      {data.map(user => (
        <ul key={user._id}>
          <li>{user.name}</li>
        </ul>
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    data: state.data
  };
};

export default connect(mapStateToProps, { getUsers })(Users);
