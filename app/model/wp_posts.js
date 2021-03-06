/* indent size: 2 */



module.exports = app => {
  const DataTypes = app.Sequelize;
  const Op = DataTypes.Op;
  const Model = app.model.define('wp_posts', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
    tableName: 'wp_posts',
    timestamps: false,
    indexes: [{
      fields: [{
        attribute: 'post_name',
        length: 191
      }],
      name: 'post_name'
    }, {
      fields: [{
        attribute: 'post_type'
      }, {
        attribute: 'post_status'
      }, {
        attribute: 'post_date'
      }, {
        attribute: 'id'
      }],
      name: 'type_status_date'
    }, {
      fields: [{
        attribute: 'post_parent'
      }],
      name: 'post_parent'
    }, {
      fields: [{
        attribute: 'post_author'
      }],
      name: 'post_author'
    }]

  });

  Model.associate = function() {
    Model.belongsTo(app.model.WpUsers, { foreignKey: 'post_author', as: 'user', through: app.model.WpUsers})
  }

  return Model;
};
