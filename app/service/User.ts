import { Service } from 'egg';
/**
 * User Service
 */
export default class User extends Service {

  /**
   * find
   */
  public async find() {
    return this.ctx.user;
  }
}
