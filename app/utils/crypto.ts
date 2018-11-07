import * as crypto from 'crypto';
// pick from
// https://github.com/node-modules/utility/blob/master/lib/crypto.js

/**
 * hash
 *
 * @param {String} method hash method, e.g.: 'md5', 'sha1'
 * @param {String|Buffer} s
 * @param {String} [format] output string format, could be 'hex' or 'base64'. default is 'hex'.
 * @return {String} md5 hash string
 * @public
 */
export const hash = (method, s, format: crypto.HexBase64Latin1Encoding = 'hex') => {
  const sum = crypto.createHash(method);
  const isBuffer = Buffer.isBuffer(s) as boolean;
  if (!isBuffer && typeof s === 'object') {
    s = JSON.stringify(sortObject(s));
  }
  sum.update(s, isBuffer ? 'ascii' : 'utf8');
  return sum.digest(format || 'hex');
};

/**
 * md5 hash
 *
 * @param {String|Buffer} s
 * @param {String} [format] output string format, could be 'hex' or 'base64'. default is 'hex'.
 * @return {String} md5 hash string
 * @public
 */
export const md5 = (s, format: crypto.HexBase64Latin1Encoding = 'hex') => {
  return hash('md5', s, format);
};

/**
 * sha1 hash
 *
 * @param {String|Buffer} s
 * @param {String} [format] output string format, could be 'hex' or 'base64'. default is 'hex'.
 * @return {String} sha1 hash string
 * @public
 */
export const sha1 = (s, format: crypto.HexBase64Latin1Encoding = 'hex') => {
  return hash('sha1', s, format);
};

/**
 * sha256 hash
 *
 * @param {String|Buffer} s
 * @param {String} [format] output string format, could be 'hex' or 'base64'. default is 'hex'.
 * @return {String} sha256 hash string
 * @public
 */
export const sha256 = (s, format: crypto.HexBase64Latin1Encoding = 'hex') => {
  return hash('sha256', s, format);
};

function sortObject(o) {
  if (!o || Array.isArray(o) || typeof o !== 'object') {
    return o;
  }
  const keys = Object.keys(o);
  keys.sort();
  const values = [] as any;
  let i = 0;
  for (; i < keys.length; i++) {
    const k = keys[i];
    values.push([k, sortObject(o[k])]);
  }
  return values;
}
