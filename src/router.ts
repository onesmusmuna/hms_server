import { Router } from "express";
import { postPatientLogin, postPatientRegister } from "./controller/patient.controller";

const router = Router();

router.route("/").get((req, res) => res.send("In router"));

router.route("/auth/register").post(postPatientRegister);
router.route("/auth/login").post(postPatientLogin);

export default router;
