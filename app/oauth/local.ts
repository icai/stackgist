import IOAuth from './oath';

export default class Local implements IOAuth {
  async start(ctx, res) {
    const { profile } = res;
    // tslint:disable-next-line:no-debugger
    const  existUser = await ctx.service.user.validateLocalCredit(profile);
    return existUser;
  }
}
