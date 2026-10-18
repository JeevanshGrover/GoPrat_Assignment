import express from "express"
import cors from "cors"

const app = express();

app.use(express.json({ limit: "16kb"}))
app.use(express.urlencoded({ extended: true, limit: "16kb"}))

const allowedOrigin =
    process.env.CORS_ORIGIN ||
    (process.env.NODE_ENV === "development"
        ? "http://localhost:5000"
        : "");

app.use(cors({
    origin: allowedOrigin,
    credentials: true
}))

import requirementRouter from "./routes/requirement.route.js"
app.use("/api/v1/requirements", requirementRouter)

export { app }