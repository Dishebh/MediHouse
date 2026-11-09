require('dotenv').config();
const accountSid = process.env.ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.AUTH_TOKEN; // Your Auth Token from www.twilio.com/console

const { CronJob } = require('cron');
const twilio = require('twilio');
const Medication = require('../models/Medication');
const client = new twilio(accountSid, authToken);
const fromNumber = process.env.TWILIO_FROM; // A valid Twilio number, e.g. +15550100000

Medication.find({}).then((data) => {
  data.forEach((medication) => {
    if (medication.cronValue && medication.cronValue.length > 0) {
      console.log('Scheduled reminder for medication', medication._id);
      new CronJob(
        medication.cronValue,
        function () {
          client.messages
            .create({
              to: medication.phone,
              from: fromNumber,
              body: 'Hello! Please take your medication.',
            })
            .then((message) => console.log(message.sid));
        },
        null,
        true
      );
    }
  });
});
