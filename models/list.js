"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.list_items, { foreignKey: "list_id" });
      this.hasMany(models.approved_users, { foreignKey: "list_id" });
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  List.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      details: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "List",
    }
  );
  return List;
};
