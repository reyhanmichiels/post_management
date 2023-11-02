import express from "express";
import userHandler from "../app/handler/user.handler.js";

const userApi = new express.Router();

userApi.post("/api/users", userHandler.registration);
userApi.post("/api/auth/login", userHandler.login);

export { userApi };
