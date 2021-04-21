import { buildSchema } from "type-graphql";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ProjectsResolver } from "./resolvers/ProjectResolver";
import { TechnologyResolver } from "./resolvers/TechnologyResolver";
import { createConnection } from "typeorm";
import { ProjectEntity } from "./entities/ProjectEntity";
import { TechnologyEntity } from "./entities/TechnologyEntity";
import cors from "cors";
import path from "path";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "khong_portfolio",
    username: "postgres",
    password: "postgres",
    migrations: [path.join(__dirname, "/migrations/*")],
    logging: false,
    synchronize: true,
    migrationsRun: true,
    entities: [ProjectEntity, TechnologyEntity],
  });

  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ProjectsResolver, TechnologyResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
};

main().catch((err) => console.log(err));
