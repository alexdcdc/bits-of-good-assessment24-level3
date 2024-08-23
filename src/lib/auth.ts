import { SignJWT, jwtVerify } from "jose";

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not set in .env");
}

const JWT_EXPIRATION_TIME = "20 mins"
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function encrypt(data: any) {
    return new SignJWT(data)
        .setProtectedHeader({ "alg": "HS256" })
        .setIssuedAt()
        .setExpirationTime(JWT_EXPIRATION_TIME)
        .sign(JWT_SECRET);
}

export async function decrypt(token: string) {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET, { algorithms: ["HS256"] });
        return payload;
    }
    catch {
        return null;
    }
    
}



