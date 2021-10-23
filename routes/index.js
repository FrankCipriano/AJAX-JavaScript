`use strict `

const express=require(`express`)
const router=express.Router()
const uploadRoute=require(`./upload`)
const sendmailRoute=require(`./send_mail`)

router.use(`/upload`,uploadRoute)
.use(`/send_mail`,sendmailRoute)
module.exports=router