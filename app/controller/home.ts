import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    if (ctx.isAuthenticated()) {
      await this.ctx.render('/index');
      // ctx.body = await ctx.service.posts.list();
    } else {
      await this.ctx.render('/index');
    }
  }

  public async next() {
    await this.ctx.render('/next');
  }
}
