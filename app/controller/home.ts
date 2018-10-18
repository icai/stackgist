import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    if (ctx.isAuthenticated()) {
      ctx.body = await ctx.service.posts.list();
    } else {
      ctx.session.returnTo = ctx.path;
      ctx.body = `
      <div>
        <h2>${ctx.path}</h2>
        <hr>
        Login with
        <a href="/passport/weibo">Weibo</a> | <a href="/passport/github">Github</a> |
        <a href="/passport/bitbucket">Bitbucket</a> | <a href="/passport/twitter">Twitter</a>
        <hr>
        <a href="/">Home</a> | <a href="/user">User</a>
      </div>
    `;
    }
  }
}
