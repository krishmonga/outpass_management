import { dbConnect } from "../db/dbConnect.js";
import { HostelInput, OutpassInput,  } from "@/types/Inputs";
import { Context } from "@/types/PassportContext";
import { PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql";

const outpassResolvers = {
  Query: {
    getAllOutpasses: async (parent: any, input: HostelInput , context: Context) => {
      try {
        const {hostelName} = input
        const prisma: PrismaClient = await dbConnect();
        const user = await context.getUser();
        if (user?.isStudent) throw new GraphQLError("Student do not have access to this request");
        const allOutpasses = await prisma.outpass.findMany({
          where: {hostelName}
        });
        return allOutpasses;
      } catch (error: any) {
        console.error(error);
        throw new GraphQLError(`Internal error: ${error}`);
      }
    },
    getOutpass: async (
      parent: any,
      { id }: { id: string },
      context: Context
    ) => {
      try {
        const prisma: PrismaClient = await dbConnect();
        if (!context.isAuthenticated()) throw new GraphQLError("Unauthorized access");
        const outpass = await prisma.outpass.findUnique({
          where: { id },
        });

        return outpass
      } catch (error) {
        console.error(error);
        throw new GraphQLError(`Internal error: ${error}`);
      }
    },
  },
  Mutation: {
    createOutpass: async (
      parent: any,
      { input }: { input: OutpassInput },
      context: Context
    ) => {
      try {
        const prisma: PrismaClient = await dbConnect();
        console.log('this is input', input)
        const {
          block,
          contactNumber,
          dateFrom,
          dateTo,
          hostelNumber,
          name,
          reason,
          userId,
          hostelName
        } = input;

        if (!context.isAuthenticated()) throw new GraphQLError("Unauthorized access");

        const newOutpass = await prisma.outpass.create({
          data: {
            name,
            dateFrom,
            dateTo,
            hostelNumber,
            contactNumber,
            reason,
            block,
            userId,
            hostelName,
            isCompleted: false,
          },
        });

        return newOutpass;
      } catch (error) {
        console.error(error);
        throw new GraphQLError(`Internal error: ${error}`);
      }
    },
    deleteOutpass: async (
      parent: any,
      { id }: { id: string },
      context: Context
    ) => {
      try {
        const prisma: PrismaClient = await dbConnect();

        if (!context.isAuthenticated()) throw new GraphQLError("Unauthorized access");

        const deletedOutpass = await prisma.outpass.delete({
          where: { id },
        });

        return deletedOutpass;
      } catch (error) {
        console.error(error);
        throw new GraphQLError(`Internal error: ${error}`);
      }
    },
    updateOutpass: async (
      parent: any,
      { id, input }: { id: string; input: OutpassInput },
      context: Context
    ) => {
      try {
        const prisma: PrismaClient = await dbConnect();

        if (!context.isAuthenticated()) throw new GraphQLError("Unauthorized access");

        const updatedOutpass = await prisma.outpass.update({
          where: { id },
          data: {
            ...input, // Spread the input to update the fields
          },
        });

        return updatedOutpass;
      } catch (error) {
        console.error(error);
        throw new GraphQLError(`Internal error: ${error}`);
      }
    },
  },
};

export default outpassResolvers;
