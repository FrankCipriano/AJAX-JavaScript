`use strict`

const express=require(`express`),
    router=express.Router(),
    multer=require(`multer`),
    upload=multer(),
    nodemailer=require(`nodemailer`)

router.post(`/`,upload.none(),(req,res,next)=>{ 
    res.statusCode=200
    const transporter=nodemailer.createTransport({
        host:`smtp.gmail.com`,
        port:465,
        secure:true,
        auth:{
            user:`francoswordfish@gmail.com`,
            pass:`uvkyqumlwogombmf`
        }
    })
    const mailoption={
        from:`"AJAX-JavaScript 👻 ${req.body.email}" <francoswordfish@gmail.com>`,
        to:'francoswordfish@gmail.com',
        subject:req.body.asunto,
        html:`<p><ul><li>Nombre: ${req.body.nombre}</li><li>Email: ${req.body.email}</li><li>Comentario: ${req.body.comentarios}</li></ul></p>`
    }
    transporter.sendMail(mailoption,(err,data)=>{
        if(err){
            return res.send({
                error:true,
                status:400,
                statusText:`No fue posible enviar email, intentelo mas tarde`
            })
        }
        res.send({
            error:false,
            message:`Mail enviado con éxito`
        })
    })
})

module.exports=router