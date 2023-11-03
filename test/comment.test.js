import supertest from "supertest";
import { sequelize } from "../infrastructure/database/db_connection.js";
import {
  createTestPost,
  createTestUser,
  getTestPost,
  getTestUserToken,
  removeAllTestComment,
  removeAllTestPost,
  removeAllTestUser,
} from "../util/test.util";
import { rest } from "../rest/rest.js";

afterAll(async () => {
  await sequelize.close();
});

describe("create comment || POST /api/posts/:postId/comments", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestPost();
  });

  afterEach(async () => {
    await removeAllTestComment();
    await removeAllTestPost();
    await removeAllTestUser();
  });

  it("should can be create comment", async () => {
    const testPost = await getTestPost();
    const token = "Bearer " + (await getTestUserToken());

    const result = await supertest(rest)
      .post(`/api/posts/${testPost.id}/comments`)
      .set("Authorization", token)
      .send({
        comment: "test_comment",
      });

    console.info(result.body);

    expect(result.status).toBe(201);
    expect(result.body.data.comment).toBe("test_comment");
    expect(result.body.data.userId).toBeDefined();
    expect(result.body.data.postId).toBe(testPost.id);
  });

  it("should be reject if request invalid", async () => {
    const testPost = await getTestPost();
    const token = "Bearer " + (await getTestUserToken());

    const result = await supertest(rest)
      .post(`/api/posts/${testPost.id}/comments`)
      .set("Authorization", token)
      .send();

    console.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });

  it("should can be reject if post not found", async () => {
    const token = "Bearer " + (await getTestUserToken());

    const result = await supertest(rest)
      .post(`/api/posts/394939/comments`)
      .set("Authorization", token)
      .send({
        comment: "test_comment",
      });

    console.info(result.body);

    expect(result.status).toBe(404);
    expect(result.body.error).toBe("post not found");
  });

  it("should can be reject if authorization invalid", async () => {
    const testPost = await getTestPost();

    const result = await supertest(rest)
      .post(`/api/posts/${testPost.id}/comments`)
      .set("Authorization", "wrong")
      .send({
        comment: "test_comment",
      });

    console.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.error).toBe("Unauthorized");
  });
});
