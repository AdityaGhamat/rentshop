import mongoose from "mongoose";
import { DatabaseError } from "@core/errors";
import { env } from "./env";
const DATABASE_URL = env.DATABASE_URL!;
import { logger } from "@core/utility/logger";

export async function loadDatabase(): Promise<void> {
  try {
    await mongoose.connect(DATABASE_URL, {
      autoIndex: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });

    logger.info("✅ Database is connected");
  } catch (error) {
    const dbError = new DatabaseError("Failed to connect to database", {
      original: (error as Error).message,
      name: (error as any).name,
    });
    logger.fatal("❎ Database connection failed", {
      error: dbError,
      uri: env.NODE_ENV === "development" ? DATABASE_URL : "",
    });
    throw dbError;
  }
}
