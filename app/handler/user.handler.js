import { logResponse } from "../../util/log.util.js";
import userService from "../service/user.service.js";

const registration = async (req, res, next) => {
  try {
    const result = await userService.registration(req.body);

    req.statusCode = 201;
    logResponse(req);
    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
    registration
}
