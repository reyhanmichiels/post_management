import { User } from "../app/model/user.model.js";

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
    password: "test_password",
  });
};

export { removeAllTestUser, createTestUser };
