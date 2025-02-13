const nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "",
        pass: ""

    }
})

let details = {
    from: "",
    to: "",
    subject: "testing out first sender"
}

mailTransporter.sendMail(details,(err)=>{
    if(err){
        console.log("it has an error", err)
    }else{
        console.log(err)
    }
})
