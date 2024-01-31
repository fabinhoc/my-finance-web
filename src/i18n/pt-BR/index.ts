// This is just an example,
// so you can safely delete all default props below

export default {
  failed: 'A ação falhou',
  success: 'Ação bem sucedida',
  app: {
    projectName: 'Minhas Finanças',
  },
  menu: {
    notebooks: 'Meus Cadernos',
    tags: 'Tags',
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
    notebook: {
      table: {
        bills: {
          headers: {
            name: 'Nome',
            description: 'Descrição',
            dueDate: 'Vencimento',
            price: 'Preço',
            actions: 'Ações',
            status: 'Status',
            totalPaid: 'Total Pago',
          },
          tooltips: {
            pending: 'Pendente',
            paid: 'Pago',
            markAsPaid: 'Marcar como pago',
            edit: 'Editar',
            remove: 'Excluir',
          },
        },
      },
      card: {
        bills: {
          tooltips: {
            pending: 'Pendente',
            paid: 'Pago',
            markAsPaid: 'Marcar como pago',
            edit: 'Editar',
            remove: 'Excluir',
          },
          total: 'Total',
          totalPaid: 'Total Pago',
        },
      },
      form: {
        bills: {
          name: 'Nome',
          description: 'Descrição',
          notebook: 'Caderno',
          price: 'Preço',
          valueBill: 'Valor da conta',
          isPaid: 'Pago',
          totalPrice: 'Valor total',
          dueDate: 'Vencimento',
          tag: 'Tag',
          user: 'Usuário',
          inputDateFormat: '##/##/####',
          inputDateMask: 'DD/MM/YYYY',
          formTitle: 'Adicionar nova conta',
          addTag: 'Adicionar tag à conta',
          cancel: 'Cancelar',
          save: 'Salvar',
          totalPaid: 'Valor Pago',
        },
        notebook: {
          formTitle: 'Salvar caderno',
          name: 'Nome',
          description: 'Descrição',
        },
        tag: {
          formTitle: 'Save tag',
          name: 'Name',
          color: 'Color',
        },
        duplicateBill: {
          formTitle: 'Duplicar contas',
          selectMonth: 'Duplicar para o mês',
          selectYear: 'Duplicar para o ano',
        },
      },
      confirmText: 'Confirmar ação',
      confirmMessage: 'Tem certeza de que deseja excluir?',
      cancel: 'Cancelar',
    },
    profile: {
      form: {
        profile: {
          name: 'Nome',
          email: 'E-mail',
          save: 'Salvar',
        },
        passwordReset: {
          password: 'Senha',
          confirmPassword: 'Confirmar Senha',
          save: 'Salvar',
          cancel: 'Cancelar',
        },
      },
      title: 'Perfil',
      description: 'Edita seu perfil',
      about: 'Sobre você',
      passwordChange: 'Mudar senha',
      account: 'Conta',
      deleteAccount: 'Excluir sua conta',
      dialogTitle: 'Excluir Conta',
      dialogDescription:
        'Ao excluir sua conta você perderá todos os registros salvos nesse aplicativo.',
    },
    emailVerify: {
      title: 'Verifique seu e-mail',
      message: 'Enviamos um e-mail de verificação para {email}',
      checkIt: 'Por favor, verifique seu e-mail',
      notReceivedYet: 'Não recebeu nenhum e-mail?',
      resend: 'Reenviar',
      backToLogin: 'Voltar para a página de login',
    },
    verify: {
      backToLogin: 'Voltar para a página de login',
    },
    forgotPassword: {
      title: 'Recuperar senha',
      message: 'Por favor, insira seu endereço de e-mail.',
      email: 'E-mail',
      reset: 'Enviar',
      remember: 'Lembrou a senha?',
      signin: 'Entrar',
      form: {
        forgotPassword: {
          email: 'E-mail',
          reset: 'Enviar',
        },
      },
    },
    resetPasswordConfirmation: {
      title: 'Recuperar senha',
      message:
        'Enviamos uma mensagem para seu endereço de e-mail. Por favor, verifique seu e-mail.',
      emailNotSent: 'Não recebeu nenhum e-mail?',
      resend: 'Reenviar',
      backToLogin: 'Voltar para login',
    },
    resetPassword: {
      title: 'Criar nova senha',
      message: 'Por favor, digite sua nova senha.',
      save: 'Salvar',
      remember: 'Lembrou a senha?',
      signin: 'Entrar',
      messageSuccess:
        'Senha alterada com successo. Você será redirecionado para a página de login em: ',
      seconds: '{seconds} segundos(s)',
      formResetPassword: {
        password: 'Senha',
        passwordConfirmation: 'Confirmar senha',
        save: 'Salvar',
      },
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
    date: 'Data inválida',
    minValue: 'Valor mínimo é inválido. Valor mínimo é {minValue}',
  },
  months: {
    january: 'Janeiro',
    february: 'Fevereiro',
    march: 'Março',
    april: 'Abril',
    may: 'Maio',
    june: 'Junho',
    july: 'Julho',
    august: 'Agosto',
    september: 'Setembro',
    october: 'Outubro',
    november: 'Novembro',
    december: 'Dezembro',
  },
  notify: {
    billSaved: 'Conta salva com sucesso!',
    billRemoved: 'Conta removida com sucesso!',
  },
  errors: {
    network:
      'Algo inesperado aconteceu. Por favor, tente novamente mais tarde.',
  },
};
