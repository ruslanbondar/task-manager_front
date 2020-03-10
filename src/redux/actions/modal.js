import { ON_ALERT_CLOSE, ON_ALERT_OPEN } from "../types/index";

export const onAlertOpen = () => {
  return {
    type: ON_ALERT_OPEN
  };
};

export const asyncAlertClose = () => {
  return {
    type: ON_ALERT_CLOSE
  };
};

export const onAlertClose = () => {
  return dispatch => {
    setTimeout(() => {
      dispatch(asyncAlertClose());
    }, 3000);
  };
};
