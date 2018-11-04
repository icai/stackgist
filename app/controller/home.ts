import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    if (ctx.isAuthenticated()) {
      await this.ctx.render('/index.js');
    } else {
      await this.ctx.render('/index.js');
    }
  }

  public async next() {
    await this.ctx.render('/next');
  }
}
