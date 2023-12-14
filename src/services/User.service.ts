import useApi from 'src/composables/UseApi';

export default function userService() {
  const { get, post, put, remove } = useApi('user');

  return {
    get,
    post,
    put,
    remove,
  };
}
