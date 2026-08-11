import router from "./routes/index.ts";
import authRouter from "./services/auth/auth.routes.ts";
import express from "express";
import cors from "cors";


const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);
app.use("/api/auth", authRouter);

app.get('/', (req, res) => {
    res.json('this is prisma and postresql project');
})

// 404 route 
app.use((req, res) => {
    res.status(404).json({
        message: "this is not found url",
    })
})


export default app;