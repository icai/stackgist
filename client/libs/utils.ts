export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const typeOf = obj => {
  return Object.prototype.toString
    .call(obj)
    .slice(8, -1)
    .toLowerCase();
};

export const isObject = obj => {
  return typeOf(obj) === 'object';
};

export const isEmptyObject = obj => {
  let name;
  // tslint:disable-next-line:forin
  for (name in obj) {
    return false;
  }
  return true;
};

export const isServer = typeof window === 'undefined';

export const getEnv = () => {
  if (typeof window === 'undefined') {
    return 'SERVER';
  } else {
    return 'WEB';
  }
};

export const uniq = x => [...new Set(x)];

export const inArray = (str, arr) => {
  return arr.indexOf(str);
};

export const trim = v => {
  const re = /^\s+|\s+$/g;
  return v.replace(re, '');
};
