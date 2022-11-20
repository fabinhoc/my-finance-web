import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import useApi from 'src/composables/UseApi';
import { LoginType } from 'src/types/Login.type';
import { RegisterType } from 'src/types/Register.type';
import { UserType } from 'src/types/User.type';

export const useAuthStore = defineStore('login', {
  state: () => ({
    user: localStorage.getItem('user')
      ? (JSON.parse(localStorage.getItem('user') as string) as UserType)
      : ({} as UserType),
    token: localStorage.getItem('token') as string,
  }),
  actions: {
    async authenticate(payload: LoginType) {
      try {
        const { post } = useApi('login');
        const user = await post(payload);

        this.user = user;
        this.token = user.token;

        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('token', this.token);
      } catch (error: unknown | any) {
        throw error;
      }
    },

    async loggedUser() {
      try {
        if (!this.user && localStorage.getItem('user')) {
          this.user = localStorage.getItem('user')
            ? (JSON.parse(localStorage.getItem('user') as string) as UserType)
            : ({} as UserType);
          this.token = this.user?.token;
        }
      } catch (error: unknown | any) {
        if (error.response.status === 401) {
          this.user = {} as UserType;
          this.token = '';

          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }

        throw error;
      }
    },

    async logout() {
      try {
        const response = await api.get('logout');
        this.user = {} as UserType;
        this.token = '';
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        return response;
      } catch (error: any | unknown) {
        throw error;
      }
    },

    async register(payload: RegisterType) {
      try {
        const user: UserType = await api.post('register', payload);
        return user;
      } catch (error: any | unknown) {
        throw error;
      }
    },
  },
  getters: {
    isLoggedIn: (state) => {
      return !!state.token;
    },
  },
});
