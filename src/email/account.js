const sgMail = require("@sendgrid/mail");

const sendgridApiKey = process.env.SENDGRID_AIP_KEY;
console.log(sendgridApiKey);

sgMail.setApiKey(sendgridApiKey);

const sendForgetPasswordEmail = (email) => {
  console.log(email);
  sgMail
    .send({
      to: email,
      from: "kuldeeptesting27@gmail.com",
      subject: "Forget Password!",
      html: '<a href = "https://relaxed-hoover-8d3f3d.netlify.app/#/newpassword">Click here</a> to forget your password',
    })
    .then((res) => {
      console.log("success");
    })
    .catch((err) => {
      console.log("error", err.response.body);
    });
};

module.exports = sendForgetPasswordEmail;
