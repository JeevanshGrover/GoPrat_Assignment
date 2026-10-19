import express from "express"
import cors from "cors"

const app = express();

app.use(express.json({ limit: "16kb"}))
app.use(express.urlencoded({ extended: true, limit: "16kb"}))

const allowedOrigin =
    process.env.CORS_ORIGIN ||
    (process.env.NODE_ENV === "development"
        ? "http://localhost:5000"
        : "https://go-prat.vercel.app");

const allowedOrigins = allowedOrigin
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(cors({
    origin(origin, callback) {
        callback(null, !origin || allowedOrigins.includes(origin));
    },
    credentials: true
}))

app.get("/api/health", (_req, res) => {
    res.status(200).json({ healthy: true });
});

import requirementRouter from "./routes/requirement.route.js"
app.use("/api/v1/requirements", requirementRouter)

export { app }