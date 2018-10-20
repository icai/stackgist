import { Controller } from 'egg';

export default class AdminController extends Controller {
  public async index() {
    await this.ctx.render('/admin/index');
  }
}
