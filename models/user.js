"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.list_items, { foreignKey: "user_id" });
      this.hasMany(models.approved_users, { foreignKey: "user_id" });
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Must have username" },
          notEmpty: { msg: "Username must not be empty" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          // notNull: { msg: "User must have a email" },
          notEmpty: { msg: "email must not be empty" },
          isEmail: { msg: "Must be a valid email address" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          // notNull: { msg: "User must have a password" },
          notEmpty: { msg: "email must not be password" },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
