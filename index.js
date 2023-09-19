const express = require("express");
const cors = require("cors");
const getIPRoute = require("./users/getUserRoutes")
const app = express();

const PORT = 5000;

app.use(express.json());

let corsOptions = {
    origin: "*",//To allow everyone have access to this route
    optionsSuccessStatus: 200,
    method: "GET"
}
app.use(cors(corsOptions));


//route
app.use("/api/v1", getIPRoute);


app.listen(PORT, ()=> {
    console.log(`This server is running on http://localhost:${PORT}`);
})