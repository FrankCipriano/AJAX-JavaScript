`use strict`

const app=require(`./app.js`)

app.listen(app.get(`port`),()=>{
    console.log(`Servidor escuchando en http://127.0.0.1:${app.get(`port`)}`)
})