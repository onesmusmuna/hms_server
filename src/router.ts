import { Router } from "express";
import { getPatient, postPatientLogin, postPatientRegister } from "./controller/patient.controller";
import { patientMiddleware } from "./middleware/patient.middleware";

const router = Router();

router.route("/").get((req, res) => res.send("In router"));

router.route("/patient/register").post(postPatientRegister);
router.route("/patient/login").post(postPatientLogin);
router.route("/patient/").get(patientMiddleware, getPatient);

export default router;
