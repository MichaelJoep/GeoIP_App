//const IPAddress = require("ip");
// const axios = require("axios");
const geoip = require("geoip-lite");


exports.getUserIPCong = async (req, res) => {
   try {
    
        let IP = (req.headers["x-forwarded-for"] || "").split(",").pop().trim() ||
        req.connection.remoteAddress || 
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress ||
        req.ip ||
        req.headers['x-appengine-user-ip'] ||
        req.headers['fastly-client-ip'];

        //const IP = IPAddress.address()


        const ipGeo = await geoip.lookup(IP);

        let notFound = IP == "::1" || IP == null || IP == undefined
        res.status(200).json({
          ip: IP,
          ...ipGeo,
          ...notFound? {error: "An error has occurred.IP address not found!"}:{}
        })

    
    } catch (error) {
    return res.status(500).json({message: error.message});
  }
}

   