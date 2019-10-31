import { format, parseISO } from "date-fns";
import pt from "date-fns/locale/pt";
import Mail from "../../lib/Mail";

class RegistrationMail {
  get key() {
    return "RegistrationMail";
  }

  async handle({ data }) {
    const { student, plan, registration } = data;

    Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: "Matrícula Efetuada",
      template: "registration",
      context: {
        student: student.name,
        plan: plan.title,
        price: plan.price,
        end_date: format(
          parseISO(registration.end_date),
          "'dia' dd 'de' MMMM'",
          {
            locale: pt,
          }
        ),
        start_date: format(
          parseISO(registration.start_date),
          "'dia' dd 'de' MMMM' '",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new RegistrationMail();
