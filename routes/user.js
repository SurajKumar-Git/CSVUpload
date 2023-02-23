import { Router } from "express";
import {
  login,
  logout,
  signUp,
  createUser,
  createSession,
} from "../controllers/user_controller.js";
import passport from "../config/passport_local_strategy.js";

const router = Router();

router.get("/login", passport.checkNotAuthenticated, login);

router.post(
  "/create-session",
  passport.checkNotAuthenticated,
  passport.authenticate("local", {
    failureRedirect: "/user/login",
  }),
  createSession
);
router.get("/logout", passport.checkAuthentication, logout);
router.get("/signup", passport.checkNotAuthenticated, signUp);
router.post("/create-user", passport.checkNotAuthenticated, createUser);

export default router;
