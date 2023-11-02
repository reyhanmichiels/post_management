import supertest from "supertest";
import { rest } from "../rest/rest.js";
import { createTestUser, removeAllTestUser } from "../util/test.util.js";
import { sequelize } from "../infrastructure/database/db_connection.js";
import bcrypt from "bcrypt";

afterAll(async () => {
  await sequelize.close();
});

describe("regist user || POST /api/users", () => {
  afterEach(async () => {
    await removeAllTestUser();
  });

  it("should can regist user", async () => {
    const result = await supertest(rest).post("/api/users").send({
      name: "test_name",
      email: "test@email.com",
      password: "test_password",
    });

    console.info(result.body);

    expect(result.status).toBe(201);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.name).toBe("test_name");
    expect(result.body.data.email).toBe("test@email.com");
    expect(
      await bcrypt.compare("test_password", result.body.data.password)
    ).toBe(true);
  });

  it("should reject when request invalid", async () => {
    const result = await supertest(rest).post("/api/users").send({});

    console.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });

  it("should reject when unique constraint vioalated", async () => {
    await createTestUser();
    const result = await supertest(rest).post("/api/users").send({
      name: "test_name",
      email: "test@email.com",
      password: "test_password",
    });

    console.info(result.body);

    expect(result.status).toBe(409);
    expect(result.body.error).toBe("email is already taken");
  });
});

describe("login user || POST /api/auth/login", () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestUser();
  });

  it("should can be login", async () => {
    const result = await supertest(rest).post("/api/auth/login").send({
      email: "test@email.com",
      password: "test_password",
    });

    console.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
  });

  it("should reject when email wrong", async () => {
    const result = await supertest(rest).post("/api/auth/login").send({
      email: "wrong@email.com",
      password: "test_password",
    });

    console.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.error).toBe("email or password is wrong");
  });

  it("should reject when password wrong", async () => {
    const result = await supertest(rest).post("/api/auth/login").send({
      email: "test@email.com",
      password: "wrong",
    });

    console.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.error).toBe("email or password is wrong");
  });

  it("should reject when request invalid", async () => {
    const result = await supertest(rest).post("/api/auth/login").send({});

    console.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });
});
