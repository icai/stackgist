import * as nextC from 'next';

const NEXT = Symbol('Application#next');
export default {
  get next() {
    if (!this[NEXT]) {
      this[NEXT] = nextC({ dir: './client', dev: true });
    }
    return this[NEXT];
  }
};
