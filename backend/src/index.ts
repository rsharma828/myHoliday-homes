import express, { Response, Request } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import "dotenv/config";
import cookieParser from "cookie-parser";
import path from "path";
import {v2 as cloudinary} from 'cloudinary';
import myHotelRoutes from './routes/my-hotels'



cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,

})


// mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then(() => {
        console.log("MongoDB connected : ",process.env.MONGODB_CONNECTION_STRING);
    });


// connection string - mongodb+srv://rupeshkumar9973370694:828401@Rks@test-cluster.0xe42dc.mongodb.net/?retryWrites=true&w=majority&appName=test-cluster
const app = express();
app.use(cookieParser());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended:false}))
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
app.use("/api/my-hotels",myHotelRoutes);

app.get("*",(req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname,"../../frontend/dist/index.html"));
})

app.listen(3000, () => {
    console.log("hello listening in port 3000")
});