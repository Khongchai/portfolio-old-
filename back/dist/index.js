"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const apollo_server_express_1 = require("apollo-server-express");
const ProjectResolver_1 = require("./resolvers/ProjectResolver");
const TechnologyResolver_1 = require("./resolvers/TechnologyResolver");
const typeorm_1 = require("typeorm");
const ProjectEntity_1 = require("./entities/ProjectEntity");
const TechnologyEntity_1 = require("./entities/TechnologyEntity");
const redis_1 = __importDefault(require("redis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const constants_1 = require("./constants");
const AdminEntity_1 = require("./entities/AdminEntity");
const AdminResolver_1 = require("./resolvers/AdminResolver");
dotenv_1.default.config();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield typeorm_1.createConnection({
        type: "postgres",
        migrations: [path_1.default.join(__dirname, "/migrations/*")],
        logging: true,
        url: process.env.DATABASE_URL,
        host: "postgresql",
        migrationsRun: false,
        entities: [ProjectEntity_1.ProjectEntity, TechnologyEntity_1.TechnologyEntity, AdminEntity_1.AdminEntity],
    });
    const app = express_1.default();
    app.set("proxy", 1);
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redisClient = redis_1.default.createClient({ url: process.env.REDIS_URL });
    app.use(express_session_1.default({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({
            client: redisClient,
            disableTTL: true,
        }),
        cookie: {
            httpOnly: true,
            secure: constants_1.IN_PRODUCTION,
            sameSite: "lax",
        },
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET,
        resave: false,
    }));
    app.use(cors_1.default({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [ProjectResolver_1.ProjectsResolver, TechnologyResolver_1.TechnologyResolver, AdminResolver_1.AdminResolver],
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
});
main().catch((err) => console.log(err));
//# sourceMappingURL=index.js.map