const nodemailer = require("nodemailer");
const bookingEmitter = require("./BookingEvent");
require("dotenv").config();

// Mailtrap transporter
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Observer logic: listen for 'busBooked' and send email
bookingEmitter.on("busBooked", async ({ email, bus }) => {
  try {
    const mailOptions = {
      from: '"Transport Booking" <noreply@transport.com>',
      to: email,
      subject: "Bus Booking Confirmation",
      text: `Dear Passenger,

Thank you for booking with us.

Here are your booking details:
- Date of Journey: ${bus.date}
- Departure Time: ${bus.departureTime}
- Seat Number: ${bus.seatNumber}

Please arrive at the terminal at least 15 minutes before departure.

We wish you a pleasant journey!

Kind regards,  
Transport Booking Team`,
    };

    await transporter.sendMail(mailOptions);
    console.log("📬 Confirmation email sent to:", email);
  } catch (err) {
    console.error("❌ Error sending confirmation email:", err);
  }
});
