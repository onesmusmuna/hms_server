import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import cr from "../util/cr.util";
import db from "../util/db.util";

export async function doctorMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies["dt"];

  if (!token) {
    return res.json(cr.str("bad", "access denied"));
  }

  const payload: any = jwt.verify(token, process.env.SEC!);

  try {
    const user = await db.doctor.findFirst({ where: { id: payload.did, email: payload.dmail } });

    if (!user) {
      return res.json(cr.str("bad", "access denied"));
    }

    // @ts-ignore
    req.did = user.id;

    next();
  } catch (error) {
    return res.json(cr.str("bad", "access denied"));
  }
}
