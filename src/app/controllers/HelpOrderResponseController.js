import HelpOrder from "../schemas/HelpOrder";
import Mail from "../../lib/Mail";
import Student from "../models/Student";

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

    Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: "Uma dúvida foi respondida",
      template: "answered",
      context: {
        student: student.name,
        question: helpOrder.question,
        answer: helpOrder.answer,
      },
    });
    return res.json(helpOrder);
  }
}

export default new HelpOrderResponseController();
