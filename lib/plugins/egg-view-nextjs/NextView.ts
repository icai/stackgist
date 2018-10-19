export default class NextView {
  ctx: any;
  app: any;
  config: any;
  viewConfig: any;
  constructor(ctx) {
    this.ctx = ctx;
    this.app = ctx.app;
    this.viewConfig = ctx.app.config.view;
    this.config = ctx.app.config.nextview;
  }
  async render(path) {
    const name = resolveName(path, this.viewConfig);
    const ctx = this.ctx;
    ctx.respond = false;
    return await ctx.app.next.render(ctx.req, ctx.res, name, ctx.query);
  }
  // don't support renderString
  async renderString(tpl) {
    await this.render(tpl);
  }
}

function resolveName(path, config) {
  const root = config.root;
  for (const dir of root) {
    path = path.replace(dir, '');
  }
  // remove subfix
  return path.replace(/\.\w+$/, '');
}
