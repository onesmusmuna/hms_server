import { Request, Response } from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

import db from "../util/db.util";
import cr from "../util/cr.util";

export async function postDoctorRegister(req: Request, res: Response) {
  const { email, plain, type } = req.body;

  try {
    const doctorExist = await db.doctor.findFirst({ where: { email } });

    if (doctorExist) {
      return res.json(cr.str("bad", "doctor exist, login"));
    }

    const password = await argon2.hash(plain);

    const user = await db.doctor.create({ data: { email, password, type } });

    return res.json(cr.str("ok", `Doctor ${user.email} registered successfully`));
  } catch (error) {
    return res.json(cr.str("fail", "Failed to register Doctor"));
  }
}

export async function postDoctorLogin(req: Request, res: Response) {
  const { email, plain } = req.body;

  try {
    const doctor = await db.doctor.findFirst({ where: { email } });

    if (!doctor) {
      return res.json(cr.str("bad", "doctor does not exist, please register"));
    }

    const verifyPassword = await argon2.verify(doctor.password, plain);

    if (!verifyPassword) {
      return res.json(cr.str("bad", "wrong credentials"));
    }

    const doctorAuthToken = jwt.sign({ did: doctor.id, dmail: doctor.email }, process.env.SEC!);

    // await db.sessions.create({ data: { userid: user.id, device } });

    return res
      .cookie("dt", doctorAuthToken, { httpOnly: true, secure: true })
      .json(cr.str("ok", `Welcome ${doctor.email}`));
  } catch (error) {
    return res.json(cr.str("fail", "Failed to Login doctor"));
  }
}

export async function getDoctor(req: Request, res: Response) {
  // @ts-ignore
  const id = req.did;
  try {
    const doctor = await db.doctor.findFirst({ where: { id } });

    if (!doctor) return res.json(cr.str("bad", "doctor not found"));

    const { password, updatedAt, createdAt, ...load } = doctor;

    return res.json(cr.load("ok", load));
  } catch (error) {
    return res.json(cr.str("fail", "Failed to fetch doctor"));
  }
}

export async function postDoctorLogout(req: Request, res: Response) {
  return res.clearCookie("dt").json(cr.str("ok", "logged out"));
}

export async function updateDoctor(req: Request, res: Response) {
  // @ts-ignore
  const id = req.did;

  const { email, fName, lName, type } = req.body;

  try {
    const doctor = await db.doctor.update({
      where: { id },
      data: { email, fName, lName, type },
      select: { email: true },
    });

    return res.json(cr.str("ok", `Doctor ${email} updated successfully`));
  } catch (error) {
    return res.json(cr.str("fail", "Failed to Update doctor"));
  }
}

export async function deleteDoctor(req: Request, res: Response) {
  // @ts-ignore
  const id = req.did;

  try {
    const doctor = await db.doctor.delete({ where: { id }, select: { email: true } });

    return res.json(cr.str("ok", `Doctor ${doctor.email} Delete successfully `));
  } catch (error) {
    return res.json(cr.str("fail", "Failed to delete doctor"));
  }
}
