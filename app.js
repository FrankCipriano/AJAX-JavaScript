`use strict`

const express=require(`express`),
    morgan=require(`morgan`)

const indexRoutes=require(`./routes/index`),
    //uploadRoute=require(`./routes/upload`),
    publicDir=express.static(`${__dirname}/public`),
    port=(process.env.PORT || 3000),
    app=express()

app.set(`port`,port)
.use(morgan(`dev`))
.use(publicDir)
.use(`/`,indexRoutes)
//.use(`/upload`,uploadRoute)

module.exports=app