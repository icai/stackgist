import { Controller } from 'egg';

export default class DashboardController extends Controller {

  public async analysis() {
    const { ctx } = this;
    await ctx.render('/Dashboard/Workplace.js');
  }

  public async monitor() {
    const { ctx } = this;
    await ctx.render('/Dashboard/Monitor.js');
  }
}
