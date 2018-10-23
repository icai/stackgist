const status = [404, 403];

export default () => {
  return async function errorPage(ctx, next) {
    await next();
    if (status.indexOf(ctx.status) > -1 && !ctx.body) {
      const { message } = ctx;
      ctx.status = ctx.status;
      if (ctx.acceptJSON) {
        ctx.body = { error: 'Not Found' };
      } else {
        await ctx.render('/404', { error: message });
      }
    }
  };
};
