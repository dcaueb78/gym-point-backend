import * as Yup from "yup";

import HelpOrder from "../schemas/HelpOrder";
import Student from "../models/Student";

class HelpOrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const studentExists = await Student.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!studentExists) {
      res.status(400).json({ error: "Invalid e-mail" });
    }

    req.body.student_id = studentExists.id;

    const helpOrder = await HelpOrder.create(req.body);
    return res.json(helpOrder);
  }
}

export default new HelpOrderController();
