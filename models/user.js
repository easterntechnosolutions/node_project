"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // Associate User with Role
      User.belongsTo(models.Role, {
        foreignKey: "roleId",
        as: "role",
      });
    }
  }

  User.init(
    {
      firstname: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      roleId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Roles",
          key: "id",
        },
        allowNull: false,
        defaultValue: 3,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};