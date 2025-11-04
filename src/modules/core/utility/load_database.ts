import mongoose from "mongoose";
import { env } from "./env";
const DATABASE_URL = env.DATABASE_URL!;
import { logger } from "@core/utility/logger";

export async function loadDatabase(): Promise<void> {
  try {
    await mongoose
      .connect(DATABASE_URL)
      .then(() => {
        logger.info("✅ Database is connected");
      })
      .catch((err) => logger.error(err));
  } catch (error) {
    logger.error("❎ Database connection failed", {
      error: error,
      uri: DATABASE_URL,
    });
    process.exit(1);
  }
}
