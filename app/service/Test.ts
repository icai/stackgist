import { Service } from 'egg';
// import { Author } from 'app/model/Author';
/**
 * Test Service
 */
export default class Test extends Service {

  /**
   * sayHi to you
   * @param name - your name
   */
  public async sayHi(name: string) {
    const { ctx } = this;

    try {
      await ctx.WpPosts.create({ post_content: 'elisa', post_title: name });
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
