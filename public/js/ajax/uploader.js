const d=document

const subir=(archivo)=>{
    //console.log(archivo)
    const xhr=new XMLHttpRequest(),
    formData=new FormData()
    formData.append(`archivo`,archivo)
    xhr.addEventListener(`readystatechange`,(e)=>{
        if(xhr.readyState!==4)  return
        if(xhr.status>=200 && xhr.status<300){
            let datoJSON=JSON.parse(xhr.responseText)
            console.log(datoJSON)
        }else{
            let mensaje=xhr.statusText || `Ocurrió un error`
            console.log(`Error ${xhr.status}: ${mensaje}`)
        }
    })
    xhr.open(`POST`,`http://127.0.0.1:3000/upload`)
    xhr.setRequestHeader(`enc-type`,`multipart/form-data`)
    xhr.send(formData)
}

const progresoDeCarga=(archivo,etiquetamain,etiquetafile)=>{
    const $progress=d.createElement(`progress`),
        $span=d.createElement(`span`),
        $main=etiquetamain,
        $files=etiquetafile

    $progress.value=0
    $progress.max=100

    $main.insertAdjacentElement(`beforeend`,$progress)
    $main.insertAdjacentElement(`beforeend`,$span)

    const fileReader=new FileReader()
    fileReader.readAsDataURL(archivo)

    fileReader.addEventListener(`progress`,(e)=>{
        //console.log(e)
        let progreso=parseInt((e.loaded*100)/e.total)
        $progress.value=progreso
        $span.innerHTML=`<b>${archivo.name} - ${progreso}%</b>`
    })
    fileReader.addEventListener(`loadend`,(e)=>{
        subir(archivo)
        setTimeout(()=>{
            $main.removeChild($progress)
            $main.removeChild($span)
            $files.value=``
        },3000)
    })
}

const subirArchivo=(etiquetamain,etiquetafile)=>{
    d.addEventListener(`change`,(e)=>{
        const $main=d.querySelector(etiquetamain),
            $files=d.getElementById(etiquetafile)
        if(e.target===$files){
            //console.log(e.target.files)
            const archivos=Array.from(e.target.files)
            archivos.forEach((archivo)=>progresoDeCarga(archivo,$main,$files))
        }
    })
}
export default subirArchivo