declare namespace NodeJS {
    export interface ProcessEnv {
        DB_USERNAME: string;
        DB_PASSWORD: string;
        DB_HOST: string;
        DB_DATABASE: string;
        ENV: string;
        JWT_ACCESS_TOKEN_SECRET: string;
        JWT_REFRESH_TOKEN_SECRET: string;
        PORT: string;
    }
}