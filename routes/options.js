const { Router } = require("express");
const { INFORMATION, USERS } = require("../helpers");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = require("../env");

const options = Router();

options.options("/", (req, res) => {
  const loggedOut = [
    {
      method: "post",
      path: "/users/register",
      description: "Register, Required: email, name, password",
      example: {
        body: {
          email: "user@email.com",
          name: "user",
          password: "password",
        },
      },
    },
    {
      method: "post",
      path: "/users/login",
      description: "Login, Required: valid email and password",
      example: { body: { email: "user@email.com", password: "password" } },
    },
    {
      method: "post",
      path: "/users/token",
      description: "Renew access token, Required: valid refresh token",
      example: { headers: { token: "*Refresh Token*" } },
    },
  ];

  const loggedIn = [
    {
      method: "post",
      path: "/users/register",
      description: "Register, Required: email, name, password",
      example: {
        body: {
          email: "user@email.com",
          name: "user",
          password: "password",
        },
      },
    },
    {
      method: "post",
      path: "/users/login",
      description: "Login, Required: valid email and password",
      example: { body: { email: "user@email.com", password: "password" } },
    },
    {
      method: "post",
      path: "/users/token",
      description: "Renew access token, Required: valid refresh token",
      example: { headers: { token: "*Refresh Token*" } },
    },
    {
      method: "get",
      path: "/api/v1/information",
      description: "Access user's information, Required: valid access token",
      example: { headers: { Authorization: "Bearer *Access Token*" } },
    },
    {
      method: "post",
      path: "/users/logout",
      description: "Logout, Required: access token",
      example: { body: { token: "*Refresh Token*" } },
    },
    { name: "test" },
  ];
  const admin = [
    {
      method: "post",
      path: "/users/register",
      description: "Register, Required: email, name, password",
      example: {
        body: { email: "user@email.com", name: "user", password: "password" },
      },
    },
    {
      method: "post",
      path: "/users/login",
      description: "Login, Required: valid email and password",
      example: { body: { email: "user@email.com", password: "password" } },
    },
    {
      method: "post",
      path: "/users/token",
      description: "Renew access token, Required: valid refresh token",
      example: { headers: { token: "*Refresh Token*" } },
    },
    {
      method: "post",
      path: "/users/tokenValidate",
      description: "Access Token Validation, Required: valid access token",
      example: { headers: { Authorization: "Bearer *Access Token*" } },
    },
    {
      method: "get",
      path: "/api/v1/information",
      description: "Access user's information, Required: valid access token",
      example: { headers: { Authorization: "Bearer *Access Token*" } },
    },
    {
      method: "post",
      path: "/users/logout",
      description: "Logout, Required: access token",
      example: { body: { token: "*Refresh Token*" } },
    },
    {
      method: "get",
      path: "api/v1/users",
      description: "Get users DB, Required: Valid access token of admin user",
      example: { headers: { authorization: "Bearer *Access Token*" } },
    },
  ];

  const forGuest = [
    {
      method: "post",
      path: "/users/register",
      description: "Register, Required: email, name, password",
      example: {
        body: {
          email: "user@email.com",
          name: "user",
          password: "password",
        },
      },
    },
    {
      method: "post",
      path: "/users/login",
      description: "Login, Required: valid email and password",
      example: { body: { email: "user@email.com", password: "password" } },
    },
  ];

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.slice(7);

  if (!token) {
    return res.status(200).send(forGuest);
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
    req.user = decoded;
    if (err) {
      return res.status(200).send(loggedOut);
    } else if (decoded.isAdmin) {
      return res.status(200).send(admin);
    } else return res.status(200).send(loggedIn);
  });
});

module.exports = options;
