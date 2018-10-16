/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('wp_users', {
    ID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    user_login: {
      type: DataTypes.STRING(60),
      allowNull: false,
      defaultValue: ''
    },
    user_pass: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    user_nicename: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ''
    },
    user_email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    user_url: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    user_registered: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '1970-01-01 00:00:01'
    },
    user_activation_key: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    user_status: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    display_name: {
      type: DataTypes.STRING(250),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'wp_users',
    indexs: [{
      fields: [{
        attribute: 'user_login'
      }],
      name: 'user_login_key'
    }, {
      fields: [{
        attribute: 'user_nicename'
      }],
      name: 'user_nicename'
    }, {
      fields: [{
        attribute: 'user_email'
      }],
      name: 'user_email'
    }]
  });

  Model.associate = function () {

  }

  return Model;
};