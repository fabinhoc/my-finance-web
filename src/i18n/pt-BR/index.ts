// This is just an example,
// so you can safely delete all default props below

export default {
  failed: 'A ação falhou',
  success: 'Ação bem sucedida',
  app: {
    projectName: 'Minhas Finanças',
  },
  menu: {
    notebook: 'Meus Cadernos',
  },
  page: {
    login: {
      email: 'E-mail',
      password: 'Senha',
      login: 'Entrar',
      forgotPassword: 'Esqueceu a senha?',
      signUp: 'Criar Conta',
    },
    signUp: {
      name: 'Nome',
      email: 'E-mail',
      password: 'Senha',
      passwordConfirmation: 'Confirme a senha',
      register: 'Criar conta',
      alreadyRegistered: 'Já está cadastrado?',
    },
  },
  validations: {
    required: 'Este campo é obrigatório',
    string: 'Este campo não pode ser numérico',
    number: 'Este campo deve ser numério',
    email: 'Este campo deve conter um e-mail válido',
    minLength: {
      number: 'Este campo deve ser pelo menos {minLength}',
      string: 'Este campo deve ter pelo menos {minLength} caracteres',
    },
    passwordConfirmation: 'Senha e confirmação de senha não conferem',
  },
};
