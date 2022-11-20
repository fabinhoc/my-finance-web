// This is just an example,
// so you can safely delete all default props below

export default {
  failed: 'Action failed',
  success: 'Action was successful',
  app: {
    projectName: 'My Finances',
  },
  menu: {
    notebooks: 'Notebooks',
  },
  page: {
    login: {
      email: 'E-mail',
      password: 'Password',
      login: 'Login',
      forgotPassword: 'Forgot Password?',
      signUp: 'Sign Up',
    },
    signUp: {
      name: 'Name',
      email: 'E-mail',
      password: 'Password',
      passwordConfirmation: 'Password Confirm',
      register: 'Register',
      alreadyRegistered: 'Already registered?',
    },
  },
  validations: {
    required: 'This field is required',
    string: 'This field must not be a numeric value',
    number: 'This field must be numeric',
    email: 'This field must be a valid e-mail',
    minLength: {
      number: 'This field must be greater than {minLength}',
      string: 'This field must have at least {minLength} characters',
    },
    passwordConfirmation: 'Password e Password Confirmation do not match',
  },
};
