import * as Yup from "yup";

import Student from "../models/Student";

class StudentController {
  async Store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .required()
        .email(),
      age: Yup.number()
        .integer()
        .required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const { email } = req.body;

    const studentExists = await Student.findOne({ where: { email } });

    if (studentExists) {
      return res.status(401).json({ erro: "Student already exists!" });
    }

    const { id, name } = await Student.create(req.body);
    return res.json({
      id,
      name,
      email,
    });
  }

  async Update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      oldEmail: Yup.string().email(),
      email: Yup.string()
        .email()
        .when("oldEmail", (oldEmail, field) =>
          oldEmail ? field.required() : field
        ),
      age: Yup.number().integer(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const { oldEmail, email } = req.body;

    const student = oldEmail
      ? await Student.findOne({ where: { email: oldEmail } })
      : await Student.findOne({ where: { email } });

    if (oldEmail) {
      const newEmailExists = Student.findOne({ where: { email } });

      if (newEmailExists) {
        return res.status(401).json({ error: "Email already registered." });
      }
    }

    if (!student) {
      return res.status(401).json({ error: "Student dont exist." });
    }
    const { id, name } = await student.update(req.body);

    return res.status(200).json({ id, name });
  }
}

export default new StudentController();
