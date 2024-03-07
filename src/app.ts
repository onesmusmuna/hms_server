import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import router from "./router";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(router);

export default app;
