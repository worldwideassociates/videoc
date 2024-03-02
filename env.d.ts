declare namespace NodeJS {
  interface ProcessEnv {
    AUTH_GOOGLE_ID: string;
    AUTH_GOOGLE_SECRET: string;
    DATABASE_URL: string;
    NEXT_PUBLIC_BASE_URL: string;
    BASE_URL: string;
    STREAM_API_KEY: string;
    STREAM_API_SECRET: string;
    DEFAULT_LOCALE: string;
    BUNNY_API_KEY: string;
  }
}