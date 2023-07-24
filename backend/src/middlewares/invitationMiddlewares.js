/* eslint-disable camelcase */
const nodemailer = require("nodemailer");
const models = require("../models");
require("dotenv").config();

const invitationVerifyUserExists = (req, res, next) => {
  const { email } = req.body;
  models.user.getUserByMail(email).then(([rows]) => {
    const rowsLength = rows.length;
    if (rowsLength > 0) {
      req.userExist = true;
      req.body.user_id = rows[0].id;
      req.user_firstname = rows[0].firstname;
    } else {
      req.userExist = false;
    }
    next();
  });
};

const invitationVerifyUserInCompany = (req, res, next) => {
  const { company_id } = req.params;
  const { user_id } = req.body;
  models.user.getUserInCompanyById(company_id, user_id).then(([rows]) => {
    const rowsLength = rows.length;
    if (rowsLength > 0) {
      req.userInCompany = true;
    } else {
      req.userInCompany = false;
    }
    next();
  });
};

const invitationVerifyUserInTeam = (req, res, next) => {
  const { team_id, user_id } = req.params;

  models.user.getUsersInTeam(team_id, user_id).then(([rows]) => {
    const rowsLength = rows.length;
    if (rowsLength > 0) {
      req.userInTeam = true;
    } else {
      req.userInTeam = false;
    }
    next();
  });
};

const sendInvitationMail = (req, res, next) => {
  const {
    email,
    company_name,
    newTempPassword,
    grey50,
    primary600,
    company_slug,
  } = req.body;
  const { userExist, userInCompany, user_firstname } = req;

  const emailSender = "IdeasForce <ne-pas-repondre@ideasforce.fr>";

  const activationLink = `${process.env.FRONTEND_URL}/${company_slug}/invitation?email=${email}&activation_code=${newTempPassword}`;

  const connexionLink = `${process.env.FRONTEND_URL}/${company_slug}/`;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_BREVO,
    port: process.env.SMTP_PORT_BREVO,
    secure: false,
    auth: {
      user: process.env.SMTP_BREVO_USER,
      pass: process.env.SMTP_BREVO_PASSWORD,
    },
  });

  let mailOptions = {};
  if (userExist && !userInCompany) {
    mailOptions = {
      from: emailSender,
      to: email,
      subject: `Invitation à rejoindre ${company_name}`,
      text: `Bonjour${user_firstname ? ` ${user_firstname}` : ""},
      \n\n

      Vous avez été invité à rejoindre l'entreprise ${company_name} sur la plateforme IdeasForce. Connectez vous en cliquant sur le lien suivant :\n\n
      
      ${connexionLink}\n\n
      
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
          <span class="preheader" style="display: none !important; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">Rejoingnez ${company_name} sur IdeasForce</span>
          <div style="font-family:Verdana; font-size: 18px ;">
              <div style="background-color: ${grey50}; padding: 20px; border-radius: 12px;">
                  <p>Bonjour${user_firstname ? ` ${user_firstname}` : ""},</p>
                  <p>Vous avez été invité à rejoindre l'entreprise <b>${company_name}</b> sur la plateforme IdeasForce. Connectez vous en cliquant sur le bouton suivant :</p>
      
                  <a style="background-color: ${primary600}; border-radius: 8px; text-decoration: none; padding: 10px 18px; text-align: center; color:#fff;" href="${connexionLink}">Je me connecte</a></br>
                  <p>Bonne journée,</p>
                  <p>L'Équipe d'IdeasForce</p>
              </div>
          </div>
      </body>
      `,
    };
  } else if (userExist && userInCompany) {
    mailOptions = {
      from: emailSender,
      to: email,
      subject: `RAPPEL : Invitation à rejoindre ${company_name}`,
      text: `
      Bonjour${user_firstname ? ` ${user_firstname}` : ""},\n\n

      Vous avez aviez été invité à rejoindre l'entreprise ${company_name} sur la plateforme IdeasForce. Connectez vous en cliquant sur le lien suivant :\n\n
      
      ${connexionLink}\n\n
      
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
          <span class="preheader" style="display: none !important; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">Rejoingnez ${company_name}</span>
          <div style="font-family:Verdana; font-size: 18px ;">
              <div style="background-color: ${grey50}; padding: 20px; border-radius: 12px;">
                  <p>Bonjour${user_firstname ? ` ${user_firstname}` : ""},</p>
                  <p>Vous aviez été invité à rejoindre l'entreprise <b>${company_name}</b> sur la plateforme IdeasForce. Connectez vous en cliquant sur le bouton suivant :</p>
      
                  <a style="background-color: ${primary600}; border-radius: 8px; text-decoration: none; padding: 10px 18px; text-align: center; color:#fff;" href="${connexionLink}">Je me connecte</a></br>
                  <p>Bonne journée,</p>
                  <p>L'Équipe d'IdeasForce</p>
              </div>
          </div>
      </body>
      `,
    };
  } else {
    mailOptions = {
      from: emailSender,
      to: email,
      subject: `Invitation à rejoindre ${company_name}`,
      text: `
      Bonjour,\n\n

      Vous avez été invité à rejoindre l'entreprise ${company_name} sur la plateforme IdeasForce. Validez votre compte en cliquant sur le lien suivant :\n\n
      
      ${activationLink}\n\n
      
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
          <span class="preheader" style="display: none !important; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">Rejoingnez ${company_name}</span>
          <div style="font-family:Verdana; font-size: 18px ;">
              <div style="background-color: ${grey50}; padding: 20px; border-radius: 12px;">
                  <p>Bonjour,</p>
                  <p>Vous avez été invité à rejoindre l'entreprise <b>${company_name}</b> sur la plateforme IdeasForce. Validez votre compte en cliquant sur le bouton suivant :</p>
      
                  <a style="background-color: ${primary600}; border-radius: 8px; text-decoration: none; padding: 10px 18px; text-align: center; color:#fff;" href="${activationLink}">Valider mon compte</a></br>
                  <p>Bonne journée,</p>
                  <p>L'Équipe d'IdeasForce</p>
              </div>
          </div>
      </body>
  `,
    };
  }

  transporter
    .sendMail(mailOptions)
    .then(() => {
      delete req.body.newTempPassword;
      next();
    })
    .catch((err) => {
      console.warn(err);
      res.status(500).send("Something went wrong during the email sending");
    });
};

const invitationNewUser = (req, res, next) => {
  const { userExist } = req;
  if (!userExist) {
    models.user
      .createUser(req.body)
      .then(([rows]) => {
        if (rows.affectedRows) {
          req.body.user_id = rows.insertId;
          next();
        } else {
          res.sendStatus(404);
        }
      })
      .catch((err) => {
        if (err.code === "ER_DUP_ENTRY") {
          res.sendStatus(409);
        } else {
          console.error(err);
          res.sendStatus(500);
        }
      });
  } else {
    next();
  }
};

module.exports = {
  invitationVerifyUserExists,
  invitationVerifyUserInCompany,
  invitationVerifyUserInTeam,
  invitationNewUser,
  sendInvitationMail,
};
