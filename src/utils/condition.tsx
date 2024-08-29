export const hasValue = (field: any) => {
  return field !== null && typeof field !== 'undefined';
};

export const isBooleanTrue = (value: any) =>
  hasValue(value) &&
  (value === 'YES' || value === 'yes' || value === 1 || value === true);

export const isValueExist = (object: any, value: any) => {
  let isExist = false;
  if (!hasObjectLength(object) || !hasValue(value)) return false;
  Object.keys(object).forEach(key => {
    if (object[key] === value) isExist = true;
  });
  return isExist;
};

export const isAllContainValue = (object: any, value: any) => {
  if (!hasObjectLength(object) || !hasValue(value)) return false;
  return Object.values(object).every(val => {
    if (val !== value) {
      return false;
    }
    return true;
  });
};

export const hasLength = (field: any) => {
  return field && field.length !== 0 && typeof field === 'object';
};

export const isArray = (fields: any) => {
  return hasValue(fields) && hasLength(fields);
};

export const isEmpty = (fields: any) => {
  return !hasValue(fields) || !hasLength(fields);
};

export const arrayData = (data: any) => {
  return !isEmpty(data) ? data : [];
};

export const hasObjectLength = (field: any) => {
  return field && Object.keys(field).length !== 0;
};

export const hasTextLength = (string: any) => {
  if (!string || !hasValue(string) || string.length === 0) {
    return false;
  }

  return true;
};
export const isFunctionExist = (func: any) => {
  return func && typeof func === 'function';
};
export const hasTextLength2 = (string: any) => {
  if (typeof string !== 'string') return false;
  if (!string || !hasValue(string) || string.length === 0) {
    return false;
  }

  return true;
};

export const hasNumber = (string: any) => {
  return /\d/.test(string);
};
