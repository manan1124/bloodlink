const nodemailer = require('nodemailer');

let transporter;

// Create a mock email account using Ethereal so we can test emails without real credentials
nodemailer.createTestAccount((err, account) => {
    if (err) {
        console.error('Failed to create a testing email account. ' + err.message);
        return;
    }

    // Set up the transporter with the test account
    transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || account.smtp.host,
        port: process.env.SMTP_PORT || account.smtp.port,
        secure: account.smtp.secure,
        auth: {
            user: process.env.SMTP_USER || account.user,
            pass: process.env.SMTP_PASS || account.pass
        }
    });
    console.log('Email Notification System Ready (Using Ethereal Mail for testing)');
});

exports.sendBulkEmail = async (donors, request) => {
  if (!donors || donors.length === 0) {
    console.log('No matching donors found in that city. Email skipped.');
    return;
  }
  
  if (!transporter) {
    console.log("Email system is still initializing, please try again in a few seconds.");
    return;
  }

  // Comma separated list of all compatible donor emails
  const emails = donors.map(d => d.email).join(',');
  
  const mailOptions = {
    from: '"BloodLink Urgent" <noreply@bloodlink.com>',
    to: emails,
    subject: `🚨 Urgent Blood Request: ${request.bloodGroup} needed at ${request.hospital}`,
    html: `
      <h2>Urgent Blood Donation Needed!</h2>
      <p>Hello,</p>
      <p>A new blood request for <strong>${request.units} units of ${request.bloodGroup}</strong> has been raised at <strong>${request.hospital}, ${request.city}</strong>.</p>
      <p>Urgency Level: <strong style="color:red;">${request.urgency}</strong></p>
      <p>Emergency Contact: ${request.contactPhone}</p>
      <br/>
      <p>Because your registered blood type is compatible with ${request.bloodGroup}, you can save a life today. Please log in to your BloodLink dashboard to view more details.</p>
      <br/>
      <p>Thank you,</p>
      <p>The BloodLink Team</p>
    `
  };
  
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('\n-----------------------------------------');
    console.log(`✅ Emails successfully sent to ${donors.length} compatible donors in ${request.city}!`);
    console.log(`📧 VIEW EMAIL PREVIEW HERE: ${nodemailer.getTestMessageUrl(info)}`);
    console.log('-----------------------------------------\n');
  } catch (err) {
    console.error('Error sending emails', err);
  }
};
