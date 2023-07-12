/* eslint-disable camelcase */
const nodemailer = require("nodemailer");
const models = require("../models");
require("dotenv").config();

const passwordResetVerifyUserExists = (req, res, next) => {
  const { email, primary600, grey50, company_slug } = req.body;
  models.user.getUserByMail(email).then(([rows]) => {
    const rowsLength = rows.length;
    if (rowsLength > 0) {
      req.user_id = rows[0].id;
      req.emailInfos = {
        email,
        primary600,
        grey50,
        company_slug,
        user_firstname: rows[0].firstname,
        user_id: rows[0].id,
      };
      delete req.body.email;
      delete req.body.primary600;
      delete req.body.grey50;
      delete req.body.company_slug;
      next();
    } else {
      res.status(404).send("User not found");
    }
  });
};

const passwordResetUpdateUserProfile = (req, res, next) => {
  const { user_id } = req.emailInfos;

  req.emailInfos.newTempPassword = req.body.newTempPassword;
  delete req.body.newTempPassword;

  if (req.body.hashed_password) {
    req.body.password = req.body.hashed_password;
    delete req.body.hashed_password;
  }
  models.user
    .modifyUserProfile(user_id, req.body)
    .then(([rows]) => {
      delete req.body.password;
      if (rows) {
        next();
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const sendResetPasswordMail = (req, res) => {
  const {
    email,
    newTempPassword,
    grey50,
    primary600,
    company_slug,
    user_firstname,
  } = req.emailInfos;

  const emailSender = "IdeasForce <ne-pas-repondre@ideasforce.fr>";

  const passwordResetLink = `${process.env.FRONTEND_URL}/${company_slug}/new-password?email=${email}&temporary_code=${newTempPassword}`;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_BREVO,
    port: process.env.SMTP_PORT_BREVO,
    secure: false,
    auth: {
      user: process.env.SMTP_BREVO_USER,
      pass: process.env.SMTP_BREVO_PASSWORD,
    },
  });

  const mailOptions = {
    from: emailSender,
    to: email,
    subject: `Réinitialisation de votre mot de passe`,
    text: `Bonjour${user_firstname ? ` ${user_firstname}` : ""},
    \n\n

    Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le lien suivant pour le mettre à jour.\n\n
    
    ${passwordResetLink}\n\n
    
    Bonne journée,\n\n
    L'Équipe d'IdeasForce`,
    html: `
    <head>
        <style>
            .preheader {
                display: none !important;
                visibility: hidden;
                opacity: 0;
                color: transparent;
                height: 0;
                width: 0;
            }
        </style>
    </head>
    
    <body>
        <span class="preheader" style="display: none !important; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">Réinitialisez votre mot de passe IdeasForce</span>
        <div style="font-family:Verdana; font-size: 18px ;">
            <div style="background-color: ${grey50}; padding: 20px; border-radius: 12px;">
                <p>Bonjour${user_firstname ? ` ${user_firstname}` : ""},</p>
                <p> Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le lien suivant pour le mettre à jour.</p>
    
                <a style="background-color: ${primary600}; border-radius: 8px; text-decoration: none; padding: 10px 18px; text-align: center; color:#fff;" href="${passwordResetLink}">Je réinitialise mon mot de passe</a></br>
                <p>Bonne journée,</p>
                <p>L'Équipe d'IdeasForce</p>
            </div>
        </div>
    </body>
    `,
  };

  transporter
    .sendMail(mailOptions)
    .then(() => {
      res.status(200).send("L'email a bien été envoyé");
    })
    .catch((err) => {
      console.warn(err);
      res.status(500).send("Something went wrong during the email sending");
    });
};

module.exports = {
  sendResetPasswordMail,
  passwordResetVerifyUserExists,
  passwordResetUpdateUserProfile,
};
