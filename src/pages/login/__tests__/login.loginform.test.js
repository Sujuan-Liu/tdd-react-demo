/**
 * login form:
 *  inputs: username, password
 *  button: login, register, forget password
 */
import LoginForm from '../components/LoginForm';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })
describe('Component: LoginForm', () => {
  /**
   * on page should have
   * one title -Sign In
   * form block:
   *  inputs: username; password
   *  button: login
   * logic:
   *  username and password is required
   *  click login button, verify the account info and return the result
   *  success->to the user list page
   *  failure->show the error message(status<->messages)
   */
  it('render dom correctly', () => {
    let login = shallow(<LoginForm />);
    expect(login.find('input[name="username"]').length).toEqual(1); // one text input, name='username'
    expect(login.find('input[name="password"]').length).toEqual(1); // one password input, name='password'
    expect(login.find('button.login').text()).toEqual('Login'); // one login button
  });
  it('change form state correctly', () => {
    let login = shallow(<LoginForm />);
    /**
    * find(propJSON)
    * find('input[name="username"]') // like JQuery
    */
    const usernameInput = login.find({'name': 'username'});
    const passwordInput = login.find('input[type="password"]');
    usernameInput.simulate('change', {target: {name: 'username', value: 'admin'}});
    passwordInput.simulate('change', {target: {name: 'password', value: '123456'}});
    const username = login.state('username');
    const password = login.state('password');
    expect(username).toEqual('admin');
    expect(password).toEqual('123456');
  });

  it('submit form -> validate failed, and do nothing but show error msg', () => {
    const mockSubmitForm = jest.fn();
    let login = shallow(<LoginForm submitForm={mockSubmitForm} />);
    const mockEvent = { preventDefault: jest.fn() };
    const submitButton = login.find('button.login').at(0);
    // no username -> show message 'username is required'
    // no password -> show message 'password is required'
    // prevent submit form
    const FORM_STATE_ONLYPSD = {
      username: '',
      password: '123456',
    };
    login.setState(FORM_STATE_ONLYPSD);
    submitButton.simulate('click', mockEvent);
    expect(login.find('.error-info').text()).toEqual('username or password is required');
    const FORM_STATE_ONLYUN = {
      username: 'admin',
      password: '',
    };
    login.setState(FORM_STATE_ONLYUN);
    submitButton.simulate('click', mockEvent);
    expect(login.find('.error-info').text()).toEqual('username or password is required');
    // 都不调用父类方法
    // const submitForm = jest.fn(params => params);
    expect(mockSubmitForm).not.toHaveBeenCalled();
  });

  it('submit form -> validate success and trigger login aciton', () => {
    const mockSubmitForm = jest.fn();
    let login = shallow(<LoginForm submitForm={mockSubmitForm} />);
    const mockEvent = { preventDefault: jest.fn() };
    const submitButton = login.find('button.login').at(0);
    // 给出正确的mock login data
    const FORM_STATE = {
      username: 'admin',
      password: '123456',
    };
    login.setState(FORM_STATE);
    submitButton.simulate('click', mockEvent);    
    // 确认调用了dispatchActions方法
    expect(mockSubmitForm).toBeCalledWith(FORM_STATE);    
  });
  
});
