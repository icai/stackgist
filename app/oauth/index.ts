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
  app.passport.verify(async (ctx, user) => {
    const provider = user.provider;
    if (provider && instance[provider]) {
      user = await instance[provider].start.call(ctx, ctx, user);
    }
    if(user.isNew) {
      ctx.redirect('/user/fullinfo');
    } else {
      ctx.redirect('/');
    }
    return user;
  });
  // https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
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
