export type JWTBody = { userId: string };

export const isJWTBody = (obj: any): obj is JWTBody => {
    if (typeof obj === 'object' && obj !== null) {
        const { userId } = obj;
        return typeof userId === 'string';
    }
    return false;
};
