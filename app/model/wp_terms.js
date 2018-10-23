/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('wp_terms', {
    term_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: ''
    },
    slug: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: ''
    },
    term_group: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'wp_terms',
    indexes: [{
      fields: [{
        attribute: 'slug',
        length: 191
      }],
      name: 'slug'
    }, {
      fields: [{
        attribute: 'name',
        length: 191
      }],
      name: 'name'
    }]
  });

  Model.associate = function () {

  }

  return Model;
};