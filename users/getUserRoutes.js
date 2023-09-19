const express = require("express");
const { getUserIPCong } = require("../controller/getUsersController");
const router = express.Router();

router.get("/getUserIP", getUserIPCong);

module.exports = router;