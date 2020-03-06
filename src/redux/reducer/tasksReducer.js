import {
  FETCH_TASKS_FAILURE,
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  SET_CURRENT_PAGE,
  SKIP_HANDLER,
  SORT_BY_DATE_HANDLER,
  SORT_HANDLER
} from "../types/index";

const initialState = {
  error: "",
  loading: false,
  tasks: [],
  currentPage: 1,
  completed: "",
  date: "desc",
  skip: 0
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS_REQUEST:
      return {
        ...state,
        loading: true
      };

    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.data,
        loading: false
      };

    case FETCH_TASKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };

    case SORT_HANDLER:
      return {
        ...state,
        completed: action.payload
      };

    case SORT_BY_DATE_HANDLER:
      return {
        ...state,
        date: action.payload
      };

    case SKIP_HANDLER:
      return {
        ...state,
        skip: action.payload
      };

    default:
      return state;
  }
};

export default tasksReducer;
