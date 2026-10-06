const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const planRoutes = require("./routes/planRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

dotenv.config();
app.use(express.json());

const PORT = process.env.PORT || 5555;

app.get("/",(req,res) =>{
    res.status(200).json({
        Message : "Working"
    })
});

app.use((req,res,next) =>{
    console.log(req.method);
    console.log(req.url);
    next();
})

app.use("/plans",planRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is listening on : http://localhost:${PORT}`);
});