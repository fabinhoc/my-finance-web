import { api } from 'boot/axios'

export default function useApi (url: string) {
  const all = async () => {
    try {
      const { data } = await api.get(url)
      return data
    } catch (error: any | undefined) {
      throw new Error(error)
    }
  }
  
  const get = async (id: number) => {
    try {
      const { data } = await api.get(`${url}/${id}`)
      return data
    } catch (error: any | undefined) {
      throw new Error(error)
    }
  }

  const post = async (payload: any) => {
    try {
      const { data } = await api.post(url, payload)
      return data
    } catch (error: any | undefined) {
      throw new Error(error)
    }
  }

  const put = async (id: number, payload: any) => {
    try {
      const { data } = await api.put(`${url}/${id}`, payload)
      return data
    } catch (error: any | undefined) {
      throw new Error(error)
    }
  }

  const remove = async (id: number) => {
    try {
      const { data } = await api.delete(`${url}/${id}`)
      return data
    } catch (error: any | undefined) {
      throw new Error(error)
    }
  }

  return {
    all,
    get,
    post,
    put,
    remove
  }
}