import IOAuth from './oath';

export default class Github implements IOAuth {
  async start(ctx, res) {
    const { profile } = res;
    let existUser = await ctx.service.user.getUserByGithubId(profile.id);
    if (!existUser) {
      existUser =  await ctx.service.user.createUserByGithubInfo(res);
    }
    return existUser;
  }
  save() {}
  callBack() {}
}
