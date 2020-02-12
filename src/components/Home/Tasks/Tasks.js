import React from "react";
import { connect } from 'react-redux';
import styles from "./Tasks.module.css";
import Checkbox from "@material-ui/core/Checkbox";

const materialStyles = {
  checkbox: {
    color: "#8bc34a"
  }
};

const Tasks = ({ description, completed, _id, owner }) => {

  return (
    <div className={styles.tasksBlock}>
      <Checkbox style={materialStyles.checkbox} />
      <p className={`${styles.task} ${completed && styles.done}`}>
        {description}
      </p>
    </div>
  );
};

export default connect(null, {})(Tasks);
