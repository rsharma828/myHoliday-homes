import express, { Response, Request } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import "dotenv/config";
import cookieParser from "cookie-parser";
import path from "path";

// mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then(() => {
        console.log("MongoDB connected : ",process.env.MONGODB_CONNECTION_STRING);
    });


// connection string - mongodb+srv://rupeshkumar9973370694:828401@Rks@test-cluster.0xe42dc.mongodb.net/?retryWrites=true&w=majority&appName=test-cluster
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', "*");
//     next();
// });

app.use(express.static(path.join(__dirname,"../../frontend/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);



app.listen(3000, () => {
    console.log("hello listening in port 3000")
});