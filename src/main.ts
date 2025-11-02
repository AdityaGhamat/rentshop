import server from "./app";
import { loadEnv } from "./load_env";
import { env } from "./modules/core/utility/env";
loadEnv();
server.start(env.PORT);
