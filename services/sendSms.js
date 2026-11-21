require('dotenv').config();
const accountSid = process.env.ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.AUTH_TOKEN; // Your Auth Token from www.twilio.com/console

const { CronJob } = require('cron');
const twilio = require('twilio');
const Medication = require('../models/Medication');
const fromNumber = process.env.TWILIO_FROM; // A valid Twilio number, e.g. +15550100000

// Without Twilio credentials, or with SMS_DISABLED=true, reminders are logged instead of sent.
const smsEnabled =
  process.env.SMS_DISABLED !== 'true' && Boolean(accountSid && authToken);
const client = smsEnabled
  ? new twilio(accountSid, authToken)
  : {
      messages: {
        create: async () => {
          console.log('SMS disabled: reminder not sent');
          return { sid: 'sms-disabled' };
        },
      },
    };

if (!smsEnabled) {
  console.log('SMS sending disabled (SMS_DISABLED=true or Twilio credentials missing)');
}

Medication.find({})
  .then((data) => {
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
              .then((message) => console.log(message.sid))
              .catch((error) => console.error(error));
          },
          null,
          true
        );
      }
    });
  })
  .catch((error) => console.error(error));
