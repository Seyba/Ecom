const nodeMailer = require('nodemailer')
const asyncHandler = require('express-async-handler')

const sendEmail = asyncHandler(
    async(data, req, res) => {
        let transporter = nodeMailer.createTransport({
            host: "mahamadoutirera347@gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // Generated ethereal user 
                pass: testAccount.pass, // Generated ethereal password 
            }
        })

        //* Send Mail with defined tranport object
        let info = await transporter.sendMail({
            from: '"Fred Foo" <foo@example.com>', // Sender address
            to: "bar@example.com, baz@example.com", // List of receivers
            subject: "Hello World?", // Subject line
            html: "<b>Hello World?</b>", // HTML body
        })

        console.log("Message sent: %s", info.messageId)

        console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(info) )
    }
)

module.export = sendEmail