"use strict"
const nodemailer = require("nodemailer")
var logger = require('../../config/winston');

class MailerBL
{
    async mailerBL(content){
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'info@divit-tech.com',
            pass: 'Divit@2019'
        }
    })

    let mailOptions = {
        from: 'dit.kumar.aman@gmail.com',
        to: content.toMail,
        subject: content.subject,
        text: content.body,
        /*html: content.body*/
    }
    console.log("mail options")
    console.log(mailOptions)
    await transporter.sendMail(mailOptions, function(error, info){
        console.log(info)
        if(error){
            return error
        }
        else{
            return info.response
        }
    })
} 

}

module.exports = MailerBL;