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
    tags: 'Tags',
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
    notebook: {
      table: {
        bills: {
          headers: {
            name: 'Name',
            description: 'Description',
            dueDate: 'Due Date',
            price: 'Price',
            actions: 'Actions',
            status: 'Status',
            totalPaid: 'Total Paid',
          },
          tooltips: {
            pending: 'Pending',
            paid: 'Paid',
            markAsPaid: 'Mark as paid',
            edit: 'Edit',
            remove: 'Delete',
          },
          total: 'Total',
          totalPaid: 'Total Pago',
        },
      },
      card: {
        bills: {
          tooltips: {
            pending: 'Pending',
            paid: 'Paid',
            markAsPaid: 'Mark as paid',
            edit: 'Edit',
            remove: 'Delete',
          },
          total: 'Total',
          totalPaid: 'Total Paid',
        },
      },
      form: {
        bills: {
          name: 'Name',
          description: 'Description',
          notebook: 'Notebook',
          price: 'Price',
          valueBill: 'Bill value',
          isPaid: 'Is paid',
          totalPrice: 'Total price',
          dueDate: 'Due date',
          tag: 'Tag',
          user: 'User',
          inputDateFormat: '##/##/####',
          inputDateMask: 'MM-DD-YYYY',
          formTitle: 'Add new bill',
          addTag: 'Add tag to bill',
          cancel: 'Cancel',
          save: 'Save',
          totalPaid: 'Total Paid',
        },
        notebook: {
          formTitle: 'Save notebook',
          name: 'Name',
          description: 'Description',
        },
        tag: {
          formTitle: 'Save tag',
          name: 'Name',
          color: 'Color',
        },
      },
      confirmText: 'Confirm',
      confirmMessage: 'Are you sure you want to delete?',
      cancel: 'Cancelar',
    },
    profile: {
      form: {
        profile: {
          name: 'Name',
          email: 'Email',
          save: 'Save',
        },
        passwordReset: {
          password: 'Password',
          confirmPassword: 'Confirm Password',
          save: 'Save',
          cancel: 'Cancel',
        },
      },
      title: 'Profile',
      description: 'Edit your profile',
      about: 'About you',
      passwordChange: 'Password change',
      account: 'Account',
      deleteAccount: 'Delete your account',
      dialogTitle: 'Delete account',
      dialogDescription:
        'When removing your account you will lose all records saved in that application.',
    },
    emailVerify: {
      title: 'Verify your email',
      message: 'We have sent you verification email {email}',
      checkIt: 'Please check it',
      notReceivedYet: "Didn't receive an email?",
      resend: 'Resend',
      backToLogin: 'Back to Login',
    },
    verify: {
      backToLogin: 'Back to Login',
    },
    forgotPassword: {
      title: 'Reset Password',
      message: 'Please, type your e-mail.',
      remember: 'Remember It?',
      signin: 'Sign in',
      form: {
        forgotPassword: {
          email: 'Email',
          reset: 'Reset',
        },
      },
    },
    resetPasswordConfirmation: {
      title: 'Recouver your password',
      message: 'We have sent you a password recouver email. Please check it.',
      emailNotSent: "Didn't receive an email?",
      resend: 'Resend',
      backToLogin: 'Back to login',
    },
    resetPassword: {
      title: 'Create new password',
      message: 'Please, type your new password.',
      save: 'Save',
      remember: 'Remember It?',
      signin: 'Sign in',
      messageSuccess:
        'Password updated with success. You are been redirecting for login page in: ',
      seconds: '{seconds} second(s)',
      formResetPassword: {
        password: 'Password',
        passwordConfirmation: 'Confirm Password',
        save: 'Save',
      },
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
    date: 'Invalid date',
  },
  months: {
    january: 'January',
    february: 'February',
    march: 'March',
    april: 'April',
    may: 'May',
    june: 'June',
    july: 'July',
    august: 'August',
    september: 'September',
    october: 'October',
    november: 'November',
    december: 'December',
  },
  notify: {
    billSaved: 'Bill saved with success!',
    billRemoved: 'Bill removed with success!',
  },
  errors: {
    network: 'Something went wrong with connection. Please, try later again.',
  },
};
