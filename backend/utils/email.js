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

export const sendEmailNotification = (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

export const sendBlogPostNotification = async (userEmail, blogPost) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: `New Blog Post: ${blogPost.title}`,
    text: `Check out the new blog post titled: ${blogPost.title}.\n\n${blogPost.summary}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Blog Post Notification Sent');
  } catch (error) {
    console.error('Error sending blog post notification:', error.message);
  }
};

export const sendEventPostNotification = async (userEmail, eventPost) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: `New Event Post: ${eventPost.title, eventPost.description, eventPost.date }`,
    text: `Check out the new Event post titled: ${Event.title, Event.description, Event.date }.\n\n${eventPost.summary}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Event Post Notification Sent');
  } catch (error) {
    console.error('Error sending eventpost notification:', error.message);
  }
};

export const sendResourcePostNotification = async (userEmail, resourcePost) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: `New Resource Post: ${resourcePost.title}`,
    text: `Check out the new Resource post titled: ${Resource.title }.\n\n${resourcePost.summary}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Resource Post Notification Sent');
  } catch (error) {
    console.error('Error sending resourcepost notification:', error.message);
  }
};
