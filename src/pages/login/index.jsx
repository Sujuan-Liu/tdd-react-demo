import React, { PureComponent } from 'react';
import { connect } from 'dva';

import LoginForm from './components/LoginForm';

import dispatchActions from './action';

@connect(({ login, loading }) => ({
  login,
  loading: loading.models.login,
}))
class LoginPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  dispatchLogin = (params) => {
    dispatchActions(this.props, params).doLogin();
  }

  render() {
    return (
      <div>
        <h1>Sign In</h1>
        <LoginForm
          submitForm={this.dispatchLogin} />
      </div>
    );
  }
};

export default LoginPage;
