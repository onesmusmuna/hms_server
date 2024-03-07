import { Router } from "express";
import {
  getPatient,
  postPatientLogin,
  postPatientLogout,
  postPatientRegister,
} from "./controller/patient.controller";
import { patientMiddleware } from "./middleware/patient.middleware";

const router = Router();

router.route("/").get((req, res) => {
  console.log(req.cookies);
});

router.route("/patient/register").post(postPatientRegister);
router.route("/patient/login").post(postPatientLogin);

router.route("/patient/logout").post(patientMiddleware, postPatientLogout);
router.route("/patient").get(patientMiddleware, getPatient);

export default router;
