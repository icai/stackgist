import * as next from 'next';

const NEXT = Symbol('Application#next');
export default {
  get next() {
    if (!this[NEXT]) {
      this[NEXT] = next({ dir: './client', dev: true });
    }
    return this[NEXT];
  }
};
