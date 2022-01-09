import { INCREASE_COUNT } from "../actions/actionType";

const initialState = {
  count: 1,
};

const reducer = (state = initialState, action) => {
  const { type, paylaod } = action;
  switch (type) {
    case INCREASE_COUNT:
      return {
        ...state,
        count: state.count + 1,
      };
    default:
      return state;
  }
};

export default reducer;
