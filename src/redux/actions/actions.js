import { userAPI } from "../../api/api";

export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";
export const FETCH_SINGLE_USER = "FETCH_SINGLE_USER";
export const ON_MODAL_OPEN = "ON_MODAL_OPEN";
export const ON_MODAL_CLOSE = "ON_MODAL_CLOSE";
export const ON_LOGIN_OPEN = "ON_LOGIN_OPEN";
export const ON_LOGIN_CLOSE = "ON_LOGIN_CLOSE";

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
      const data = await userAPI.addPhoto(newData);
      dispatch(fetchSingleUser(data));
    } catch {
      dispatch(fetchUsersFailure("Error 403"));
    }
  };
};
