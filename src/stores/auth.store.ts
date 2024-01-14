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
        const { post } = useApi('auth/login');
        const data = await post(payload);

        this.user = data.user;
        this.token = data.access_token;

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
        const response = await api.post('auth/logout');
        this.removeUserStore();
        return response;
      } catch (error: any | unknown) {
        throw error;
      }
    },

    async register(payload: RegisterType) {
      try {
        const { data } = await api.post('auth/register', payload);
        this.user = data.data.user;
        this.token = data.data.access_token;

        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('token', this.token);
        api.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${data.data.access_token}`;

        return data.data.user;
      } catch (error: any | unknown) {
        throw error;
      }
    },

    async setUser() {
      try {
        const { data } = await api.get(`user/${this.user.id}`);
        const user: UserType = data.data;
        this.user = user;
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error: any | unknown) {
        throw error;
      }
    },

    resendEmailVerfication() {
      try {
        return api.post('auth/email/verification-notification');
      } catch (error: any | unknown) {
        throw error;
      }
    },

    verifyEmail(url: string) {
      try {
        url = url.replace(process.env.API_URL as string, '');
        return api.get(url);
      } catch (error: unknown) {
        throw error;
      }
    },

    removeUserStore() {
      this.user = {} as UserType;
      this.token = '';
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },

    forgotPassword(payload: any) {
      try {
        return api.post('auth/forgot-password', payload);
      } catch (error: unknown) {
        throw error;
      }
    },

    resetPassword(payload: any) {
      try {
        return api.post('auth/reset-password', payload);
      } catch (error: unknown) {
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
