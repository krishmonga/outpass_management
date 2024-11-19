import { resend } from "./resendConfig.js";
import VerificationEmail from "../emails/VerificationEmail.js";

export const sendVerificationEmail = async (
    email: string,
    verificationCode: string,
    id: string,
    isStudent: boolean
): Promise<any> => {
    try {
        // Custom email logic based on isStudent
        const recipientEmail = isStudent ?  email : "smarthverma2003@gmail.com"
        console.log('this is recepientEmail', recipientEmail)
        const response = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: recipientEmail,
            subject: "Hello world",
            react: VerificationEmail({ id, verificationCode, isStudent }),
        });

        console.log("This is in verification function", response);
        return { success: true, message: "Verification email sent successfully" };
    } catch (error) {
        console.error("Error: ", error);
        return { success: false, message: "Failed to send verification email" };
    }
};