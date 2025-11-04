import moduleAlias from "module-alias";
import path from "path";
import { loadEnv } from "./load_env";
import { env } from "process";

loadEnv();

const root = path.resolve(__dirname, "..");
const isProduction = env.NODE_ENV === "production";
const target = isProduction ? path.join(root, "dist") : path.join(root, "src");

moduleAlias.addAlias("@", target);
moduleAlias.addAlias("@users", path.join(target, "modules/users"));
moduleAlias.addAlias("@products", path.join(target, "modules/products"));
moduleAlias.addAlias("@core", path.join(target, "modules/core"));
moduleAlias.addAlias("@utils", path.join(target, "modules/core/utility"));
