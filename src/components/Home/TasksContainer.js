import React, { useState } from "react";
import styles from "./Home.module.css";
import { connect } from "react-redux";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Tasks from "./Tasks/Tasks";
import {
  postTask,
  sortHandler,
  sortByDateHandler,
  skipHandler
} from "../../redux/actions/tasks";
import { Spinner } from "../Spinner/Spinner";

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
  loading
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
        <select
          className={styles.taskSelect}
          value={onCompleted}
          onChange={e => sortHandler(e.target.value)}
        >
          <option value="">Default</option>
          <option value={false}>Active</option>
          <option value={true}>Completed</option>
        </select>

        <select
          className={styles.taskSelect}
          value={date}
          onChange={e => sortByDateHandler(e.target.value)}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
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
          <input
            className={styles.addInput}
            type="text"
            placeholder="Write your task"
            onChange={e => setNewTask(e.target.value)}
            required
          />
          <input className={styles.addButton} type="submit" value="add" />
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

export default connect(mapStateToProps, {
  postTask,
  sortHandler,
  sortByDateHandler,
  skipHandler
})(TasksContainer);
