import LRU from "lru-cache";
// github.com/isaacs/node-lru-cache

const options = {
    max: 500,
    length(n, key) {
      return n * 2 + key.length;
    },
    // @ts-ignore
    dispose(key, n) {
      n.close();
    },
    maxAge: 1000 * 60 * 60
  };
const cache = new LRU(options); // sets just the max size

export default cache;

// export const set = (key, value, maxAge?) => {
//     return cache.set(key, value, maxAge);
// };

// export const get = (key) => {
//   return cache.get(key);
// };
