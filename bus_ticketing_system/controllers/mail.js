var nodemailer = require('nodemailer');

//create resuable transporter object using the default SMTP transport
exports.transporter = nodemailer.createTransport("SMTP",{
      service:"Gmail",
      auth:{
          XOAuth2: {
              user:"147popsy@gmail.com",
              clientId:"494603290596-l8s175su08bdtf22iddje2f84b6g65h4.apps.googleusercontent.com",
              clientSecret:"ewseQ5mAJLSQ8f3QrT800dp9",
              refreshToken:"1/y6RDVS3xyvU9z6W-W1u4B0sE4vfgN_5064rw7JClKEM"
          }
      }
  });
