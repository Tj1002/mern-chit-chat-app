import dotenv from "dotenv";

import { app, server } from "./app.js";
import connectDB from "./db/db.js";
dotenv.config();

connectDB()
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log("hello from server:", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(`index error`, error);
  });
