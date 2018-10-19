import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  // router.get('/home', controller.home.index);

  router.get('/', controller.home.index);
  router.get('/user', controller.home.index);

  router.get('/nextrender', controller.home.nextRender);

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
  // app.get('/passport/github/callback2', app.passport.authenticate('github', function* (err, user, info, status) {
  //   console.log(err, user, info, status);
  // }));

  // router.get('/passport/localapikey', app.passport.authenticate('localapikey'));
  router.get('/logout', 'user.logout');

};
