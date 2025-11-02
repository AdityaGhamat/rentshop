declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: "development" | "test" | "production";
    PORT?: `${number}`;
    DATABASE_URL?: string;
    COOKIE_SECRET?: string;
  }
}
