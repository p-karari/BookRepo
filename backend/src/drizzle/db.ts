// // db.ts
// import "dotenv/config";
// import * as schema from "../drizzle/schema";
// import { Client } from "pg";
// import { drizzle } from "drizzle-orm/node-postgres";

// // Ensure dotenv is configured correctly
// const dbURL = process.env.DATABASE_URL;
// if (!dbURL) {
//   throw new Error("DATABASE_URL is not set in the environment variables");
// }

// const client = new Client({
//   connectionString: dbURL,
// });

// const main = async () => {
//   try {
//     await client.connect();
//     console.log("Connected to the database");
//   } catch (error) {
//     console.error("Failed to connect to the database", error);
//   }
// };

// main();

// const db = drizzle(client, { schema, logger: true });

// export default db;

import "dotenv/config";
import * as schema from "./schema";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
//  process.env.DB_URL as string,

const client = neon(process.env.DATABASE_URL!)

const db = drizzle(client, { schema, logger: true });

export default db;