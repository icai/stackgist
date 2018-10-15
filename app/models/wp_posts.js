/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Op = DataTypes.Op;

  const Model = app.model.define('wp_posts', {
    ID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    post_author: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    post_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '1970-01-01 00:00:01'
    },
    post_date_gmt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '1970-01-01 00:00:01'
    },
    post_content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    post_title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    post_excerpt: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    post_status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'publish'
    },
    comment_status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'open'
    },
    ping_status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'open'
    },
    post_password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    post_name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: ''
    },
    to_ping: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    pinged: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    post_modified: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '1970-01-01 00:00:01'
    },
    post_modified_gmt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '1970-01-01 00:00:01'
    },
    post_content_filtered: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    post_parent: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    guid: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    menu_order: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    post_type: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'post'
    },
    post_mime_type: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    comment_count: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'wp_posts'
  });

  Model.associate = function() {

  }

  Modal.getAvailablePostIds = async (offset = 0, limit = 10) => {
    await Model.findAll({
      offset,
      limit,
      attributes: ['ID'],
      where: {
        1: 1,
        post_type: 'post',
        [Op.or]: [{
          post_status: 'publish'
        },{
          post_status: 'private'
        }]
      },
      order: [['post_date', 'DESC']]
    })
  }

  Modal.getPostsByIds = async (ids) => {
    await Modal.findAll({
      where: {
        ID: {
          [Op.in]: ids
        }
      }
    })
  }

  Model.getPosts = async (offset = 0, limit = 10) =>{
    const ids = await Model.getAvailablePostIds(offset, limit);
    await Modal.getPostsByIds(ids || []);
  }


  return Model;
};
