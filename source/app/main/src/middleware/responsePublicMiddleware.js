import 'regenerator-runtime/runtime';

export default function responsePublicMiddleware({ dispatch, getState }) {
  return (next) => (action) => {
    if (action.public) {
      if (action.payload && typeof action.payload.then === 'function') {
        action.payload
          .then((res) => {
            return dispatch({
              type: action.success,
              params: action.params,
              payload: res,
            });
          })
          .catch((err) => {
            return dispatch({
              type: action.error,
              data: err,
            });
          });
      }
    }
    return next(action);
  };
}
