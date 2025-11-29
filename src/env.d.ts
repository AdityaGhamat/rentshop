declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: "development" | "test" | "production";
    PORT?: `${number}`;
    DATABASE_URL?: string;
    COOKIE_SECRET?: string;
    LOG_LEVEL?: string;
    JWT_SECRET?: string;
    JWT_ACCESS_TOKEN_TTL?: number;
    JWT_REFRESH_TOKEN_TTL?: number;
    JWT_TOKEN_AUDIENCE?: string;
    JWT_TOKEN_ISSUER?: string;
    OTP_TTL_MS?: number;
    OTP_LENGTH?: number;
  }
}
