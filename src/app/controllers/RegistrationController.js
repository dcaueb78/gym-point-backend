import Registration from "../models/Registration";

class RegistrationController {
  async index(req, res) {
    const registration = await Registration.findAll();

    return res.json(registration);
  }
}

export default new RegistrationController();
