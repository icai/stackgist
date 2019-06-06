import NextView from './NextView';

export default app => {
  app.view.use('nextview', NextView);
  app.config.coreMiddleware.unshift('nextrender');
  app.beforeStart(async () => {
    // await app.next.prepare();
  })
};
