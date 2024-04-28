import adminSchema from "../models/admin-schema";
import { hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

const { ADMIN_SECRET_KEY }: any = process.env;

class AdminServices {
    public getAdminDetailsByEmail = async (email: string) => {
       try {
           const adminDetails = await adminSchema.findOne({ email });
           return adminDetails;
       } catch (error) {
           throw error; 
       }
    }

    public createNewAdmin = async (adminData: any) => {
       try {
           const hashedPassword = await hash(adminData.password, 10);
           const createAdminData = await adminSchema.create({
               ...adminData,
               password: hashedPassword,
               status: 'active',
               registeredAt: new Date(),
               removedAt: null
           });
           return createAdminData;
       } catch (error) {
           throw error;
       }
    };

    public createAdminToken = async (adminData: any) => {
       try {
           const expiresIn: number = 60 * 60 * 24;
           return { expiresIn, token: sign(adminData, ADMIN_SECRET_KEY, { expiresIn }) };
       } catch (error) {
           throw error;
       }
    }

    public verifyAdminJWT = async (userToken: string) => {
        try {
            const verificationResponse: any = verify(
                userToken,
                ADMIN_SECRET_KEY
            );

            const userDetails = await this.getAdminDetailsByEmail(verificationResponse.email);
            return userDetails;
        } catch (error) {
           console.log(error); 
        }
    };

    public adminLogin = async (adminDetails: any) => {
       try {
           const sendData: any = adminDetails.toObject();
           delete sendData.password;
           const tokenData: any = await this.createAdminToken(sendData);
           const authData = {
               accessToken: tokenData.token,
               email: sendData.email,
               adminId: sendData._id,
               role: "admin"
           };
           return authData;
       } catch (error) {
           throw error; 
       }
    }
}

export const adminServices = new AdminServices();
