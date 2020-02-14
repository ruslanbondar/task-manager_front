import { userAPI } from "../../api/api";
import { taskAPI } from "../../api/api";

export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";
export const FETCH_SINGLE_USER = "FETCH_SINGLE_USER";
export const ON_MODAL_OPEN = "ON_MODAL_OPEN";
export const ON_MODAL_CLOSE = "ON_MODAL_CLOSE";
export const ON_LOGIN_OPEN = "ON_LOGIN_OPEN";
export const ON_LOGIN_CLOSE = "ON_LOGIN_CLOSE";
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SORT_HANDLER = 'SORT_HANDLER';
export const SKIP_HANDLER = 'SKIP_HANDLER';
export const SORT_BY_DATE_HANDLER = 'SORT_BY_DATE_HANDLER';

export const onModalOpen = () => {
  return {
    type: ON_MODAL_OPEN
  };
};

export const onModalClose = () => {
  return {
    type: ON_MODAL_CLOSE
  };
};

export const onLoginOpen = () => {
  return {
    type: ON_LOGIN_OPEN
  };
};

export const onLoginClose = () => {
  return {
    type: ON_LOGIN_CLOSE
  };
};

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST
  };
};

const fetchUsersSuccess = data => {
  return {
    type: FETCH_USERS_SUCCESS,
    data
  };
};

const fetchSingleUser = data => {
  return {
    type: FETCH_SINGLE_USER,
    data
  };
};

const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error
  };
};

export const getUsers = () => {
  return async dispatch => {
    dispatch(fetchUsersRequest());

    try {
      const data = await userAPI.getUsers();
      dispatch(fetchUsersSuccess(data));
    } catch {
      dispatch(fetchUsersFailure("Error 403"));
    }
  };
};

export const getLoggedInUser = () => {
  return async dispatch => {
    dispatch(fetchUsersRequest());

    try {
      const data = await userAPI.getLoggedInUser();
      dispatch(fetchSingleUser(data));
    } catch {
      dispatch(fetchUsersFailure("Error 403"));
    }
  };
};

export const postUser = newUser => {
  return async dispatch => {
    dispatch(fetchUsersRequest());

    try {
      await userAPI.postUser(newUser);
      const data = await userAPI.getUsers();
      dispatch(fetchUsersSuccess(data));
    } catch {
      dispatch(fetchUsersFailure("Error 403"));
    }
  };
};

export const loginUser = newUser => {
  return async dispatch => {
    dispatch(fetchUsersRequest());

    try {
      await userAPI.loginUser(newUser);
      const data = await userAPI.getLoggedInUser();
      dispatch(fetchSingleUser(data));
    } catch {
      dispatch(fetchUsersFailure("Error 403"));
    }
  };
};

export const logoutUser = () => {
  return async dispatch => {
    dispatch(fetchUsersRequest());

    try {
      const data = await userAPI.logoutUser();
      dispatch(fetchSingleUser(data));
    } catch {
      dispatch(fetchUsersFailure("Error 403"));
    }
  };
};

export const updateUser = (newData) => {
  return async dispatch => {
    dispatch(fetchUsersRequest());

    try {
      const data = await userAPI.updateUser(newData);
      dispatch(fetchSingleUser(data));
    } catch {
      dispatch(fetchUsersFailure("Error 403"));
    }
  };
};

export const deleteUser = () => {
  return async dispatch => {
    dispatch(fetchUsersRequest());

    try {
      const data = await userAPI.deleteUser();
      dispatch(fetchSingleUser(data));
    } catch {
      dispatch(fetchUsersFailure("Error 403"));
    }
  };
};

export const addPhoto = (newData) => {
  return async dispatch => {
    dispatch(fetchUsersRequest());

    try {
      await userAPI.addPhoto(newData);
      // await userAPI.getPhoto();
      const data = await userAPI.getLoggedInUser();
      dispatch(fetchSingleUser(data));
    } catch {
      dispatch(fetchUsersFailure("Error 403"));
    }
  };
};

export const getPhoto = () => {
  return async dispatch => {
    dispatch(fetchUsersRequest());

    try {
      await userAPI.getPhoto();
      const data = await userAPI.getLoggedInUser();
      dispatch(fetchSingleUser(data));
    } catch {
      dispatch(fetchUsersFailure("Error 403"));
    }
  };
};



// ************************tasks*******************************


export const FETCH_TASKS_REQUEST = "FETCH_TASKS_REQUEST";
export const FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS";
export const FETCH_TASKS_FAILURE = "FETCH_TASKS_FAILURE";

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
    payload: page,
  };
};

export const sortHandler = event => {
  return {
    type: SORT_HANDLER,
    payload: event,
  };
};
export const sortByDateHandler = event => {
  return {
    type: SORT_BY_DATE_HANDLER,
    payload: event,
  };
};

export const skipHandler = event => {
  return {
    type: SKIP_HANDLER,
    payload: event,
  };
}
