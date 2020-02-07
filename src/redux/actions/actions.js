import { userAPI } from "../../api/api";

export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";
export const ON_MODAL_OPEN = 'ON_MODAL_OPEN';
export const ON_MODAL_CLOSE = 'ON_MODAL_CLOSE';

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
