import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendRSVPEmail = async (userEmail, event) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: `RSVP Confirmation for ${event.title}`,
    text: `You have successfully RSVPed for the event: ${event.title} on ${event.date}. Location: ${event.location}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('RSVP Email Sent');
  } catch (error) {
    console.error('Error sending RSVP email:', error.message);
  }
};
