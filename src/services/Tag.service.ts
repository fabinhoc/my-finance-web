import useApi from 'src/composables/UseApi';

export default function tagService() {
  const { get, post, put, remove, all } = useApi('tags');

  return {
    get,
    post,
    put,
    remove,
    all,
  };
}
