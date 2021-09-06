// const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('users', {
    user_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    user_password: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: process.env.SCHEMA,
    timestamps: true,
    indexes: [
      {
        name: 'pk_users_user_id',
        unique: true,
        fields: [
          { name: 'user_id' }
        ]
      }
    ]
  })
}
