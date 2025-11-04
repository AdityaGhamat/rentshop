import pino from "pino";

const isDevelopmentMode = process.env.NODE_ENV !== "production";
const logLevel = process.env.LOG_LEVEL;

const baseLogger = pino({
  level: logLevel || (isDevelopmentMode ? "debug" : "info"),
  timestamp: pino.stdTimeFunctions.isoTime,
  base: undefined,
  formatters: {
    level(label) {
      return { level: label.toUpperCase() };
    },
  },
  transport: isDevelopmentMode
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      }
    : undefined,
});

baseLogger.info(
  {
    NODE_ENV: process.env.NODE_ENV,
    LOG_LEVEL: process.env.LOG_LEVEL,
  },
  "Initializing base logger"
);

export const logger = {
  log(level: pino.Level, message: string, meta?: Record<string, any>) {
    baseLogger[level](meta || {}, message);
  },
  info(message: string, meta?: Record<string, any>) {
    baseLogger.info(meta || {}, message);
  },
  warn(message: string, meta?: Record<string, any>) {
    baseLogger.warn(meta || {}, message);
  },
  error(message: string, error?: unknown) {
    if (error instanceof Error) {
      baseLogger.error({ stack: error.stack, message: error.message });
    } else if (typeof error === "object") {
      baseLogger.error(error as Record<string, any>);
    } else {
      baseLogger.error({ error });
    }
  },
  debug(message: string, meta?: Record<string, any>) {
    baseLogger.debug(meta || {}, message);
  },
  fatal(message: string, meta?: Record<string, any>) {
    baseLogger.fatal(meta || {}, message);
  },
};

logger.info("Logger initialized", {
  env: process.env.NODE_ENV,
  logLevel: process.env.LOG_LEVEL || "default",
});
