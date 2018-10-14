/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('wp_options', {
    option_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    option_name: {
      type: DataTypes.STRING(191),
      allowNull: false,
      defaultValue: '',
      unique: true
    },
    option_value: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    autoload: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'yes'
    }
  }, {
    tableName: 'wp_options'
  });

  Model.associate = function() {

  }

  return Model;
};
