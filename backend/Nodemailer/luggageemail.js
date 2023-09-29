const nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "mallsage34@gmail.com",
        pass: "Achi@123"

    }
})

let details = {
    from: "mallsage34@gmail.com",
    to: "novenkottage@gmail.com",
    subject: "testing out first sender"
}

mailTransporter.sendMail(details,(err)=>{
    if(err){
        console.log("it has an error", err)
    }else{
        console.log(err)
    }
})