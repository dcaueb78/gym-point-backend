import User from "../models/User";

class UserController {
  async Store(req, res) {
    const userExists = User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: "User already exists." });
    }

    const user = await User.create(req.body);
    return res.json({ user });
  }

  async update(req, res) {
    return res.json({ ok: true });
  }
}

export default new UserController();
