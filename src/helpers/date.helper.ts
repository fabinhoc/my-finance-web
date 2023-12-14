import { date } from 'quasar';

const formatDateToDB = (value: string, locale: string): any => {
  if (!value) return '';
  const dateArray = value.split('/');
  let dateString: string = value;
  if (locale === 'pt-BR') {
    dateString = `${dateArray[1]}, ${dateArray[0]}, ${dateArray[2]}`;
  }
  const dateToFormat = date.addToDate(dateString, {
    hours: new Date().getTimezoneOffset() / 60,
  });
  return date.formatDate(dateToFormat, 'YYYY-MM-DD');
};

const formatDateToText = (value: string, locale: string): any => {
  if (!value) return '';
  const dateToFormat = date.addToDate(value, {
    hours: new Date().getTimezoneOffset() / 60,
  });

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
