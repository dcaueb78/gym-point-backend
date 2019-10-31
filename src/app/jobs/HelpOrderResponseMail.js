import Mail from "../../lib/Mail";

class HelpOrderResponseMail {
  get key() {
    return "HelpOrderResponseMail";
  }

  async handle({ data }) {
    const { student, helpOrder } = data;

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
  }
}

export default new HelpOrderResponseMail();
