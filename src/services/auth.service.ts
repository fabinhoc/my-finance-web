import { api } from "src/boot/axios"
import { useAuthStore } from "src/stores/auth.store"
import { LoginType } from "src/types/Login.type"
import { storeToRefs } from 'pinia'

export default function useAuthService () {
  const login = async (payload: LoginType) => {
    try {
      const { token } = storeToRefs(useAuthStore())
      const { authenticate } = useAuthStore()

      await authenticate(payload)

      api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`

      return true
    } catch (error: any) {
      throw new Error(error)
    }
  }

  const logout = async () => {
    const { logout } = useAuthStore()

    const { data } = await logout()

    if (data?.revoked) {
      api.defaults.headers.common['Authorization'] = ''
    }

    return data
  }

  return {
    login,
    logout
  }
}