
export default {
  //  async render(...args) {
  //    const name = args[0];
  //    if (true || /\s/.test(name)) {
  //       return this.nextRender(name);
  //    } else {
  //     return super.render(...args);
  //    }
  //  },
   async nextRender(name) {
    const ctx = this as any;
    await ctx.app.next.render(ctx.req, ctx.res, name, ctx.query);
    ctx.respond = false;
   }
};
