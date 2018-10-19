import * as next from 'next';

const NEXT = Symbol('Application#next');
export default {
  get next() {
    if (!this[NEXT]) {
      const { config } = this as any;
      const nconfig = Object.assign({ dir: './', dev: config.env !== 'prod' }, config.nextview);
      this[NEXT] = next(nconfig);
    }
    return this[NEXT];
  }
};
