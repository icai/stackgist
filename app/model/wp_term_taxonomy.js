/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('wp_term_taxonomy', {
    term_taxonomy_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    term_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    taxonomy: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: ''
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    parent: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    count: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'wp_term_taxonomy',
    indexes: [{
      fields: [{
        attribute: 'term_id'
      }, {
        attribute: 'taxonomy'
      }],
      name: 'term_id_taxonomy',
      unique: true
    }, {
      fields: [{
        attribute: 'taxonomy'
      }],
      name: 'taxonomy'
    }]
  });

  Model.associate = function () {

  }

  return Model;
};