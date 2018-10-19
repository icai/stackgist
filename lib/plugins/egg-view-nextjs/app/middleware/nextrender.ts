import { parse } from 'url';

async function render(app, ctx) {
  const parsedUrl = parse(ctx.req.url, true);
  ctx.status = 200;
  const handle = app.next.getRequestHandler();
  await handle(ctx.req, ctx.res, parsedUrl);
}

export default (options, app) => {
  return async (ctx, next) => {
    const path = ctx.path;
    if (options.ignore) {
      await next();
    } else {
      if (/\/_next\//.test(path)) {
        await render(app, ctx);
      } else {
        await next();
        if (ctx.status !== 404 || ctx.method !== 'GET') {
          return;
        }
      }
    }
  };
};
