import * as crypto from 'crypto';

export const randomString = (len) => {
  return crypto.randomBytes(Math.ceil(len / 2))
    .toString('hex')
    .slice(0, len);
};

export const rand = (min, max?) => {
  if (max == null) {
    max = min
    min = 0
  }
  return min + Math.floor(Math.random() * (max - min + 1));
};
