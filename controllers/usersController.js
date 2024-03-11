import * as Joi from "../schemas/JoiSchemas.js";
import User from "../models/user.js";

async function register(req, res, next) {
  const user = req.body;
  console.log("user", user);
}

export default { register };
