import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("Define JWT_SECRET is the env");
}

export function signToken(payload: { email: string, userId: string }) {
    const token = jwt.sign(payload, JWT_SECRET as string, {
        expiresIn: "7d"
    })
    return token;
}

export function verifyToken(token: string) {
    try {
        return jwt.verify(token, JWT_SECRET as string);
    } catch {
        return null;
    }
}