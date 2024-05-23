declare namespace NodeJS {
    export interface ProcessEnv {
        DB_CONNECTION_STRING: string;
        ENV: string;
        JWT_ACCESS_TOKEN_SECRET: string;
        JWT_REFRESH_TOKEN_SECRET: string;
        PORT: string;
    }
}