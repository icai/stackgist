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

  public async resetpassword() {
    const { ctx } = this;
    await ctx.render('/User/ResetPassword.js');
  }
  public async resetpassgoto() {
    const { ctx } = this;
    await ctx.render('/User/ResetPassgoto.js');
  }

  public async resetpassinput() {
    const { ctx } = this;
    await ctx.render('/User/ResetPassinput.js');
  }
}
