import { PureComponent } from "react";
import { connect } from 'dva';

@connect(({ login, user, loading }) => ({
  login,
  user,
  loading: loading.models.user,
}))
class UserDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }

  static getDerivedStateFromProps(nextProps) {
    const {
      user,
    } = nextProps.login;
    const thisState = {
      username: user.username,
    };
    return thisState;
  }

  render() {
    return (
    <div>Hello~{this.state.username}~</div>
    );
  }
}

export default UserDetail;
