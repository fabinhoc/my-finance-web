import useApi from "src/composables/UseApi";

export default function userService () {
  const { get, post, put, remove } = useApi('users')

  return {
    get,
    post,
    put,
    remove
  }
}