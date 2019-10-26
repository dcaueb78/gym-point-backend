import Sequelize, { Model } from "sequelize";

class Registration extends Model {
  static init(sequelize) {
    super.init(
      {
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.DOUBLE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Plan, { foreignKey: "plan_id", as: "plan" });
    this.belongsTo(models.Student, { foreignKey: "student_id", as: "student" });
  }
}

export default Registration;
