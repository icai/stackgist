import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    if (ctx.isAuthenticated()) {
      await this.ctx.render('/index.tsx');
    } else {
      
      await this.ctx.render('/index.tsx');
    }
  }
}
