const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    cloud_name: "dxdn0myge",
    api_key: "913636372551487",
    api_secret: "uL2yrV4_mItdW_sY-71gYc0_skg"
});

module.exports = cloudinary;
