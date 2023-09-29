const express = require("express");
const cors = require("cors");
const getIPRoute = require("./users/getUserRoutes")
const app = express();

const PORT = 5000;



let corsOptions = {
    origin: "*",//To allow everyone have access to this route
    optionsSuccessStatus: 200,
    method: "GET"
}

//middleware functions
app.use(cors(corsOptions));
app.use(express.json());


//route
app.use("/api/v1", getIPRoute);


app.listen(PORT, ()=> {
    console.log(`This server is running on http://localhost:${PORT}`);
})