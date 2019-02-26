export const store = (state = {}, action) => {
  switch (action.type) {
    case '':
      return { ...state, ...{ newProp: '' } };
    default:
      return state;
  }
};
