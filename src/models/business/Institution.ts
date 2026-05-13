import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/db";
import { Car } from "./Car";

export interface InstitutionI {
  institution_id?: number;
  registration_date: string;
  city: string;
  payment: string;
  car_id: number;
  status: "ACTIVE" | "INACTIVE";
}

export class Institution
  extends Model<InstitutionI>
  implements InstitutionI
{
  public institution_id!: number;
  public registration_date!: string;
  public city!: string;
  public payment!: string;
  public car_id!: number;
  public status!: "ACTIVE" | "INACTIVE";
}

Institution.init(
  {
    institution_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,

      validate: {
        isInt: {
          msg: "Institution ID must be integer",
        },
      },
    },

    registration_date: {
      type: DataTypes.STRING(50),
      allowNull: false,

      validate: {
        notEmpty: {
          msg: "Registration date is required",
        },
      },
    },

    city: {
      type: DataTypes.STRING(50),
      allowNull: false,

      validate: {
        notEmpty: {
          msg: "City is required",
        },

        len: {
          args: [2, 50],
          msg: "City must contain between 2 and 50 characters",
        },
      },
    },

    payment: {
      type: DataTypes.STRING(255),
      allowNull: false,

      validate: {
        notEmpty: {
          msg: "Payment is required",
        },
      },
    },

    car_id: {
      type: DataTypes.INTEGER,
      allowNull: false,

      references: {
        model: "car",
        key: "id",
      },

      validate: {
        isInt: {
          msg: "Car ID must be integer",
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
    modelName: "Institution",
    tableName: "institution",
    timestamps: false,

    hooks: {
      beforeCreate: async (institution: Institution) => {
        console.log("Creating institution...");
      },

      beforeUpdate: async (institution: Institution) => {
        console.log("Updating institution...");
      },
    },
  }
);

// ================= RELATIONS =================

Institution.belongsTo(Car, {
  foreignKey: "car_id",
  as: "car",
});