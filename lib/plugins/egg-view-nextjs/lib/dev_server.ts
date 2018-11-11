import Base from 'sdk-base';
import * as next from 'next';

const NEXT = Symbol('Application#next');

export default class DevServer extends Base {
    app: any;
    isClosed: boolean;
  constructor(app) {
    super({
      initMethod: 'init'
    });
    this.app = app;
  }
  async init() {
    // start dev server asynchronously
    this.startAsync();
  }
  getNext() {
    if (!this[NEXT]) {
      const { config } = this as any;
      const nconfig = Object.assign({ dir: './', dev: config.env !== 'prod' }, config.nextview);
      this[NEXT] = next(nconfig);
    }
    return this[NEXT];
  }
  async startAsync() {
    this.app.next = this.getNext.bind(this.app)();
    await this.app.next.prepare();
  }
  async close() {
  }
}
