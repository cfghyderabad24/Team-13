import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

import projectRouter from "./routes/project.route.js";

app.use("/api/project", projectRouter);

export default app;
