declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CORS_ORIGIN?: string;
      DATABASE_URL?: string;
      DB_HOST?: string;
      DB_NAME?: string;
      DB_PASSWORD?: string;
      DB_PORT?: string;
      DB_USER?: string;
      NODE_ENV: "development" | "production" | "test";
      PORT?: string;
    }
  }
}

export {};
