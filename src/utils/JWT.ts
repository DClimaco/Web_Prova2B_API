import jwt from "jsonwebtoken";

interface User{
    email: string,
    password: string
}

const privateKey = process.env.PRIVATE_KEY as string;

export async function generateJWToken(user: User){
    const token = jwt.sign(JSON.stringify(user), privateKey, {algorithm: "RS256"})
    return token;
}