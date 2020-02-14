import React, { useEffect, useCallback, useState } from "react";
import { Link, Route } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./Home.module.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Tasks from "./Tasks/Tasks";
import {
  onModalOpen,
  onLoginOpen,
  getLoggedInUser,
  getTasks,
  postTask,
  sortHandler,
  sortByDateHandler,
  skipHandler
} from "../../redux/actions/actions";

const Home = ({
  onModalOpen,
  onLoginOpen,
  getLoggedInUser,
  user,
  getTasks,
  tasks,
  postTask,
  currentPage,
  onCompleted,
  sortHandler,
  date,
  sortByDateHandler,
  skip,
  skipHandler
}) => {
  const { name, _id } = user;

  const getLoggedInUserCallback = useCallback(() => {
    getLoggedInUser();
  }, [getLoggedInUser]);

  const getTasksCallback = useCallback(() => {
    getTasks(currentPage, onCompleted, date, skip);
  }, [getTasks, currentPage, onCompleted, date, skip]);

  useEffect(() => {
    getLoggedInUserCallback();
    getTasksCallback();
  }, [getLoggedInUserCallback, getTasksCallback]);

  const [newTask, setNewTask] = useState();

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
    <div className="container">
      {localStorage["user-token"] ? (
        <div className={styles.home}>
          <h1 className={styles.title}>Hello, {name}</h1>
          {tasks.length ? (
            <h3 className={styles.subTitle}>You have some tasks to do</h3>
          ) : (
            <h3 className={styles.subTitle}>
              You have no tasks in this category
            </h3>
          )}

          <Link to="/">
            <button>get started</button>
          </Link>

          <div>
            <Route
              path="/"
              render={() => {
                return (
                  <>
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
                );
              }}
            />

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
        </div>
      ) : (
        <div className={styles.home}>
          <h1 className={styles.title}>Welcome to task manager</h1>
          <h3 className={styles.subTitle}>
            Please,{" "}
            <span onClick={onModalOpen} className={styles.underline}>
              sign up
            </span>{" "}
            to create your account
          </h3>
          <h3 className={styles.subTitle}>
            or{" "}
            <span onClick={onLoginOpen} className={styles.underline}>
              sign in
            </span>{" "}
            if you have one
          </h3>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.singleUser,
    tasks: state.tasks,
    currentPage: state.currentPage,
    onCompleted: state.completed,
    date: state.date,
    skip: state.skip
  };
};

export default connect(mapStateToProps, {
  onModalOpen,
  onLoginOpen,
  getLoggedInUser,
  getTasks,
  postTask,
  sortHandler,
  sortByDateHandler,
  skipHandler
})(Home);
