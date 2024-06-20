// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import apolloServer from "./lib/apollo/apollo.server";
import { startStandaloneServer } from "@apollo/server/standalone";

const port = 8000;

const startServer = async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());

  await startStandaloneServer(apolloServer);

  app.all(
    "/graphql/",
    cors<cors.CorsRequest>(),
    express.json({ limit: "50mb" }),
    expressMiddleware(apolloServer, {
      context: ({ request }: { request: Request }) => ({
        // Add optional configuration options
        request: request,
      }),
    })
  );

  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });
};

startServer();
