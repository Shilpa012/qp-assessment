import userSchema from "../models/user-schema";
import { hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const { USER_SECRET_KEY }: any = process.env;

class UserServices {
    public getUserDetailsByEmail = async (email: string) => {
        try {
            const userDetails = await userSchema.findOne({ email });
            return userDetails;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public createNewUser = async (userData: any) => {
        try {
            const hashedPassword = await hash(userData.password, 10);
            const createUserData = await userSchema.create({
                ...userData,
                password: hashedPassword,
                registeredAt: new Date(),
                lastLoggedInAt: null
            });
            return createUserData;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    public createUserToken = async (userData: any) => {
        try {
            const expiresIn: number = 60 * 60 * 24;
            await userSchema.findOneAndUpdate({
                email: userData.email
            }, {
                lastLoggedInAt: new Date()
            });
            return { expiresIn, token: sign(userData, USER_SECRET_KEY, { expiresIn }) };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public verifyUserJWT = async (userToken: string) => {
        try {
            const verificationResponse: any = verify(
                userToken,
                USER_SECRET_KEY
            );
            const userDetails = await this.getUserDetailsByEmail(verificationResponse.email);
            return userDetails;
        } catch (error) {
            console.log(error);
        }
    };

    public userLogin = async (userDetails: any) => {
        try {
            const sendData: any = userDetails.toObject();
            delete sendData.password;
            const tokenData: any = await this.createUserToken(sendData);
            const authData = {
                accessToken: tokenData.token,
                email: sendData.email,
                userId: sendData._id,
                role: 'user'
            };
            return authData;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export const userServices = new UserServices();