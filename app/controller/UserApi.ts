import { Controller } from 'egg';
import validator from 'validator';
import { randomString } from '../utils/random';

export default class UserApiController extends Controller {
  public async register() {
    const { ctx } = this;
    const { body } = ctx.request;
    const params = { userName: body.mail, ...body };
    try {
      const user = await ctx.service.user.createRegisterUser(params);
      if (user) {
        ctx.body = JSON.stringify({
          success: true
        });
      }
    } catch (e) {
      ctx.body = JSON.stringify({
        success: false
      });
    }
  }
  /**
   * @request {
   *  email
   *  captcha
   * }
   */
  public async resetpassword() {
    const { ctx, app, service } = this;
    const email = validator.trim(ctx.request.body.email).toLowerCase();
    if (!validator.isEmail(email)) {
      ctx.fail({
        message: '邮箱不合法',
        email,
      });
      return;
    }

    const captcha = app.captcha.getCache(ctx).toLowerCase();
    const captcha2 = (ctx.request.body.captcha).toLowerCase()
    if (captcha2 !== captcha) {
      ctx.fail({
        message: '验证码有误',
        email,
      });
      return;
    }
    // 动态生成retrive_key和timestamp到users collection,之后重置密码进行验证
    const retrieveKey = randomString(12);
    const user = await service.user.getUserByMail(email);
    if (!user) {
      ctx.fail({
        error: '没有这个电子邮箱。',
        email,
      });
      return;
    }
    // 不常用字段 redis 比较合适
    // 1小时内有效
    await service.cache.setex('retrieve_key' + user.user_login, retrieveKey, 3600);
    // 发送重置密码邮件
    service.mail.sendResetPassMail(email, retrieveKey, user.user_login);
    ctx.fail({
      success: '我们已给您填写的电子邮箱发送了一封邮件，请在24小时内点击里面的链接来重置密码。',
    });
  }
}
