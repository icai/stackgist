import { Application } from 'egg';
export default (app: Application) => {
  app.beforeStart(async () => {
    // 应用会等待这个函数执行完成才启动
    await app.model.sync({ force: true }); // 开发环境使用
    // await app.model.sync({});
  });

  app.config.coreMiddleware.splice(0, 0, 'nextrender');
  app.next.prepare();
}