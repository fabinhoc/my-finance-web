import useApi from 'src/composables/UseApi';

export default function notebookService() {
  const { get, post, put, remove, all } = useApi('notebook');

  return {
    get,
    post,
    put,
    remove,
    all,
  };
}
