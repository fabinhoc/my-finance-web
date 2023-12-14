import useApi from 'src/composables/UseApi';
import { api } from 'boot/axios';

export default function billService() {
  const { get, post, put, remove, all } = useApi('bill');
  const findByNotebookIdAndYearAndMonth = async (
    notebookId: number,
    year: number,
    month: string
  ) => {
    try {
      const { data } = await api.get(`bill/${notebookId}/${year}/${month}`);
      return data.data;
    } catch (error: any | unknown) {
      throw error;
    }
  };

  return {
    get,
    post,
    put,
    remove,
    all,
    findByNotebookIdAndYearAndMonth,
  };
}
