const nodemailer = require('nodemailer');

// Use test account if no credentials are provided
async function getTransporter() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('Using Ethereal Mail test account for development');
    const testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
  }

  return nodemailer.createTransport({
    service: 'gmail', // or your preferred service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

async function sendPriceDropEmail(to, productTitle, oldPrice, newPrice, url) {
  try {
    const transporter = await getTransporter();
    
    const info = await transporter.sendMail({
      from: '"SmartCart Tracker" <noreply@smartcart.com>',
      to: to,
      subject: `Price Drop Alert: ${productTitle}`,
      html: `
        <h2>Good news!</h2>
        <p>The price for <strong>${productTitle}</strong> has dropped!</p>
        <ul>
          <li><strong>Old Price:</strong> ₹${oldPrice}</li>
          <li><strong>New Price:</strong> ₹${newPrice}</li>
        </ul>
        <p><a href="${url}">Click here to view the product</a></p>
      `,
    });

    console.log('Message sent: %s', info.messageId);
    if (!process.env.EMAIL_USER) {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
  } catch (error) {
    console.error('Email sending failed:', error);
  }
}

module.exports = { sendPriceDropEmail };
