import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styles from "./Tasks.module.css";
import Checkbox from "@material-ui/core/Checkbox";
import { updateTask, deleteTask } from "../../../redux/actions/tasks";
import deleteIcon from "../../../assets/deleteItem.svg";
import editIcon from "../../../assets/edit.svg";

const materialStyles = {
  checkbox: {
    color: "#8bc34a"
  }
};

const Tasks = ({
  description,
  completed,
  _id,
  updateTask,
  deleteTask,
  currentPage,
  onCompleted,
  date,
  skip
}) => {
  const [editing, setEditing] = useState(false);
  const [task, setTask] = useState();

  useEffect(() => {
    if (task) {
      setTask(task);
    }
  }, [task]);

  const setUpdate = () => {
    const newData = {
      description: task
    };
    updateTask(newData, _id, currentPage, onCompleted, date, skip);
  };

  const toComplete = () => {
    const newData = {
      completed: !completed
    };
    updateTask(newData, _id, currentPage, onCompleted, date, skip);
  };

  const submitChanges = e => {
    setEditing(false);
    setUpdate();
    e.preventDefault();
  };

  return (
    <div className={styles.tasksBlock}>
      {!editing ? (
        <div className={styles.nonEditingBlock}>
          <div className={styles.checkboxBlock}>
            <Checkbox
              checked={completed}
              style={materialStyles.checkbox}
              onChange={toComplete}
            />
            <p className={`${styles.task} ${completed && styles.done}`}>
              {description}
            </p>
          </div>

          <div>
            <img
              src={editIcon}
              alt="edit"
              className={styles.editImg}
              onClick={() => setEditing(true)}
            />
          </div>
        </div>
      ) : (
        <div className={styles.editingBlock}>
          <div className={styles.formContainer}>
            <form className={styles.taskForm} onSubmit={submitChanges}>
              <input
                type="text"
                defaultValue={description}
                onChange={e => setTask(e.target.value)}
                className={styles.addInput}
                autoFocus
              />
              <input type="submit" value="save" className={styles.addButton} />
            </form>

            <div>
              <img
                src={deleteIcon}
                alt="edit"
                className={styles.deleteImg}
                onClick={() =>
                  deleteTask(_id, currentPage, onCompleted, date, skip)
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentPage: state.tasks.currentPage,
    onCompleted: state.tasks.completed,
    date: state.tasks.date,
    skip: state.tasks.skip
  };
};

export default connect(mapStateToProps, { updateTask, deleteTask })(Tasks);
