import {
  ON_ALERT_CLOSE,
  ON_ALERT_OPEN,
  ON_LOGIN_CLOSE,
  ON_LOGIN_OPEN,
  ON_MODAL_CLOSE,
  ON_MODAL_OPEN
} from "../types/index";

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
