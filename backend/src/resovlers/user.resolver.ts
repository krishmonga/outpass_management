import bcrypt from "bcryptjs"; // For password hashing
import { PrismaClient } from "@prisma/client";
import { Context } from "../types/passportContext.js";
import { GraphQLError } from "graphql";
import { LoginInput, SignUpInput } from "@/types/Inputs";
import { dbConnect } from "@/db/dbConnect";

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
        const { email, password, gender, isStudent } = input;

        // Check if the email already exists
        const existingUser = await prisma.user.findUnique({
          where: { email },
        });
        if (existingUser) {
          throw new GraphQLError("Email already registered");
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user using Prisma
        const newUser = await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            gender,
            validEmail: true, // Assuming email validation happens elsewhere
            isStudent,
            createdAt: new Date(),
          },
        });

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
        const { email, password } = input;
        const { user } = await context.authenticate("graphql-local", {
          email,
          password,
        });

        if (!user) throw new GraphQLError("Incorrect email or password");
        await context.login(user);
        return user;
      } catch (error: any) {
        console.error("Error in login", error);
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
  },
};

export default userResolver;
