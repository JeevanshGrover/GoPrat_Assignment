import connectDB from "./db/db.js";
import dotenv from "dotenv"
import { app } from "./app.js"

dotenv.config();

connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running at port : ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("MongoDB connection failed !! ", err);
})