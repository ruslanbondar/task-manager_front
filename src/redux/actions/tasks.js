import {
  FETCH_TASKS_FAILURE,
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  SET_CURRENT_PAGE,
  SKIP_HANDLER,
  SORT_BY_DATE_HANDLER,
  SORT_HANDLER
} from "../types/index";
import { taskAPI } from "../../api/api";

const fetchTasksRequest = () => {
  return {
    type: FETCH_TASKS_REQUEST
  };
};

const fetchTasksSuccess = data => {
  return {
    type: FETCH_TASKS_SUCCESS,
    data
  };
};

const fetchTasksFailure = error => {
  return {
    type: FETCH_TASKS_FAILURE,
    payload: error
  };
};

export const getTasks = (page, done, date, skip) => {
  return async dispatch => {
    dispatch(fetchTasksRequest());

    try {
      const data = await taskAPI.getTasks(page, done, date, skip);
      dispatch(fetchTasksSuccess(data));
    } catch {
      dispatch(fetchTasksFailure("Error 403"));
    }
  };
};

export const postTask = (newData, page, done, date, skip) => {
  return async dispatch => {
    dispatch(fetchTasksRequest());

    try {
      await taskAPI.postTask(newData);
      const data = await taskAPI.getTasks(page, done, date, skip);
      dispatch(fetchTasksSuccess(data));
    } catch {
      dispatch(fetchTasksFailure("Error 403"));
    }
  };
};

export const updateTask = (newData, id, page, done, date, skip) => {
  return async dispatch => {
    dispatch(fetchTasksRequest());

    try {
      await taskAPI.updateTask(newData, id);
      const data = await taskAPI.getTasks(page, done, date, skip);
      dispatch(fetchTasksSuccess(data));
    } catch {
      dispatch(fetchTasksFailure("Error 403"));
    }
  };
};

export const deleteTask = (id, page, done, date, skip) => {
  return async dispatch => {
    dispatch(fetchTasksRequest());

    try {
      await taskAPI.deleteTask(id);
      const data = await taskAPI.getTasks(page, done, date, skip);
      dispatch(fetchTasksSuccess(data));
    } catch {
      dispatch(fetchTasksFailure("Error 403"));
    }
  };
};

export const setCurrentPage = page => {
  return {
    type: SET_CURRENT_PAGE,
    payload: page
  };
};

export const sortHandler = event => {
  return {
    type: SORT_HANDLER,
    payload: event
  };
};
export const sortByDateHandler = event => {
  return {
    type: SORT_BY_DATE_HANDLER,
    payload: event
  };
};

export const skipHandler = event => {
  return {
    type: SKIP_HANDLER,
    payload: event
  };
};
