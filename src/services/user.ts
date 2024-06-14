import { prisma } from "../lib/db";
import { createHmac, randomBytes } from "node:crypto";
import { sign, verify } from "jsonwebtoken";
import { User } from "@prisma/client";

const JWT_SECRET = 'hjvkvdbvhsacvuz';

export interface CreateUserPayload {
    firstName : string;
    lastName : string;
    email : string;
    password : string;
}

export interface GetUserTokenPayload {
    email : string;
    password : string;
}

export default class UserService {
    private static getUserByEmail(email : string) {
        return prisma.user.findUnique({
            where : { email }
        })
    }

    private static generateHash(salt : string, password : string) : string {
        return createHmac('sha256', salt).update(password).digest('hex');
    }

    public static decodeJWTToken(token : string | undefined) : string {
        if (!token) throw new Error('Token not provided');
        return verify(token, JWT_SECRET) as string;
    }

    public static async getUserById(id : string) {
        return prisma.user.findUnique({ where : { id } });
    }

    public static createUser(payload : CreateUserPayload) {
        const { firstName, lastName, email, password } = payload;
        const salt = randomBytes(32).toString("hex");
        const hashedPassword = this.generateHash(salt, password);
        return prisma.user.create({
            data : {
                firstName,
                lastName,
                email,
                password : hashedPassword,
                salt
            }
        });
    }

    public static async getUserToken(payload : GetUserTokenPayload) {
        const { email, password } = payload;
        const user = await this.getUserByEmail(email);
        if (!user) throw new Error('User not found!');
        const userHashedPassword = this.generateHash(user.salt, password);
        if (userHashedPassword !== user.password) throw new Error('Invalid password!');
        return sign({ id : user.id, email : user.email }, JWT_SECRET)
    }
}