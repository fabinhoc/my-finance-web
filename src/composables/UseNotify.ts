import { useQuasar } from 'quasar';

export default function useNotify() {
  const $q = useQuasar();

  const success = (message: string) => {
    $q.notify({
      type: 'positive',
      message: message,
      position: 'top',
    });
  };

  const error = (message: string) => {
    $q.notify({
      type: 'negative',
      message: message,
      position: 'top',
    });
  };

  return {
    success,
    error,
  };
}
