import { Router } from "express";
import {
  uploadCSVFiles,
  openCSVFile,
  deleteCSVFile,
} from "../controllers/csv_controller.js";
import multerMiddleware from "../config/multer_csv_file_upload_middleware.js";
import passport from "../config/passport_local_strategy.js";

const router = Router();

router.post(
  "/upload",
  passport.checkAuthentication,
  multerMiddleware,
  uploadCSVFiles
);

router.get("/open/:id", passport.checkAuthentication, openCSVFile);
router.get("/delete/:id", passport.checkAuthentication, deleteCSVFile);

export default router;
