import bcrypt from 'bcryptjs'; // For password hashing
import jwt from 'jsonwebtoken'; // For generating JWTs
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const userResolver = {
  Query: {
    // Fetch authenticated user from the session or token
    authUser: async (_: any, __: any, { currentUser }: any) => {
      if (!currentUser) {
        throw new Error('Not authenticated');
      }
      // Fetch the user from the Prisma database by the ID from currentUser (from JWT)
      const user = await prisma.user.findUnique({
        where: { id: currentUser.id },
      });
      return user;
    },

    // Fetch a user by their ID
    user: async (_: any, { userId }: any) => {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    },
  },

  Mutation: {
    // Signup mutation: Create a new user
    signup: async (_: any, { input }: any) => {
      const { email, password, gender } = input;

      // Check if the email already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        throw new Error('Email already registered');
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
          isStudent: false, // Default value
          createdAt: new Date(),
        },
      });

      return newUser;
    },

    // Login mutation: Authenticate a user and return a token
    login: async (_: any, { input }: any) => {
      const { email, password } = input;

      // Find the user by email
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        throw new Error('Invalid credentials');
      }

      // Compare the provided password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }

      // Generate a JWT token for the user
      const token = jwt.sign({ id: user.id }, 'your_jwt_secret', {
        expiresIn: '1h', // Set the expiration time for the token
      });

      // Return the user object and token
      return {
        ...user,
        token,
      };
    },

    // Logout mutation: Clear the user's session (for now, we'll just return a message)
    logout: async () => {
      // In a real application, clear the JWT or session cookie here
      return {
        message: 'Successfully logged out',
      };
    },
  },
};

export default userResolver;