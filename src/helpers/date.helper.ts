import { date } from 'quasar';
import { Quasar } from 'quasar';

const formatDateToDB = (value: string): any => {
  const locale = Quasar.lang.isoName;
  if (!value) return '';
  const dateArray = value.split('/');
  let dateString: string = value;
  if (locale === 'pt-BR') {
    dateString = `${dateArray[1]}, ${dateArray[0]}, ${dateArray[2]}`;
  }
  const dateToFormat = new Date(dateString);

  return date.formatDate(dateToFormat, 'YYYY-MM-DD');
};

export default {
  formatDateToDB,
};
