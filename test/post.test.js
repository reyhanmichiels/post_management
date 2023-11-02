import supertest from "supertest";
import { sequelize } from "../infrastructure/database/db_connection.js";
import {
  createTestPost,
  createTestUser,
  getTestPost,
  getTestUser,
  getTestUserToken,
  removeAllTestPost,
  removeAllTestUser,
} from "../util/test.util.js";
import { rest } from "../rest/rest.js";

afterAll(async () => {
  await sequelize.close();
});

describe("create post || POST /api/posts", () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestPost();
    await removeAllTestUser();
  });

  it("should create post", async () => {
    const testUser = await getTestUser();
    const token = "Bearer " + (await getTestUserToken());
    const result = await supertest(rest)
      .post("/api/posts")
      .set("Authorization", token)
      .send({ message: "test_message" });

    console.info(result.body);

    expect(result.status).toBe(201);
    expect(result.body.data.message).toBe("test_message");
    expect(result.body.data.userId).toBe(testUser.id);
  });

  it("should reject if request invalid", async () => {
    const testUser = await getTestUser();
    const token = "Bearer " + (await getTestUserToken());
    const result = await supertest(rest)
      .post("/api/posts")
      .set("Authorization", token)
      .send({});

    console.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });

  it("should reject if authorization invalid", async () => {
    const testUser = await getTestUser();
    const token = "Bearer " + (await getTestUserToken());
    const result = await supertest(rest)
      .post("/api/posts")
      .send({ message: "test_message" });

    console.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.error).toBe("Unauthorized");
  });
});

describe("delete post || DELETE /api/users/posts/:postId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestPost();
  });

  afterEach(async () => {
    await removeAllTestPost();
    await removeAllTestUser();
  });

  it("should can delete post", async () => {
    const testPost = await getTestPost();
    const token = "Bearer " + (await getTestUserToken());

    const result = await supertest(rest)
      .delete(`/api/users/posts/${testPost.id}`)
      .set("Authorization", token);

    console.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("success");
  });

  it("should reject if request invalid", async () => {
    const token = "Bearer " + (await getTestUserToken());

    const result = await supertest(rest)
      .delete(`/api/users/posts/dsdvs`)
      .set("Authorization", token);

    console.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });

  it("should reject if post not found", async () => {
    const token = "Bearer " + (await getTestUserToken());

    const result = await supertest(rest)
      .delete(`/api/users/posts/100`)
      .set("Authorization", token);

    console.info(result.body);

    expect(result.status).toBe(404);
    expect(result.body.error).toBe("post not found");
  });

  it("should reject if authorization invalid", async () => {
    const testPost = await getTestPost();

    const result = await supertest(rest).delete(
      `/api/users/posts/${testPost.id}`
    );

    console.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.error).toBe("Unauthorized");
  });
});
