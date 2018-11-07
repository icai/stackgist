import { Controller } from 'egg';

export default class PostsApiController extends Controller {
  public async posts() {
    const { ctx } = this;
    try {
      const posts = await ctx.service.posts.getPosts();
      if (posts) {
        ctx.body = posts;
      }
    } catch (e) {
      console.info(e);
      ctx.body = [];
    }
  }
}
