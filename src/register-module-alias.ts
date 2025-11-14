import moduleAlias from "module-alias";
import path from "path";
import { loadEnv } from "./load_env";
import { env } from "process";

loadEnv();

const root = path.resolve(__dirname, "..");
const isProduction = env.NODE_ENV === "production";
const target = isProduction ? path.join(root, "dist") : path.join(root, "src");

moduleAlias.addAlias("@", target);
moduleAlias.addAlias("@user", path.join(target, "modules/user"));
moduleAlias.addAlias("@product", path.join(target, "modules/product"));
moduleAlias.addAlias("@core", path.join(target, "modules/core"));
moduleAlias.addAlias("@utils", path.join(target, "modules/core/utility"));
