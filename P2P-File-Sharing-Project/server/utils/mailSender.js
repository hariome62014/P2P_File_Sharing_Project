const nodemailer= require('nodemailer');

const mailSender  = async (email,title,body) =>{
    try{

      
          let transporter= nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user:process.env.EMAIL,
                pass:process.env.EMAIL_PASSWORD,
            }
          });

          let info = transporter.sendMail({
            from:'Hari',
       to:`${email}`,
       subject:`${title}`,
       html:`${body}`
          });
          console.log(info);
          return info;
    }
    catch(error){
      console.log("Mail send nhi ho rha h kya");
        console.log(error.message);
    }
}

module.exports=mailSender;