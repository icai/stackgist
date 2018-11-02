import IOAuth from './oath';

export default class Local implements IOAuth {
  async start(ctx, res) {
    const  existUser = await ctx.service.user.validateLocalCredit(res);
    return existUser;
  }
}
