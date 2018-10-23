import { Controller } from 'egg';

export default class UserController extends Controller {
  public async logout() {
    const { ctx } = this;
    ctx.logout();
    ctx.redirect(ctx.get('referer') || '/');
  }

  public async login() {
    const { ctx } = this;
    await ctx.render('/User/Login.js');
  }

  public async register() {
    const { ctx } = this;
    await ctx.render('/User/Register.js');
  }
}
