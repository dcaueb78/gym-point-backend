import Checkin from "../models/Checkin";

class CheckinController {
  async store(req, res) {
    const checkin = await Checkin.create({
      student_id: 1,
      created_At: new Date(),
    });
    return res.json(checkin);
  }

  async index(req, res) {
    const checkin = await Checkin.findAll();

    return res.json(checkin);
  }
}

export default new CheckinController();
