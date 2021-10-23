`use strict`

const express=require(`express`)
const router=express.Router()
const formidable=require(`formidable`)
const fse=require(`fs-extra`)

router.post(`/`,(req,res,next)=>{
    const form=formidable({multiples:true})
    form.parse(req,(error,fields,files)=>{
        res.statusCode=200
    }).on(`end`,function(fields,files){
        let ruta_temporal=this.openedFiles[0].path
        let nombre_archivo=this.openedFiles[0].name
        let ruta_nueva=`./subidos/${nombre_archivo}`
        fse.copy(ruta_temporal,ruta_nueva,(error)=>{
            if (error){
                return res.send({
                    error:true,
                    statusCode:res.statusCode=400,
                    statusText:`Error al subir el archivo ${nombre_archivo}`,
                    file:util.inspect({files:files})
                })
            }
            res.send({
                error:false,
                statusCode:res.statusCode=200,
                statusText:`Archivo ${nombre_archivo} subido con éxito`,
                file:this.openedFiles[0]
            })
        })
    })
    return
})

module.exports=router