import { Router } from "express";
import { home } from "../controllers/home_controller.js";
import passport from "../config/passport_local_strategy.js";
import userRouter from "./user.js";
import csvRouter from "./csv.js";

const router = Router();

router.get("/", passport.checkAuthentication, home);
router.use("/user", userRouter);
router.use("/csv", csvRouter);

export default router;
