import { User } from "../app/model/user.model";
import { ResponseError } from "../exception/response.error";

export const isJWTValid = async (req, res, next) => {
  let token = req.get("Authorization");
  token = token.split("Bearer ")[1];

  if (!token) {
    throw new ResponseError(401, "Unauthorized");
  }

  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    req.user = await User.findByPk(decoded.userId);
    next();
  } catch (err) {
    next(err);
  }
};
