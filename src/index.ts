import dotenv from "dotenv";
import app from "./app";

dotenv.config();

(() => {
  const { PORT, DATABASE_URL, SEC } = process.env;

  if (!PORT || !DATABASE_URL || !SEC) {
    return console.log("\nDefine ENVs\n");
  }

  app.listen(PORT, () =>
    console.log(`HMS server listening on port: http://localhost:${PORT}`)
  );
})();
