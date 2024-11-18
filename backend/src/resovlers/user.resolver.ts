import bcrypt from "bcryptjs"; // For password hashing
import { PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql";
import { LoginInput, SignUpInput } from "@/types/Inputs";
import { dbConnect } from "../db/dbConnect.js";
import { Context } from "@/types/PassportContext";
import { APOLLO_USER_NOT_FOUND_EMAIL, FACULTY_NOT_VERIFIED, USER_FACULTY, USER_NOT_FOUND, USER_STUDENT } from "../constants.js";
import { createVerificationToken } from "../helpers/createVerificationToken.js";
import { sendVerificationEmail } from "../helpers/sendVerificationEmail.js";
import crypto from "crypto";


const userResolver = {
  Query: {
    authUser: async (parent: any, __: any, context: Context) => {
      try {
        const user = await context.getUser();
        return user;
      } catch (error) {
        console.error("Error in authUser", error);
        throw new GraphQLError("Internal server error");
      }
    },

    user: async (_: any, { userId }: { userId: string }) => {
      try {
        const prisma: PrismaClient = await dbConnect();

        const user = await prisma.user.findUnique({
          where: { id: userId },
        });
        if (!user) {
          throw new GraphQLError("User not found");
        }
        return user;
      } catch (error: any) {
        console.error(`Error in getting user(via id) ${error}`)
        throw new GraphQLError("Internal server error");
      }
    },
  },

  Mutation: {
    // Signup mutation: Create a new user
    signup: async (
      _: any,
      { input }: { input: SignUpInput },
      context: Context
    ) => {
      try {
        const prisma: PrismaClient = await dbConnect();
        const { email, password, gender, userType } = input;


        // Check if the email already exists
        const existingUser = await prisma.user.findUnique({
          where: { email },
        });
        if (existingUser) {
          throw new GraphQLError("Email already registered");
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);
        const name = email.split('@')[0]
        const id = name
        const isStudent = userType === USER_STUDENT
        const { hashedToken, verificationCodeExpiry, verificationToken } = createVerificationToken()
        // Create and save the new user using Prisma
        const newUser = await prisma.user.create({
          data: {
            id,
            name,
            email,
            password: hashedPassword,
            gender: gender ? gender : "MALE",
            validEmail: false, // Assuming email validation happens elsewhere
            isStudent,
            createdAt: new Date(),
            verifyCode: hashedToken,
            verifyCodeExpiry: verificationCodeExpiry
          },
        });

        const emailResponse = await sendVerificationEmail(email, verificationToken, id, isStudent)

        if (!(newUser?.isStudent) && !(newUser?.validEmail)) throw new GraphQLError(FACULTY_NOT_VERIFIED)

        await context.login(newUser); // direct login
        return newUser;
      } catch (error) {
        throw new GraphQLError(`Internal server error: ${error}`);
      }
    },

    // Login mutation: Authenticate a user and return a token
    login: async (
      _: any,
      { input }: { input: LoginInput },
      context: Context
    ) => {
      try {
        const { email, password, userType } = input;
        const { user } = await context.authenticate("graphql-local", {
          email,
          password,
        });
        if (!(user?.isStudent) && !(user?.validEmail)) throw new GraphQLError(FACULTY_NOT_VERIFIED)
        if (!user) throw new GraphQLError(USER_NOT_FOUND)
        if ((USER_FACULTY === userType) && user?.isStudent) throw new GraphQLError("You are not verified to be as Faculty member")
        if (!user?.validEmail) throw new GraphQLError(`First verify your email at ${user?.email}`) // resend the mail

        if (!user) throw new GraphQLError("Incorrect email or password");
        await context.login(user);
        return user;
      } catch (error: any) {
        console.error("Error in login", error);
        if (error.message === APOLLO_USER_NOT_FOUND_EMAIL) throw new GraphQLError(USER_NOT_FOUND)
        throw new Error(error.message || "Internal server error");
      }
    },

    logout: async (_: any, __: any, context: Context) => {
      try {
        await context.logout();
        context.res?.clearCookie("connect.sid");
        return { message: "Logged out successfully" };
      } catch (error: any) {
        console.error("Error in logout", error);
        throw new Error(error.message || "Internal server error");
      }
    },

    // input to be a verification code
    verifyUser: async (_: any, input: string, context: Context) => {
      try {
        const prisma = await dbConnect()
        const token = input

        const hashedToken = crypto
          .createHash("sha256")
          .update(token) // got token from /:token
          .digest("hex");


        const user = await prisma.user.findMany({
          where: {
            AND: [{ validEmail: false }, { verifyCode: hashedToken }],
          },
        });

        if (user.length === 0) { throw new GraphQLError("Error verifying the user: User not found"); }
        if (user[0].verifyCodeExpiry && user[0].verifyCodeExpiry.getTime() < Date.now()) {
          throw new GraphQLError("Verification token expired");
        }
        
        const updatedUser = await prisma.user.update({
          where: { id: user[0].id }, // Assuming `id` is the unique identifier for the user
          data: { validEmail: true, verifyCode: null, verifyCodeExpiry: null },
        });

        return updatedUser;
      } catch (error: any) {
        console.error("Error in logout", error);
        throw new Error(error.message || "Internal server error");
      }


    }
  },
};

export default userResolver;
