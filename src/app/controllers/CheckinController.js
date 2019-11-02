import { startOfWeek, endOfWeek } from "date-fns";
import { Op } from "sequelize";
import * as Yup from "yup";
import Checkin from "../models/Checkin";

class CheckinController {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: "Validation Fails" });
    }

    const limitCheckin = 5;
    const currentDate = new Date();
    const currentStartOfWeek = startOfWeek(currentDate);
    const currentEndOfWeek = endOfWeek(currentDate);

    const studentCheckins = await Checkin.findAll({
      where: {
        student_id: req.params.student_id,
        created_at: {
          [Op.between]: [currentStartOfWeek, currentEndOfWeek],
        },
      },
      limit: limitCheckin,
    });

    if (studentCheckins.length >= limitCheckin) {
      return res.status(400).json({ error: "Weekly checkin limit reached" });
    }

    const checkin = await Checkin.create({
      student_id: req.params.student_id,
      created_at: new Date(),
    });

    return res.json(checkin);
  }

  async index(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
    });

    if (
      !(await schema.isValid({
        student_id: req.params.student_id,
      }))
    ) {
      return res.status(400).json({ error: "Validation Fails" });
    }

    const checkin = await Checkin.findAll({
      where: {
        student_id: req.params.student_id,
      },
    });

    return res.json(checkin);
  }
}

export default new CheckinController();
