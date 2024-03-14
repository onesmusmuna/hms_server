import { Request, Response } from "express";
import db from "../util/db.util";
import cr from "../util/cr.util";

export async function postAppointment(req: Request, res: Response) {
  // @ts-ignore
  const id = req.pid;

  const { prob, date } = req.body;

  try {
    const appt = await db.appointment.create({ data: { date, prob, userId: id } });

    return res.json(cr.str("ok", `Appointment for ${prob} created`));
  } catch (error) {
    return res.json(cr.str("fail", "Failed to create appointment"));
  }
}
