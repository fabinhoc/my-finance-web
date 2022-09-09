const email = (email: string): boolean => {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(email);
};

const required = (value: any): boolean => {
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

export default {
  email,
  required,
  number,
  string,
  minLength,
  maxLength,
  confirm,
};
