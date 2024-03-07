import { Request, Response } from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

import db from "../util/db.util";
import cr from "../util/cr.util";

export async function postPatientRegister(req: Request, res: Response) {
  const { email, plain } = req.body;

  try {
    const patientExist = await db.patient.findFirst({ where: { email } });

    if (patientExist) {
      return res.json(cr.str("bad", "patient exist, login"));
    }

    const password = await argon2.hash(plain);

    const user = await db.patient.create({ data: { email, password } });

    return res.json(cr.str("ok", `Patient ${user.email} registered successfully`));
  } catch (error) {
    return res.json(cr.str("fail", "Failed to register Patient"));
  }
}

export async function postPatientLogin(req: Request, res: Response) {
  const { email, plain } = req.body;

  try {
    const patient = await db.patient.findFirst({ where: { email } });

    if (!patient) {
      return res.json(cr.str("bad", "Patient does not exist, please register"));
    }

    const verifyPassword = await argon2.verify(patient.password, plain);

    if (!verifyPassword) {
      return res.json(cr.str("bad", "wrong credentials"));
    }

    const patientAuthToken = jwt.sign({ pid: patient.id, pmail: patient.email }, process.env.SEC!);

    // await db.sessions.create({ data: { userid: user.id, device } });

    return res
      .cookie("pt", patientAuthToken, { httpOnly: true, secure: true })
      .json(cr.str("ok", `Welcome ${patient.email}`));
  } catch (error) {
    return res.json(cr.str("fail", "Failed to Login user"));
  }
}

export async function getPatient(req: Request, res: Response) {
  // @ts-ignore
  const id = req.pid;
  try {
    const patient = await db.patient.findFirst({ where: { id } });

    if (!patient) return res.json(cr.str("bad", "patient not found"));

    const { password, updatedAt, createdAt, code, ...load } = patient;

    return res.json(cr.load("ok", load));
  } catch (error) {
    return res.json(cr.str("fail", "Failed to fetch user"));
  }
}

export async function postPatientLogout(req: Request, res: Response) {
  return res.clearCookie("pt").json(cr.str("ok", "logged out"));
}

export async function updatePatient(req: Request, res: Response) {
  // @ts-ignore
  const id = req.pid;

  const { dob, email, fName, gender, inpatient, lName, nextOfKin, phone } = req.body as IDetails;

  interface IDetails {
    email: string;
    fName: string;
    lName: string;
    phone: string;
    dob: string;
    gender: string;
    nextOfKin: string;
    inpatient: boolean;
  }

  try {
    const patient = await db.patient.update({
      where: { id },
      data: { dob, email, fName, gender, inpatient, lName, nextOfKin, phone },
      select: { email: true },
    });

    return res.json(cr.str("ok", `Patient ${email} updated successfully`));
    patient;
  } catch (error) {
    return res.json(cr.str("fail", "Failed to Update user"));
  }
}

export async function deletePatient(req: Request, res: Response) {
  // @ts-ignore
  const id = req.pid;

  try {
    const patient = await db.patient.delete({ where: { id }, select: { email: true } });

    return res.json(cr.str("ok", `User ${patient.email} Delete successfully `));
  } catch (error) {
    return res.json(cr.str("fail", "Failed to delete user"));
  }
}
