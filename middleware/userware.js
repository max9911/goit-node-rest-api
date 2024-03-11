import jwt from "jsonwebtoken";
import User from "../models/user.js";

async function jwtValidation(req, res, next) {
  const authData = req.headers.authorization;
  if (typeof authData === "undefined") {
    return res.status(401).send({ message: "Invalid token" });
  }

  const [b, token] = authData.split(" ", 2);

  jwt.verify(token, process.env.SECRET, async (err, decode) => {
    if (err) {
      return res.status(401).send({ message: "Not authorized" });
    }
    const userId = decode.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).send({ message: "Not authorized" });
    }
    if (user.token !== token) {
      return res.status(401).send({ message: "Not authorized" });
    }
    req.user = {
      id: userId,
      email: user.email,
      subscription: user.subscription,
    };

    next();
  });
}

export default jwtValidation;
