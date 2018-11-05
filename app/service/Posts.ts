import { Service } from 'egg';
import _ from 'lodash';

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
    const Model = app.model.WpPosts;
    const DataTypes = app.Sequelize;
    const Op = DataTypes.Op;
    return await Model.findAll({
      where: {
        id: {
          [Op.in]: ids
        }
      },
      raw: true
    });
  }

  public async getPosts(offset = 0, limit = 10) {
    const { app } = this;
    const Model = app.model.WpPosts;
    const idsobj = await Model.getAvailablePostIds(offset, limit);
    const ids = _.map(idsobj, 'id');
    return await this.getPostsByIds(ids || []);
  }
}
