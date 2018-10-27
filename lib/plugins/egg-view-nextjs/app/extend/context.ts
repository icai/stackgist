
export default {
   async nextRender(name) {
    const ctx = this as any;
    await ctx.app.next.render(ctx.req, ctx.res, name, ctx.query);
    ctx.respond = false;
   }
};
