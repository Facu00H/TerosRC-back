const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const {
  GOOGLE_ID,
  GOOGLE_SECRET,
  GOOGLE_URL,
  GOOGLE_REFRESH,
  GOOGLE_USER,
} = process.env;

const sendMail = async (mail, code) => {
  const myOAuth2Client = new OAuth2(
      GOOGLE_ID,
      GOOGLE_SECRET,
      GOOGLE_URL,
  );
  myOAuth2Client.setCredentials({refresh_token: GOOGLE_REFRESH});

  const accessToken = myOAuth2Client.getAccessToken();
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GOOGLE_USER,
      type: 'OAuth2',
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
      refreshToken: GOOGLE_REFRESH,
      accessToken: accessToken,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    form: 'LOS TEROS RC',
    to: mail,
    subject: 'Verifica tu cuenta!',
    html: `<a href='http://localhost:4000/user/${code}'>Haz click aqui par verificar tu cuenta</a>`,
  };
  await transport.sendMail(mailOptions, (error, response) => {
    console.log('enviado');
    if (error) {
      console.log(error);
    } else {
      console.log('mail send to '+mail);
      console.log(response);
    };
  });
};

module.exports = sendMail;
