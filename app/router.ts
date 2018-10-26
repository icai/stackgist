import { Application } from 'egg';

import admin from './router/admin'

export default (app: Application) => {
  const { controller, router } = app;

  // router.get('/home', controller.home.index);

  router.get('/', controller.home.index);
  router.get('/user', controller.home.index);

  router.get('/user/login', controller.user.login);
  router.get('/user/register', controller.user.register);
  router.get('/nextrender', controller.home.next);

  const weiboAuth = app.passport.authenticate('weibo');
  router.get('/passport/weibo', weiboAuth);
  router.get('/passport/weibo/callback', weiboAuth);

  // const twitterAuth = app.passport.authenticate('twitter');
  // router.get('/passport/twitter', twitterAuth);
  // router.get('/passport/twitter/callback', twitterAuth);

  const githubAuth = app.passport.authenticate('github', {
    successReturnToOrRedirect: '/'
  });
  router.get('/passport/github', githubAuth);
  router.get('/passport/github/callback', githubAuth);

  const localStrategy = app.passport.authenticate('local');
  app.router.post('/passport/local', localStrategy);
  router.get('/logout', 'user.logout');

  admin(app);
};
