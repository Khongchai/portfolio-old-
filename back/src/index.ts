import { buildSchema } from "type-graphql";
import express from "express";
import "dotenv-safe/config";
import { ApolloServer } from "apollo-server-express";
import { ProjectsResolver } from "./resolvers/ProjectResolver";
import { TechnologyResolver } from "./resolvers/TechnologyResolver";
import { createConnection } from "typeorm";
import { ProjectEntity } from "./entities/ProjectEntity";
import { TechnologyEntity } from "./entities/TechnologyEntity";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import path from "path";
import { COOKIE_NAME, IN_PRODUCTION } from "./constants";
import { AdminEntity } from "./entities/AdminEntity";
import { AdminResolver } from "./resolvers/AdminResolver";

const main = async () => {
  await createConnection({
    type: "postgres",
    // database: "khong_portfolio",
    // username: "postgres",
    // password: "postgres",
    migrations: [path.join(__dirname, "/migrations/*")],
    logging: false,
    url: process.env.DATABASE_URL,
    synchronize: true,
    migrationsRun: false,
    entities: [ProjectEntity, TechnologyEntity, AdminEntity],
  });

  const app = express();
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient({ url: process.env.REDIS_URL });

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redisClient,
        disableTTL: true,
      }),
      cookie: {
        httpOnly: true,
        secure: IN_PRODUCTION,
        sameSite: "lax",
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ProjectsResolver, TechnologyResolver, AdminResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, redis: redisClient }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
};

main().catch((err) => console.log(err));
