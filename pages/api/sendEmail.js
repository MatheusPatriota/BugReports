// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const nodemailer = require('nodemailer');

export default function sendEmail(req, res) {
  let transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL,
      password: process.env.NEXT_PUBLIC_EMAIL_PASSWORD
    }
  })
  console.log(process.env.NEXT_PUBLIC_EMAI)
  await transporter.sendMail({
    from: `"BugReports" <${process.env.NEXT_PUBLIC_EMAIL}>`, // sender address
    to: process.env.NEXT_PUBLIC_EMAIL,
    replyTo: req.body.email,// list of receivers
    subject: "Status de Ocorrência Atualizado ✔", // Subject line
    text: req.body.message, // plain text body
    html: `<b>${req.body.name}</b> <br/> ${req.body.message}`, // html body
  }).then(response => {
    res.send(response)
  }).catch(err => {
    res.send(err)
  });
}
