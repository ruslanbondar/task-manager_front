import { ON_ALERT_CLOSE, ON_ALERT_OPEN } from "../types/index";

const initialState = {
  isAlertOpen: false
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
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
