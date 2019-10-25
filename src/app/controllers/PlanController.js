import Plan from "../models/Plan";

class PlanController {
  async store(req, res) {
    const planExists = await Plan.findOne({ where: { title: req.body.title } });

    if (planExists) {
      return res.status(400).json({ error: "Plan already exists" });
    }

    const plan = await Plan.create(req.body);

    return res.json(plan);
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const plans = await Plan.findAll({
      order: ["price"],
      limit: 10,
      offset: (page - 1) * 10,
    });

    return res.json(plans);
  }
}

export default new PlanController();
