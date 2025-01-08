import express, { Express } from "express";
import { Main } from "./app/main";
import dotenv from "dotenv";
import helmet from "helmet";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

new Main(app).init();

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
