import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import {
  IIdentificationHandler,
  IIdentificationRepository,
} from "./interfaces/identification.interface";
import IdentificationHandler from "./handlers/identification";
import IdentificationRepository from "./repositories/identification";

const client = new PrismaClient();
const PORT = Number(process.env.PORT || 8888);
const app = express();
app.use(express.json());
app.use(cors());

const identificationRepo: IIdentificationRepository =
  new IdentificationRepository(client);
const identificationHandler: IIdentificationHandler = new IdentificationHandler(
  identificationRepo
);

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to API").end();
});

const identificationRouter = express.Router();
app.use("/identification", identificationRouter);
identificationRouter.post(
  "/create",
  identificationHandler.createIdentification
);
identificationRouter.get("/getAll", identificationHandler.getAllIdentification);

app.listen(PORT, () => {
  console.log(`API is up at ${PORT}`);
});
