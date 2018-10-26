export default () => {
  return async function locals(ctx, next) {
    const { app } = ctx;
    ctx.locals.config = app.config;
    ctx.locals.csrf = ctx.csrf;
    await next();
  };
};
