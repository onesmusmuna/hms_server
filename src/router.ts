import { Router } from "express";
import {
  deletePatient,
  getPatient,
  postPatientLogin,
  postPatientLogout,
  postPatientRegister,
  updatePatient,
} from "./controller/patient.controller";
import { patientMiddleware } from "./middleware/patient.middleware";

const router = Router();

router.route("/").get((req, res) => {
  res.json({ msg: "home page" });
});

router.route("/patient/register").post(postPatientRegister);
router.route("/patient/login").post(postPatientLogin);

router.route("/patient/logout").post(patientMiddleware, postPatientLogout);
router.route("/patient").get(patientMiddleware, getPatient);
router.route("/patient/update").patch(patientMiddleware, updatePatient);
router.route("/patient/delete").delete(patientMiddleware, deletePatient);

export default router;
