import Github from './github';
import Weibo from './weibo';
import Weixin from './weixin';
import QQ from './qq';
import Local from './local';

const instance = {
  github: new Github(),
  weibo: new Weibo(),
  weixin: new Weixin(),
  qq: new QQ(),
  local: new Local()
};

export default app => {
  app.passport.verify(function* (_ctx, user) {
    const provider = user.provider;
    if (provider && instance[provider]) {
      instance[provider].start(user);
    }
    // if (user.provider === 'local') {
    //   if (user.apikey === 'eggapp') {
    //     user.name = 'eggapp';
    //     user.displayName = 'my name is egg';
    //     user.photo = 'https://zos.alipayobjects.com/rmsportal/JFKAMfmPehWfhBPdCjrw.svg';
    //     user.profile = {
    //       _json: user
    //     };
    //   } else {
    //     return null;
    //   }
    // }
    return user;
  });

  app.passport.serializeUser(function* (ctx, user) {
    user.currentUrl = ctx.url;
    return user;
  });

  app.passport.deserializeUser(function* (ctx, user) {
    user.lastUrl = user.currentUrl;
    user.currentUrl = ctx.url;
    return user;
  });

};
