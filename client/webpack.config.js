const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: path.resolve(__dirname,'public','product_images'),
            to: path.join(__dirname,'dist','images'),
            noErrorOnMissing:true
           },
        ],
      }),
    ],
  };