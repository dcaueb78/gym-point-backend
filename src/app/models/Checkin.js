import Sequelize, { Model } from "sequelize";
import { isBefore, subDays } from "date-fns";

class Checkin extends Model {
  static init(sequelize) {
    super.init(
      {
        student_id: {
          type: Sequelize.INTEGER,
          required: true,
        },
        this_week: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(new Date(), subDays(this.date, 7));
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Checkin;
