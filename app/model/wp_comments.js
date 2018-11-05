/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('wp_comments', {
    comment_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    comment_post_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    comment_author: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    comment_author_email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    comment_author_url: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: ''
    },
    comment_author_IP: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    comment_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '1970-01-01 00:00:01'
    },
    comment_date_gmt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '1970-01-01 00:00:01'
    },
    comment_content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    comment_karma: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    comment_approved: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '1'
    },
    comment_agent: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    comment_type: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    comment_parent: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {

    tableName: 'wp_comments',
    indexes: [{
      fields: [{
        attribute: 'comment_post_id'
      }],
      name: 'comment_post_id'
    }, {
      fields: [{
        attribute: 'comment_approved'
      }, {
        attribute: 'comment_date_gmt'
      }],
      name: 'comment_approved_date_gmt'
    }, {
      fields: [{
        attribute: 'comment_date_gmt'
      }],
      name: 'comment_date_gmt'
    }, {
      fields: [{
        attribute: 'comment_parent'
      }],
      name: 'comment_parent'
    }, {
      fields: [{
        attribute: 'comment_author_email',
        length: 10
      }],
      name: 'comment_author_email'
    }]
  });

  Model.associate = function () {

  }

  return Model;
};