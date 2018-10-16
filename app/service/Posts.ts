import { Service } from 'egg';
/**
 * Posts Service
 */
export default class Posts extends Service {

  /**
   * list
   */
  public async list() {
    const { app } = this;
    try {
      return await app.model.WpPosts.getPosts();
    } catch (error) {
      return {
          error: true,
          code: 500,
          data: [],
          message: '参数不对'
      };
    }
  }
}
