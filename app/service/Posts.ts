import { Service } from 'egg';
import * as _ from 'lodash';

/**
 * Posts Service
 */
export default class Posts extends Service {
  /**
   * list
   */
  public async list() {
    // const { app } = this;
    try {
      return await this.getPosts();
    } catch (error) {
      return {
        success: false,
        data: []
      };
    }
  }

  public async getAvailablePostIds(offset = 0, limit = 10) {
    const { app } = this;
    const Model = app.model.WpPosts;
    const DataTypes = app.Sequelize;
    const Op = DataTypes.Op;
    return await Model.findAll({
      offset,
      limit,
      attributes: ['id'],
      where: {
        post_type: 'post',
        [Op.or]: [
          {
            post_status: 'publish'
          },
          {
            post_status: 'private'
          }
        ]
      },
      raw: true,
      order: [['post_date', 'DESC']]
    });
  }

  public async getPostsByIds(ids) {
    const { app } = this;
    const { WpPosts, WpUsers } = app.model;
    const DataTypes = app.Sequelize;
    const Op = DataTypes.Op;
    return await WpPosts.findAll({
      where: {
        id: {
          [Op.in]: ids
        }
      },
      include: [{
        model: WpUsers,
        as: 'user',
        attributes: ['display_name', 'user_email', 'user_avatar', 'id'],
        nested: true
      }],
      // raw: true
    });
  }

  public async getPosts(offset = 0, limit = 10) {
    const idsobj = await this.getAvailablePostIds(offset, limit);
    const ids = _.map(idsobj, 'id');
    return await this.getPostsByIds(ids || []);
  }
}
