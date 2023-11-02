import { User } from "../app/model/user.model.js";
import bcrypt from "bcrypt";

const removeAllTestUser = async () => {
  await User.destroy({
    where: {
      name: "test_name",
    },
  });
};

const createTestUser = async () => {
  await User.create({
    name: "test_name",
    email: "test@email.com",
    password: await bcrypt.hash("test_password", 10),
  });
};

export { removeAllTestUser, createTestUser };
