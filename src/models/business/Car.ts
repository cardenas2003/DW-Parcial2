import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/db";
import { Institution } from "./Institution";

export interface CarI {
  id?: number;
  brand: string;
  class: string;
  model: string;
  cylinder_capacity: string;
  capacity: string;
  status: "ACTIVE" | "INACTIVE";
}

export class Car extends Model<CarI> implements CarI {
  public id!: number;
  public brand!: string;
  public class!: string;
  public model!: string;
  public cylinder_capacity!: string;
  public capacity!: string;
  public status!: "ACTIVE" | "INACTIVE";
}

Car.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,

      validate: {
        isInt: {
          msg: "Id must be integer",
        },
      },
    },

    brand: {
      type: DataTypes.STRING(50),
      allowNull: false,

      validate: {
        notEmpty: {
          msg: "Brand is required",
        },

        len: {
          args: [2, 50],
          msg: "Brand must contain between 2 and 50 characters",
        },
      },
    },

    class: {
      type: DataTypes.STRING(50),
      allowNull: false,

      validate: {
        notEmpty: {
          msg: "Class is required",
        },

        len: {
          args: [2, 50],
          msg: "Class must contain between 2 and 50 characters",
        },
      },
    },

    model: {
      type: DataTypes.STRING(255),
      allowNull: false,

      validate: {
        notEmpty: {
          msg: "Model is required",
        },
      },
    },

    cylinder_capacity: {
      type: DataTypes.STRING(50),
      allowNull: false,

      validate: {
        notEmpty: {
          msg: "Cylinder capacity is required",
        },
      },
    },

    capacity: {
      type: DataTypes.STRING(50),
      allowNull: false,

      validate: {
        notEmpty: {
          msg: "Capacity is required",
        },
      },
    },

    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",

      validate: {
        isIn: {
          args: [["ACTIVE", "INACTIVE"]],
          msg: "Status must be ACTIVE or INACTIVE",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Car",
    tableName: "car",
    timestamps: false,

    hooks: {
      beforeCreate: async (car: Car) => {
        console.log("Creating car...");
      },

      beforeUpdate: async (car: Car) => {
        console.log("Updating car...");
      },
    },
  }
);

// ================= RELATIONS =================

Car.hasMany(Institution, {
  foreignKey: "car_id",
  as: "institutions",
});