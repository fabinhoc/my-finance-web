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
};
