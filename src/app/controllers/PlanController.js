import Plan from "../models/Plan";

class PlanController {
  async store(req, res) {
    req.body.active = true;

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

  async delete(req, res) {
    const plan = await Plan.findByPk(req.body.id);

    plan.active = false;
    plan.save();
    res.json(plan);
  }

  async update(req, res) {
    const plan = await Plan.findByPk(req.body.id);

    if (!plan) {
      res.status(400).json({ error: "Plan does not exists" });
    }

    const { title, duration, price, active } = await plan.update(req.body);

    return res.json({
      title,
      duration,
      price,
      active,
    });
  }
}

export default new PlanController();
