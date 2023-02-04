import { date } from 'quasar';
import _ from 'lodash';

const email = (email: string): boolean => {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(email);
};

const required = (value: any): boolean => {
  if (typeof value === 'object') {
    return _.isEmpty(value) ? false : true;
  }
  return value && value.length > 0;
};

const number = (value: any): boolean => {
  return !isNaN(value);
};

const string = (value: any): boolean => {
  return isNaN(value);
};

const minLength = (value: any, minLength: number): boolean => {
  if (isNaN(value)) {
    return value.length >= minLength;
  }

  return value >= minLength;
};

const maxLength = (value: any, maxLength: number): boolean => {
  if (isNaN(value)) {
    return value.length <= maxLength;
  }

  return value <= maxLength;
};

const confirm = (value: any, confirmValue: any) => {
  return value === confirmValue;
};

const isValidDate = (value: any, format: string) => {
  if (!value) return false;
  const formatArray = format.split('/');
  const dateArray = value.split('/');
  let dateString: string = value;
  if (formatArray[0] === 'DD') {
    dateString = `${dateArray[1]}, ${dateArray[0]}, ${dateArray[2]}`;
  }

  return date.isValid(dateString);
};

const requiredIf = (value: any, valueCondition: any): boolean => {
  if (typeof value === 'object') {
    return _.isEmpty(value) && _.isEmpty(valueCondition) ? false : true;
  }
  return value && value.length && valueCondition && valueCondition.length > 0;
};

export default {
  email,
  required,
  number,
  string,
  minLength,
  maxLength,
  confirm,
  isValidDate,
  requiredIf,
};
