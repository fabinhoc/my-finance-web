import { useQuasar } from 'quasar';

export default function useNotify() {
  const $q = useQuasar();

  const success = (message: string, caption?: any, group = true) => {
    return $q.notify({
      group: group,
      type: 'positive',
      message: message,
      position: 'top',
      caption: caption,
    });
  };

  const error = (message: string) => {
    $q.notify({
      type: 'negative',
      message: message,
      position: 'top',
    });
  };

  const info = (message: string) => {
    $q.notify({
      type: 'info',
      message: message,
      position: 'top-right',
    });
  };

  const warning = (message: string) => {
    $q.notify({
      type: 'warning',
      message: message,
      position: 'top-right',
    });
  };

  return {
    success,
    error,
    info,
    warning,
  };
}
