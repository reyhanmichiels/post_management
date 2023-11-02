import { User } from "../app/model/entity.model.js";
import jwt from "jsonwebtoken";

export const isJWTValid = async (req, res, next) => {
  let token = req.get("Authorization");
  token = String(token).split("Bearer ")[1];

  if (!token) {
    res
      .status(401)
      .json({
        error: "Unauthorized",
      })
      .end();
    return;
  }

  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    req.user = await User.findByPk(decoded.userId);
    next();
  } catch (err) {
    res
      .status(401)
      .json({
        error: "Unauthorized",
      })
      .end();
  }
};
