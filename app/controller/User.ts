import { Controller } from 'egg';
import * as validator from 'validator';
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
    await ctx.render('/User/ResetPassword.js', {name: 'cai'});
  }
  public async resetpassgoto() {
    const { ctx } = this;
    await ctx.render('/User/ResetPassgoto.js');
  }

  public async resetpassinput() {
    const { ctx, service } = this;
    const key = validator.trim(ctx.query.key || '');
    const name = validator.trim(ctx.query.name || '');
    const retrieveKey = await service.cache.get('retrieve_key' + name);
    const retrieveTime = await service.cache.get('retrieve_time' + name);
    if(!retrieveTime) {
      ctx.status = 403;
      await this.ctx.render('/User/notify.js' , {
        message: '该链接已过期，请重新申请。',
        type: 'error'
      });
      return;
    } else {
      if(retrieveKey === key) {
        await ctx.render('/User/ResetPassinput.js', { key, name });
      } else {
        ctx.status = 403;
        await this.ctx.render('/User/notify.js', {
          message: '信息有误，密码无法重置。',
          type: 'error'
        });
        return;
      }

    }

  }
}
