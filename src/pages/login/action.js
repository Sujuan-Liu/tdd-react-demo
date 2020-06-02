export default function dispatchActions(props, payload) {
  const { dispatch } = props;
  const doDispatch = (type) => {
    dispatch({
      type,
      payload,
    });
  };
  const DISPATCH_TYPES = {
    login: 'login/login',
  };

  return {
    doLogin: () => {
      doDispatch(DISPATCH_TYPES.login);
    },
  };
}
