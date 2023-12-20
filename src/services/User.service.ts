import useApi from 'src/composables/UseApi';

export default function useUserService() {
  const { get, post, put, remove, api } = useApi('user');

  const changePassword = async (id: number, payload: any) => {
    try {
      const { data } = await api.put(`user/${id}/change-password`, payload);
      return data;
    } catch (error: unknown) {
      throw error;
    }
  };

  return {
    get,
    post,
    put,
    remove,
    changePassword,
  };
}
