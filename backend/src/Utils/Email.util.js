import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: 'undefined',
  port: 587,
  auth: {
    user: 'undefined',
    pass: 'undefined'
  }
})

// Send email with nodemailer function
export const SendEmail = (from, to, subject, text, html) => {
  return new Promise(async (resolve, reject) => {
    await transport.sendMail({
      from: from,
      to: to,
      subject: subject,
      text: text,
      html: html
    }, (error, info) => {
      if(error) return reject(error)

      return resolve(info)
    })
  })
}