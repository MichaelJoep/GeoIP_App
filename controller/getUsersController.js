const IPAddress = require("ip");
// const axios = require("axios");
const geoip = require("geoip-lite");


exports.getUserIPCong = async (req, res) => {
   try {
    
        // let IP = (req.headers["x-forwarded-for"] || "").split(",").pop().trim() ||
        // req.connection.remoteAddress || 
        // req.socket.remoteAddress ||
        // req.connection.socket.remoteAddress ||
        // req.headers['x-appengine-user-ip'] ||
        // req.headers['fastly-client-ip'];

        const IP = IPAddress.address()


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
//https://iplocation-app.vercel.app/api/v1/getUserIP

  // let ipAddress = await axios.get(ipURL).then(res => res.json());
                    
  // res.status(200).send(ipAddress);
  // console.log(ipAddress)


//API Key from AbstractAPI Geolocation API homepage
// const API_KEY = 'YOUR_API_KEY';
// const URL = 'https://ipgeolocation.abstractapi.com/v1/?api_key=' + API_KEY;

// const sendAPIRequest = async (ipAddress) => {
//     const apiResponse = await axios.get(URL + "&ip_address=" + ipAddress);
//     return apiResponse.data;
// }

// const ipAddress = await IP.address();
    // if(!ipAddress) {
    //     return res. status(404).send({
    //         success: false,
    //         message: "IP not found"
    //     });

    // }

    // const ipDetails = geoip.lookup(ipAddress)
    // res.status(200).send(ipDetails)
    // console.log(ipDetails);


    
    // res.status(200).json({
    //     IP: ipDetails.ipAddress,
    //     MAC: ipDetails.mac,
    //     DNS: ipDetails.dns,
    //     Country: ipDetails.country,
    //     State: ipDetails.region,
    //     City: ipDetails.city
    // });

    // console.log(req.socket.remoteAddress);
    // console.log(req.ip)
    // res.send("your ip is: " + IP.address());

    
   