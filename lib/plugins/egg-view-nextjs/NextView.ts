export default class NextView {
  ctx: any;
  app: any;
  config: any;
  viewConfig: any;
  constructor(ctx) {
    this.ctx = ctx;
    this.app = ctx.app;
    this.viewConfig = ctx.app.config.view;
    // this.config = ctx.app.config.nextview;
  }
  // https://github.com/eggjs/egg-view/blob/master/lib/context_view.js#L70
  async render(path, _exLocals = {} as any, { locals } = {} as any) {
    const name = resolveName(path, this.viewConfig) || '/';
    const ctx = this.ctx;
    ctx.status = 200;
    await ctx.app.next.render(ctx.req, ctx.res, name, { ...locals, ...ctx.query});
    ctx.respond = false;
  }
  // don't support renderString
  async renderString(tpl) {
    await this.render(tpl);
  }
}

// match normalizePagePath path
// https://github.com/zeit/next.js/blob/canary/packages/next-server/server/require.js
function resolveName(path, config) {
  const root = config.root;
  for (const dir of root) {
    path = path.replace(dir, '');
  }
  // remove subfix
  return path.replace(/(\/?index)?\.\w+$/, '');
}
