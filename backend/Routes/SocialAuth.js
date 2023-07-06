const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");


const router = express.Router();
const CLIENT_URL = "http://localhost:3000/";
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google",
  { failureRedirect: "/login" },
  (req, res) => {
    const token = jwt.sign({ userId: req.user.id }, process.env.AUTH_KEY);
    res.redirect(CLIENT_URL);
  }
));

router.get("/auth/github", passport.authenticate("linkedin"));

router.get(
  "/auth/github/callback",
  passport.authenticate("github",
  { failureRedirect: "/login" },
  (req, res) => {
    const token = jwt.sign({ userId: req.user.id }, process.env.AUTH_KEY);
    res.redirect(CLIENT_URL);
  }
));

router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook",
  { failureRedirect: "/login" },
  (req, res) => {
    const token = jwt.sign({ userId: req.user.id }, process.env.AUTH_KEY);
    res.redirect(CLIENT_URL);
  }
));

module.exports = router;