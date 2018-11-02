import { Controller } from 'egg';

export default class UserApiController extends Controller {
  public async register() {
    const { ctx } = this;
    const { body } = ctx.req as any;
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
}
