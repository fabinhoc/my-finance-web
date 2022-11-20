import { api } from 'src/boot/axios';
import { useAuthStore } from 'src/stores/auth.store';
import { LoginType } from 'src/types/Login.type';
import { storeToRefs } from 'pinia';
import { RegisterType } from 'src/types/Register.type';
import { UserType } from 'src/types/User.type';

export default function useAuthService() {
  const login = async (payload: LoginType) => {
    try {
      const { token } = storeToRefs(useAuthStore());
      const { authenticate } = useAuthStore();
      await authenticate(payload);
      api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;

      return true;
    } catch (error: any) {
      throw error;
    }
  };

  const logout = async () => {
    const { logout } = useAuthStore();
    const { data } = await logout();
    api.defaults.headers.common['Authorization'] = '';

    return data;
  };

  const register = async (payload: RegisterType) => {
    const { register } = useAuthStore();

    const user: UserType = await register(payload);

    return user;
  };

  return {
    login,
    logout,
    register,
  };
}
