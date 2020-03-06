import React, { useState } from "react";
import styles from "./Home.module.css";
import { connect } from "react-redux";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
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
        <FormControl style={{width: "100px"}}>
          <InputLabel id="demo-simple-select-label">Sort</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={onCompleted}
            onChange={e => sortHandler(e.target.value)}
          >
            <MenuItem value="">Default</MenuItem>
            <MenuItem value={false}>Active</MenuItem>
            <MenuItem value={true}>Completed</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel id="demo-simple-select-label">Sort</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={date}
            onChange={e => sortByDateHandler(e.target.value)}
          >
            <MenuItem value="desc">Descending</MenuItem>
            <MenuItem value="asc">Ascending</MenuItem>
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
            label="Write your task"
            variant="outlined"
            onChange={e => setNewTask(e.target.value)}
            required
          />
          <Button
            className={styles.addButton}
            style={{ backgroundColor: "rgb(123, 223, 93)", color: "#fff" }}
            type="submit"
            variant="contained"
          >
            ADD
          </Button>
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
