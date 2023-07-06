require('dotenv').config()
const Contact = require('../Models/mailModel')
const nodemailer = require('nodemailer')

//transport  function
exports.mail = async (req, res, next) => {

    const newContact = new Contact(req.body);
    try {
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.PASSWORD
            }
        })

        let mailOptions = {
            from: `"${newContact.email}" <${newContact.fname}>`, // sender address  ,
            to: process.env.EMAIL,

            subject: "OPPORTUNITY MENTORING WEBSITE EMAIL ",

            html: `<p>Name: ${newContact.fname} ${newContact.lastname} </p>
               <p>Email: ${newContact.email}</p>
               <p>Message: ${newContact.message}</p>`,
        }
        const replyMessage = {
            from: `"MENTORING TEAM" <${process.env.EMAIL}`,
            to: newContact.email,
            // replyTo: fname,

            subject: "Reply FROM COMPANY MENTORING ",
            html: ` 
            <p>Thank You  ${newContact.fname} ${newContact.lastname}</p> <br>
            <p>for sending us Your message </p> <br>
            <p>WE WILL REPLY TO YOU AS SOON AS WE CAN `
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
            }
            console.log("Email Sent with success")

            res.redirect("/")

        })
        transporter.sendMail(replyMessage, (error) => {
            if (error) {
                console.log(error)
            }
            console.log("Reply Sent with success")
        })


        res.status(201).json({
            success: true,
            newContact,

        })


    } catch (error) {
        console.log(error);
        next(error);

    }

}

//  get the message function controller
exports.contact = async (req, res) => {

    try {
        const contact = await Contact.find({});
        res.status(200).send(contact)

    } catch (error) {
        console.log(error)
    }

}