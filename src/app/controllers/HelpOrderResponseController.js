import HelpOrder from "../schemas/HelpOrder";

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
    const helpOrder = await HelpOrderResponseController.find({
      student_id: req.params.id,
    });

    return res.json(helpOrder);
  }
}

export default new HelpOrderResponseController();
