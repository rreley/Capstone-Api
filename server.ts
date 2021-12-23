import express, { Application } from "express";
import fileUpload from "express-fileupload";
import helmet from "helmet";
import cors from "cors";
import { prospectEntityRouter } from "./src/pkg/routes/prospects";
import { testEntityRouter } from "./src/pkg/routes/test";
import { importEntityRouter } from "./src/pkg/routes/import";
import { analysisEntityRouter } from "./src/pkg/routes/analysis";
import { userEntityRouter } from "./src/pkg/routes/user";
import { callsEntityRouter } from "./src/pkg/routes/call";
import * as dotenv from "dotenv";

dotenv.config();

console.log("==== DB config: " + process.env.DB);
console.log("==== Config: " + process.env.MODE);
console.log("==== API Audience:" + process.env.AUTH0_AUDIENCE);

const app: Application = express();
const port: number = parseInt(process.env.PORT) || 5001;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload());

app.use("/api/prospects", prospectEntityRouter);
app.use("/api/test", testEntityRouter);
app.use("/api/import", importEntityRouter);
app.use("/api/analysis", analysisEntityRouter);
app.use("/api/users", userEntityRouter);
app.use("/api/calls", callsEntityRouter);

const server = app.listen(port, () => {
  console.log("================= API listening at port %s", port);
});

module.exports = server;
