import { PureComponent } from "react";

class LoginForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMsg: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = event => {
    /**
     * change state
     */
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    let errorMsg = '';
    if (!username || !password) {
      errorMsg = 'username or password is required';
      this.setState({
        ...this.state,
        errorMsg,
      });
      return;
    }
    // call father
    const { submitForm } = this.props;
    submitForm({ username, password });
  }

  render() {
    const { username, password, errorMsg } = this.state;
    return (
      <div>        
        <form>
          <p className="error-info">{errorMsg}</p>
          <input type="text" name="username" value={username || ''} onChange={this.handleInputChange} />
          <input type="password" name="password" value={password || ''} onChange={this.handleInputChange} />
          <button className="login" onClick={this.handleSubmit}>Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
