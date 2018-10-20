export default app => {
  const adminRouter = app.router.namespace('/admin');
  const { controller } = app;
  adminRouter.get('/', controller.admin.index)
}
