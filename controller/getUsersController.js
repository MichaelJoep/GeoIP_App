const IP = require("ip");
// const axios = require("axios");
const geoip = require("geoip-lite");

const ipAddress = (req, res) => {
  let IP = (req.headers["x-forwarded-for"] || "").split(",").pop().trim() ||
        req.connection.remoteAddress || 
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress ||
        req.headers['x-appengine-user-ip'] ||
        req.headers['fastly-client-ip'];

        res.status(200).send(IP);
}


exports.getUserIPCong = async (req, res) => {
   try {
    
        
        let IP = ipAddress(req, res);

        const ipGeo = await geoip.lookup(IP);

        let notFound = IP == "::1" || IP == null || IP == undefined
        res.status(200).send({
          ip: IP,
          ...ipGeo,
          ...notFound? {error: "An error has occurred.IP address not found!"}:{}
        })

    
    } catch (error) {
    return res.status(500).json({message: error.message});
  }
}

 