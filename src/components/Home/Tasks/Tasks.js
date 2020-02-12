import React, { useState } from "react";
import { connect } from 'react-redux';
import styles from "./Tasks.module.css";
import Checkbox from "@material-ui/core/Checkbox";
import { postTask } from '../../../redux/actions/actions';

const materialStyles = {
  checkbox: {
    color: "#8bc34a"
  }
};

const Tasks = ({ description, completed, _id, owner, postTask }) => {
  const [newTask, setNewTask] = useState();

  return (
    <div className={styles.tasksBlock}>
      <Checkbox style={materialStyles.checkbox} />
      <p className={`${styles.task} ${completed && styles.done}`}>
        {description}
      </p>
    </div>
  );
};

export default connect(null, { postTask })(Tasks);
