import { routerRedux } from 'dva/router';
import $$ from 'cmn-utils';
import { login } from './service';

export default {
  namespace: 'login',
  state: {
    loggedIn: false,
    message: '',
    user: {},
  },
  subscriptions: {
    setup({ history }) {
      return history.listen(({ pathname }) => {
        if (pathname.indexOf('/sign/login') !== -1) {
          $$.removeStore('user');
        }
      });
    },
  },
  reducers: {
    loginSuccess(state, { payload }) {
      return {
        ...state,
        loggedIn: true,
        message: 'Congratulations',
        user: payload,
      };
    },
    loginError(state, { payload }) {
      return {
        ...state,
        loggedIn: false,
        message: payload.message,
      };
    },
    loggoutSuccess(state, { payload }) {
      return {
        ...state,
        loggedIn: false,
        message: payload.message,
      };
    },
  },
  effects: {
    /**
     * effect函数内部的处理函数：
     * call: 调用函数
     * put：发送action | put.resolve()-阻塞
     * select: 从全局state中获取数据
     * take: 事件监听 | take('click')
     * takeLatest: 事件监听
     */
    *login({ payload }, { call, put }) {
      const { code, message, data } = yield call(login, payload);
      if (code === 'success') {
        $$.setStore('user', data);
        yield put({
          type: 'loginSuccess',
          payload,
        });
        yield put(routerRedux.push('/user/detail'));
      } else {
        yield put({
          type: 'logginError',
          payload: { message },
        });
      }
    },
    *logout(_, { put }) {
      $$.removeStore('user');
      yield put({
        type: 'loggoutSuccess',
        payload: { message: 'logout success~' },
      });
      yield put(routerRedux.replace('/'));
    },
  },
};
