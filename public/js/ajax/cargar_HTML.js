const d=document
const cargarContenido=(parametros)=>{
    let{url,exito,error}=parametros
    const xhr=new XMLHttpRequest()

    xhr.addEventListener(`readystatechange`,(e)=>{
        if(xhr.readyState!==4)  return
        if(xhr.status>=200 && xhr.status<300){
            let html=xhr.responseText
            exito(html)
        }else{
            let mensaje=xhr.statusText || `Ocurrio un error`
            error(`Error ${xhr.status}: ${mensaje}`)
        }
    })
    xhr.open(`GET`,url)
    xhr.setRequestHeader(`Content-type`,`text/html;charset=utf-8`)
    xhr.send()   
}
export const cargarContenidoEnlace=(etiquetamain,enlaces)=>{
    const $main=d.querySelector(etiquetamain)
    d.addEventListener(`click`,(e)=>{
        if(e.target.matches(enlaces)){
            e.preventDefault()
            cargarContenido({
                url:e.target.href,
                exito:(html)=>$main.innerHTML=html,
                error:(err)=>$main.innerHTML=`<h1>${err}</h1>`
            })
        }
    })
}

export default cargarContenido