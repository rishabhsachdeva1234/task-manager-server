import "dotenv/config";
import express from "express";
import path from "path";
import { dbConnectionInit } from "./src/db/connection.js";
import { restRouter } from "./src/components/index.js";
import cors from "cors";

const PORT = process.env.DB_PORT || 3000;
const __dirname = path.resolve();

const app = express();

//Middlewares Registration....
app.use(cors());
app.use(express.static(path.join(__dirname, "www")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", restRouter);

(async () => {
  try {
    await dbConnectionInit(process.env.DB_URL);
    app.listen(PORT, () => {
      console.log(`server is listening at port: ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
})();
