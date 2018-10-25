import * as crypto from 'crypto';

export const randomString = (len) => {
  return crypto.randomBytes(Math.ceil(len / 2))
    .toString('hex')
    .slice(0, len);
};
