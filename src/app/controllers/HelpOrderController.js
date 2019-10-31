import * as Yup from "yup";

import HelpOrder from "../schemas/HelpOrder";
import Student from "../models/Student";

class HelpOrderController {
  async index(req, res) {
    const helpOrder = await HelpOrder.find({
      student_id: req.params.student_id,
    }).sort({
      createdAt: "desc",
    });

    return res.json(helpOrder);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      question: Yup.string().required(),
    });

    if (
      !(await schema.isValid({
        student_id: req.params.student_id,
        question: req.body.question,
      }))
    ) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const studentExists = await Student.findOne({
      where: {
        id: req.params.student_id,
      },
    });

    if (!studentExists) {
      return res.status(400).json({ error: "Invalid identification" });
    }

    req.body.answer = null;
    req.body.answer_at = null;

    const helpOrder = await HelpOrder.create({
      student_id: req.params.student_id,
      question: req.body.question,
      answer: req.body.answer,
      answer_at: req.body.answer_at,
    });
    return res.json(helpOrder);
  }
}

export default new HelpOrderController();
