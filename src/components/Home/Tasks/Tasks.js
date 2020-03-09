import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styles from "./Tasks.module.css";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import ConfirmDialog from "../../ConfirmDialog/ConfirmDialog";
import { updateTask } from "../../../redux/actions/tasks";
import { withTranslation } from "react-i18next";

const Tasks = ({
  description,
  completed,
  _id,
  updateTask,
  currentPage,
  onCompleted,
  date,
  skip,
  t
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            <Checkbox checked={completed} onChange={toComplete} />
            <p className={`${styles.task} ${completed && styles.done}`}>
              {description}
            </p>
          </div>

          <Fab
            color="secondary"
            aria-label="edit"
            size="small"
            onClick={() => setEditing(true)}
          >
            <EditIcon />
          </Fab>
        </div>
      ) : (
        <div className={styles.editingBlock}>
          <div className={styles.formContainer}>
            <form className={styles.taskForm} onSubmit={submitChanges}>
              <TextField
                id="outlined-basic"
                label={t("taskContainer.addTaskInput")}
                defaultValue={description}
                variant="outlined"
                onChange={e => setTask(e.target.value)}
                required
                autoFocus
              />
              <Button
                className={styles.addButton}
                color="primary"
                size="large"
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
              >
                {t("taskContainer.saveTaskButton")}
              </Button>
            </form>

            <IconButton aria-label="delete" onClick={handleClickOpen}>
              <DeleteIcon fontSize="large" />
            </IconButton>
          </div>
        </div>
      )}

      <ConfirmDialog _id={_id} open={open} handleClose={handleClose} />
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

export default withTranslation()(
  connect(mapStateToProps, { updateTask })(Tasks)
);
