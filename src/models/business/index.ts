import { Car } from "./Car";
import { Institution } from "./Institution";

// ================= RELATIONS =================

Car.hasMany(Institution, {
  foreignKey: "car_id",
  as: "institutions",
});

Institution.belongsTo(Car, {
  foreignKey: "car_id",
  as: "car",
});

export {
  Car,
  Institution,
};