import LoginForm from '../login/components/LoginForm';
import renderer from 'react-test-renderer';


describe('Page: login', () => {
  it('Render correctly', () => {
    const loginFormTree = renderer.create(<LoginForm />).toJSON();
    expect(loginFormTree).toMatchSnapshot();
  });
});