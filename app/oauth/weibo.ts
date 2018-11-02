import IOAuth from './oath';

export default class Weibo implements IOAuth {
  async start(ctx, res) {
    const { profile } = res;
    let existUser = await ctx.service.user.getUserByWeiboId(profile.id);
    if (!existUser) {
      existUser =  await ctx.service.user.createUserByWeiboInfo(res);
    }
    return existUser;
  }
}
