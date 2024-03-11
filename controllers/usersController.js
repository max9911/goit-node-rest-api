import * as Joi from "../schemas/JoiSchemas.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function register(req, res, next) {
  const user = req.body;
  const valid = Joi.registerUsersSchema.validate(user);

  if (valid.error !== undefined) {
    return res
      .status(400)
      .send("Помилка від Joi або іншої бібліотеки валідації");
  }
  const normEmail = user.email.toLowerCase();

  try {
    const find = await User.findOne({ email: normEmail });
    if (find !== null) {
      return res.status(409).send({
        message: "Email in use",
      });
    }
    const passHash = await bcrypt.hash(user.password, 10);
    await User.create({
      email: normEmail,
      password: passHash,
    });
    res.status(201).send({
      user: {
        email: normEmail,
        subscription: "starter",
      },
    });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  const user = req.body;
  const valid = Joi.registerUsersSchema.validate(user);

  if (valid.error !== undefined) {
    return res
      .status(400)
      .send("Помилка від Joi або іншої бібліотеки валідації");
  }
  const normEmail = user.email.toLowerCase();
  try {
    const userDB = await User.findOne({ email: normEmail });
    if (userDB === null) {
      res.status(401).send({
        message: "Email or password is wrong",
      });
    }
    console.log("userDB", userDB);
    const passCheck = await bcrypt.compare(user.password, userDB.password);
    console.log("passcheck", passCheck);
    if (passCheck === false) {
      res.status(401).send({
        message: "Email or password is wrong",
      });
    }
    const token = jwt.sign(
      {
        id: userDB._id,
        email: userDB.email,
      },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
    await User.findByIdAndUpdate(userDB._id, { token });
    res.status(200).send({
      token: token,
      user: {
        email: userDB.email,
        subscription: userDB.subscription,
      },
    });
  } catch (err) {}
}
async function logout(req, res, next) {
  const user = await User.findByIdAndUpdate(req.user.id, { token: null });
  if (!user) {
    res.status(401).send({
      message: "Not authorized",
    });
  }
  res.status(204);
}
async function current(req, res, next) {
  res.status(200).send({
    email: req.user.email,
    subscription: req.user.subscription,
  });
}

export default { register, login, logout, current };
