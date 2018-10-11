import { Application } from 'egg';
export default (app: Application) => {
  app.config.coreMiddleware.splice(0, 0, 'nextrender');
  app.next.prepare();
}