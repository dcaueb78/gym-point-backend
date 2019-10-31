import HelpOrder from "../schemas/HelpOrder";
import Student from "../models/Student";

import HelpOrderResponseMail from "../jobs/HelpOrderResponseMail";
import Queue from "../../lib/Queue";

class HelpOrderResponseController {
  async index(req, res) {
    const helpOrder = await HelpOrder.find({
      answer: null,
    }).sort({
      createdAt: "desc",
    });

    return res.json(helpOrder);
  }

  async store(req, res) {
    if (!req.body.answer) {
      res.status(401).json({ error: "Answer required" });
    }

    const helpOrder = await HelpOrder.findOneAndUpdate(
      req.params.id,
      {
        answer: req.body.answer,
        answer_at: new Date(),
      },
      { new: true }
    );

    const student = await Student.findByPk(helpOrder.student_id, {
      attributes: ["email", "name"],
    });

    await Queue.add(HelpOrderResponseMail.key, {
      student,
      helpOrder,
    });

    return res.json(helpOrder);
  }
}

export default new HelpOrderResponseController();
