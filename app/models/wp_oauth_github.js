/* jshint indent: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;
  const Model = app.model.define('wp_oauth_github', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      unique: true
    },
    _id: {
      type: DataTypes.STRING(64),
      allowNull: true,
      unique: true
    },
    nickname: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    avatar_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    html_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    company: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    blog: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    login: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'wp_oauth_github',
    indexes: [{
      fields: [{
        attribute: '_id'
      }],
      name: '_id_unique',
      unique: true
    }, {
      fields: [{
        attribute: 'user_id'
      }],
      name: 'user_id_unique',
      unique: true
    }]
  });
  Model.associate = function () {

  }

  return Model;
};