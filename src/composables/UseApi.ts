import { api } from 'boot/axios';

export default function useApi(url: string) {
  const all = async () => {
    try {
      const { data } = await api.get(`${url}/get/all`);
      return data.data;
    } catch (error: any | unknown) {
      throw error;
    }
  };

  const get = async (id: number) => {
    try {
      const { data } = await api.get(`${url}/${id}`);
      return data.data;
    } catch (error: any | unknown) {
      throw error;
    }
  };

  const post = async (payload: any) => {
    try {
      const { data } = await api.post(url, payload);
      return data.data;
    } catch (error: any | unknown) {
      throw error;
    }
  };

  const put = async (id: number, payload: any) => {
    try {
      const { data } = await api.put(`${url}/${id}`, payload);
      return data.data;
    } catch (error: any | unknown) {
      throw error;
    }
  };

  const remove = async (id: number) => {
    try {
      const { data } = await api.delete(`${url}/${id}`);
      return data.data;
    } catch (error: any | unknown) {
      throw error;
    }
  };

  return {
    all,
    get,
    post,
    put,
    remove,
    api,
  };
}
