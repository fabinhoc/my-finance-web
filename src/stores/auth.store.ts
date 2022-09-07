import { STATEMENT_OR_BLOCK_KEYS } from '@babel/types';
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import useApi from 'src/composables/UseApi';
import { LoginType } from "src/types/Login.type"
import { UserType } from 'src/types/User.type';

export const useAuthStore = defineStore('login', {
  state: () => ({
    user: localStorage.getItem('user') ?? JSON.parse(localStorage.getItem('user') as string) as UserType,
    token: localStorage.getItem('token') as string
  }),
  actions: {
    async authenticate (payload: LoginType) {
      try {
        const { post } = useApi('login')
        const user = await post(payload)

        this.user = user
        this.token = user.token

        localStorage.setItem('user', JSON.stringify(this.user))
        localStorage.setItem('token', this.token)
      } catch (error: any) {
        throw new Error(error)
      }
    },

    async loggedUser () {
      try {
        if (!this.user && localStorage.getItem('user')) {
          this.user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) as UserType : {} as UserType
          this.token = this.user?.token
        }

        await api.get('isLogged')
      } catch (error: any) {
        if (error.response.status === 401) {
          this.user = {} as UserType
          this.token = ''
  
          localStorage.removeItem('user')
          localStorage.removeItem('token')
        }

        throw new Error(error)
      }
    },

    async logout () {
      const response: any = await api.get('logout')

      if (response?.revoked) {
        this.user = {} as UserType
        this.token = ''

        localStorage.removeItem('user')
        localStorage.removeItem('token')
      }

      return response
    }
  },
  getters: {
    isLoggedIn: (state) => {
      return !!state.token
    }
  }
});
