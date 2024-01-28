declare namespace NodeJS {
  interface ProcessEnv {
    AUTH_GOOGLE_ID: string;
    AUTH_GOOGLE_SECRET: string;
    DATABASE_URL: string;
    STREAM_API_KEY: string;
    STREAM_API_TOKEN: string;
    STREAM_USER_ID: string;
    STREAM_CALL_ID: string;
  }
}