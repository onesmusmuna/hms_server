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
import {
  deleteDoctor,
  getDoctor,
  postDoctorLogin,
  postDoctorLogout,
  postDoctorRegister,
  updateDoctor,
} from "./controller/doctor.controller";
import { doctorMiddleware } from "./middleware/doctor.middleware";

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

router.route("/doctor/register").post(postDoctorRegister);
router.route("/doctor/login").post(postDoctorLogin);

router.route("/doctor/logout").post(doctorMiddleware, postDoctorLogout);
router.route("/doctor").get(doctorMiddleware, getDoctor);
router.route("/doctor/update").patch(doctorMiddleware, updateDoctor);
router.route("/doctor/delete").delete(doctorMiddleware, deleteDoctor);

export default router;
