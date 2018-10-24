import IOAuth from './oath';

export default class Github implements IOAuth {
  async start(ctx, { profile }) {

    // 存在用户 uid -> uid find user id
    //              ->(ok) -> 登录
    //              ->(fail)
    //                  |
    // 不存在 uid ->  create uid -> create user id -> (保全账号信息 , 登录)
    // const email = profile.emails && profile.emails[0] && profile.emails[0].value;
    let existUser = await ctx.service.user.getUserByGithubId(profile.id);
    if (!existUser) {
      existUser =  await ctx.service.user.createUserByGithubInfo(profile);
      existUser.isNew = true;
    } else {
      return existUser
    }
  }
  save() {}
  callBack() {}
}
