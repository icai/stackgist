import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/home', controller.home.index);
};
