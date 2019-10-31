import * as Yup from "yup";
import { addMonths, isBefore, format } from "date-fns";
import pt from "date-fns/locale/pt";
import Mail from "../../lib/Mail";

import Registration from "../models/Registration";
import Plan from "../models/Plan";
import Student from "../models/Student";

class RegistrationController {
  async index(req, res) {
    const registration = await Registration.findAll({
      order: ["start_date"],
    });

    return res.json(registration);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const registrationActiveExists = await Registration.findOne({
      where: {
        student_id: req.body.student_id,
      },
      attributes: ["id", "end_date"],
    });

    if (
      registrationActiveExists &&
      !isBefore(registrationActiveExists.end_date, new Date())
    ) {
      return res
        .status(400)
        .json({ error: "Student already has active registration" });
    }

    const student = await Student.findByPk(req.body.student_id, {
      attributes: ["email", "name"],
    });

    if (!student) {
      res.status(400).json({ error: "This student does not exists" });
    }

    const plan = await Plan.findByPk(req.body.plan_id, {
      attributes: ["duration", "price", "title"],
    });

    if (!plan) {
      res.status(400).json({ error: "This plan does not exists" });
    }

    req.body.start_date = new Date();
    req.body.end_date = addMonths(req.body.start_date, plan.duration);
    req.body.price = plan.duration * plan.price;

    const registration = await Registration.create(req.body);
    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: "Matrícula Efetuada",
      template: "registration",
      context: {
        student: student.name,
        plan: plan.title,
        price: plan.price,
        end_date: format(registration.end_date, "'dia' dd 'de' MMMM'", {
          locale: pt,
        }),
        start_date: format(registration.start_date, "'dia' dd 'de' MMMM' '", {
          locale: pt,
        }),
      },
    });

    return res.json(registration);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number(),
      plan_id: Yup.number(),
      price: Yup.number(),
      start_date: Yup.date(),
      end_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    if (req.body.plan_id) {
      const plan = await Plan.findByPk(req.body.plan_id);
      if (!plan) {
        return res.status(400).json({ error: "Plan not exists" });
      }
    }
    if (req.body.student_id) {
      const student = await Student.findByPk(req.body.student_id);
      if (!student) {
        return res.status(400).json({ error: "Student not exists" });
      }
    }

    const registration = await Registration.findByPk(req.query.id);

    if (!registration) {
      return res.status(400).json({ error: "Registration dont exists" });
    }

    await registration.update(req.body);
    await registration.save();

    return res.json(registration);
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number(),
    });

    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const registration = await Registration.findByPk(req.query.id);

    if (!registration) {
      return res.status(400).json({ error: "Registrations not exists" });
    }

    registration.disabled_at = new Date();
    registration.save();

    return res.json(registration);
  }
}

export default new RegistrationController();
