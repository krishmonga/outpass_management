import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import mergedTypeDefs from "./typeDefs";
import mergedResolvers from "./resovlers/index";

import pool from "./pgPool";
import connectPgSimple from 'connect-pg-simple';
import session from "express-session";
import { buildContext } from "graphql-passport";
import { dbConnect } from "./db/dbConnect";
import passport from "passport";

dotenv.config();
console.log(process.env.SESSION_SECERT); // Should log the value of your SESSION_SECRET variable
const app = express();
const httpServer = http.createServer(app);
const port = process.env.PORT

const pgSession = connectPgSimple(session);
const store = new pgSession({
  pool,                 // PostgreSQL connection pool
  tableName: 'session', // Optional: specify the session table name
});

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

  //middlewares
  app.use(cors({
    origin: "http://localhost:5173", // Removed trailing slash
    credentials: true,
  }));
  app.use(express.json()); // Make sure JSON body parsing is applied globally

  app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      httpOnly: true,
    },
    store: store,
  }));

  app.use(passport.initialize());
app.use(passport.session());

  await server.start();

app.use("/graphql",
    expressMiddleware(server, {
        context: async ({ req, res }) => buildContext({ req, res }),
    }),
);

httpServer.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/graphql`);
  });

console.log('CheckBefore');
await dbConnect(); // Connect to database
