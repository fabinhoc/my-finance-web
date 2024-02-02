import useApi from 'src/composables/UseApi';
import { api } from 'boot/axios';
import { DuplicateBillType } from 'src/types/DuplicateBill.type';

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

  const duplicateBill = async (payload: DuplicateBillType) => {
    try {
      const { data } = await api.post('bill/duplicate', payload);
      return data.data;
    } catch (error: any | unknown) {
      throw error;
    }
  };

  const destroyMany = async (
    notebookId: number,
    year: number,
    month: string
  ) => {
    try {
      const { data } = await api.delete(
        `bill/delete/${notebookId}/${year}/${month}`
      );
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
    duplicateBill,
    destroyMany,
  };
}
