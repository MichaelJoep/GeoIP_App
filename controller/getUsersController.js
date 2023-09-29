const IPAddress = require("ip");
//const os = require("os")
const geoip = require("geoip-lite");
//const getGeoData = require("@sasmeee/ip-locator");
const getMac = require("getmac");


exports.getUserIPCong = async (req, res) => {
   try {
    
        let PublicIP = (req.headers["x-forwarded-for"] || "").split(",").pop().trim() ||
        req.headers['cf-connecting-ip'] ||
        req.headers['x-real-ip'] ||
         req.headers['True-Client-IP'] ||
        req.headers['x-appengine-user-ip'] ||
        req.headers['fastly-client-ip'] ||
        req.connection.remoteAddress || 
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress ||
        req.ip;
       
        const deviceIP = IPAddress.address();
      //  const mac_add = os.networkInterfaces()
      //  req.session = mac_add
      const mac_add = getMac.default();


        let getGeoipInfo = await geoip.lookup(PublicIP);
        

        let notFound = PublicIP == "::1" || PublicIP == null || PublicIP == undefined
        res.status(200).json({
          "Local Device IP ": deviceIP,
          ip: PublicIP,
          mac_add,
          ...getGeoipInfo,
          ...notFound? {error: "An error has occurred.IP address not found!"}:{}
        })

        //console.log(mac_add)

    
    } catch (error) {
    return res.status(500).json({message: error.message});
  }
}
