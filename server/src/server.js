import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "../src/config/db.js";

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  await connectDB();
  app.listen(PORT, () => {
    console.log("API running on port", PORT);
  });
}

bootstrap().catch((err) => {
  console.error("Error bootstrapping server:", err);
  process.exit(1);
});
