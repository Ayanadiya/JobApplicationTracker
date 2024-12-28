const cron = require('node-cron');
const moment = require('moment');
const User=require('../Model/user');
const Application=require('../Model/application');
const Reminder=require('../Model/reminder');
const Sib = require('sib-api-v3-sdk');

// Function to send reminder email
const sendReminderEmail = async (reminder) => {
  try {
    const user = await User.findByPk(reminder.userId);
    const application = await Application.findByPk(reminder.applicationId);

    const client = Sib.ApiClient.instance;
    const apiKey = client.authentications['api-key'];
    apiKey.apiKey = process.env.API_KEY;

    const tranEmailApi = new Sib.TransactionalEmailsApi();
    const sender = { email: 'ayanadiya17@gmail.com' };  // Set your sender email
    const receiver = [{ email: user.email }];
    const subject = `Reminder: Job Application for ${application.jobtitle}`;
    const textContent = `Hi ${user.username},\n\nThis is a reminder about your application for the ${application.jobtitle} position at ${application.company}.\n\nBest of luck!`;

    await tranEmailApi.sendTransacEmail({
      sender,
      to: receiver,
      subject,
      textContent,
      htmlContent: `<p>Hi ${user.name},</p><p>This is a reminder about your application for the <strong>${application.jobtitle}</strong> position at <strong>${application.company}</strong>.</p><p>Best of luck!</p>`,
    });

    // Update reminder status to 'sent'
    reminder.status = 'sent';
    await reminder.save();

    console.log('Reminder email sent successfully');
  } catch (error) {
    console.log('Error sending reminder email:', error);
  }
};

// Cron job to run every day at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    // Get reminders for today
    const today = moment().startOf('day');
    const reminders = await Reminder.findAll({
      where: {
        reminderDate: today.toDate(),
        status: 'pending',  // Only send unsent reminders
      },
    });

    // Send emails for each reminder
    reminders.forEach(async (reminder) => {
      await sendReminderEmail(reminder);
    });
  } catch (error) {
    console.log('Error checking reminders:', error);
  }
});