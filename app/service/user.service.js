import { ResponseError } from "../../exception/response.error.js";
import { sequelize } from "../../infrastructure/database/db_connection.js";
import { User } from "../model/user.model.js";
import userValidation from "../validation/user.validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";

const registration = async (request) => {
  request = validate(userValidation.registerUserValidation, request);

  const password = await bcrypt.hash(request.password, 10);

  try {
    const user = await sequelize.transaction(async (t) => {
      const totalUserInDatabase = await User.findAndCountAll(
        {
          where: {
            email: request.email,
          },
        },
        {
          transaction: t,
        }
      );

      if (totalUserInDatabase.count !== 0) {
        throw new ResponseError(409, "email is already taken");
      }

      return await User.create(
        {
          name: request.name,
          email: request.email,
          password: password,
        },
        {
          transaction: t,
        }
      );
    });
    
    return user;
  } catch (error) {
    throw new ResponseError(error.status, error.message);
  }
};

export default {
  registration,
};
