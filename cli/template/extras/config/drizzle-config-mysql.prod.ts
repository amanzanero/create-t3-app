import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "mysql",
  dbCredentials: {
    url:
      env.PROD_DATABASE_URL ??
      throwExpression("PROD_DATABASE_URL is not defined"),
  },
  tablesFilter: ["project1_*"],
} satisfies Config;

function throwExpression(message: string): never {
  throw new Error(message);
}
