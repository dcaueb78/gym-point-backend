import Sequelize, { Model } from "sequelize";

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        duration: Sequelize.INTEGER,
        price: Sequelize.BOOLEAN,
        status: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

export default Plan;
