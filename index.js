
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config(); 

const app = express();
app.use(cors()); 
app.use(express.json()); 


app.post("/send", async (req, res) => {
  const { user_name, user_email, user_phone, message } = req.body;

  
  const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

 
  const mailOptions = {
    from: user_email,
    to: process.env.EMAIL_USER,
    subject: `Contact Form Message from ${user_name}`,
    text: `
    Name: ${user_name}
    Email: ${user_email}
    Phone: ${user_phone}
    Message: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
