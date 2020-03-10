import React, { useState } from "react";
import styles from "./Home.module.css";
import Tasks from "./Tasks/Tasks";
import { Spinner } from "../Spinner/Spinner";

import { connect } from "react-redux";
import {
  postTask,
  sortHandler,
  sortByDateHandler,
  skipHandler
} from "../../redux/actions/tasks";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import { withTranslation } from "react-i18next";

const TasksContainer = ({
  postTask,
  sortHandler,
  sortByDateHandler,
  skipHandler,
  tasks,
  user,
  currentPage,
  onCompleted,
  date,
  skip,
  loading,
  t
}) => {
  const [newTask, setNewTask] = useState();
  const { _id } = user;

  const addTask = () => {
    const newData = {
      description: newTask,
      owner: _id
    };
    postTask(newData, currentPage, onCompleted, date, skip);
  };

  const submitChanges = e => {
    const form = e.target;
    addTask();
    e.preventDefault();
    form.reset();
  };

  let prev = skip - 7;
  let next = skip + 7;

  return (
    <div>
      <div className={styles.selectBlock}>
        <FormControl style={{ width: "100px" }}>
          <InputLabel id="demo-simple-select-label">
            {t("taskContainer.sort")}
          </InputLabel>
          <Select
            style={{ color: "#3e4c9c" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={onCompleted}
            onChange={e => sortHandler(e.target.value)}
          >
            <MenuItem value={""}>{t("taskContainer.default")}</MenuItem>
            <MenuItem value={false}>{t("taskContainer.active")}</MenuItem>
            <MenuItem value={true}>{t("taskContainer.completed")}</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel id="demo-simple-select-label">
            {t("taskContainer.sort")}
          </InputLabel>
          <Select
            style={{ color: "#3e4c9c" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={date}
            onChange={e => sortByDateHandler(e.target.value)}
          >
            <MenuItem value="desc">{t("taskContainer.desc")}</MenuItem>
            <MenuItem value="asc">{t("taskContainer.asc")}</MenuItem>
          </Select>
        </FormControl>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <>
          {tasks &&
            tasks.map(task => {
              return <Tasks {...task} key={task._id} />;
            })}

          <div className={styles.skipButtonsContainer}>
            {skip > 0 && (
              <ArrowBackIcon
                className={styles.prev}
                onClick={() => skipHandler(prev)}
              ></ArrowBackIcon>
            )}

            {tasks.length === 7 && (
              <ArrowForwardIcon
                className={styles.next}
                onClick={() => skipHandler(next)}
              ></ArrowForwardIcon>
            )}
          </div>
        </>
      )}

      <div className={styles.formContainer}>
        <form onSubmit={submitChanges} className={styles.taskForm}>
          <TextField
            id="outlined-basic"
            label={t("taskContainer.addTaskInput")}
            variant="outlined"
            onChange={e => setNewTask(e.target.value)}
            required
          />
          <Fab
            style={{ marginLeft: "20px" }}
            size="medium"
            color="primary"
            aria-label="add"
            type="submit"
          >
            <AddIcon />
          </Fab>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.users.singleUser,
    tasks: state.tasks.tasks,
    currentPage: state.tasks.currentPage,
    onCompleted: state.tasks.completed,
    date: state.tasks.date,
    skip: state.tasks.skip,
    loading: state.tasks.loading
  };
};

export default withTranslation()(
  connect(mapStateToProps, {
    postTask,
    sortHandler,
    sortByDateHandler,
    skipHandler
  })(TasksContainer)
);
