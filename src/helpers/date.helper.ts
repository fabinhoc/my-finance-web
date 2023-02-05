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

const formatDateToText = (value: string): any => {
  const locale = Quasar.lang.isoName;
  if (!value) return '';
  const dateToFormat = new Date(value);
  let format = 'MM/DD/YYYY';
  if (locale === 'pt-BR') {
    format = 'DD/MM/YYYY';
  }

  return date.formatDate(dateToFormat, format);
};

export default {
  formatDateToDB,
  formatDateToText,
};
