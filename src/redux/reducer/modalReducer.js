import {
  ON_ALERT_CLOSE,
  ON_ALERT_OPEN,
  ON_LOGIN_CLOSE,
  ON_LOGIN_OPEN,
  ON_MODAL_CLOSE,
  ON_MODAL_OPEN
} from "../types/index";

const initialState = {
  isOpen: false,
  isLoginOpen: false,
  isAlertOpen: false
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ON_MODAL_OPEN:
      return {
        ...state,
        isOpen: true
      };

    case ON_MODAL_CLOSE:
      return {
        ...state,
        isOpen: false
      };

    case ON_LOGIN_OPEN:
      return {
        ...state,
        isLoginOpen: true
      };

    case ON_LOGIN_CLOSE:
      return {
        ...state,
        isLoginOpen: false
      };

    case ON_ALERT_OPEN:
      return {
        ...state,
        isAlertOpen: true
      };

    case ON_ALERT_CLOSE:
      return {
        ...state,
        isAlertOpen: false
      };

    default:
      return state;
  }
};

export default modalReducer;
