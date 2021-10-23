document.addEventListener(`DOMContentLoaded`,(e)=>{
    const cargarHeaderFooter=(elemento,url)=>{
        const xhr=new XMLHttpRequest()
        xhr.addEventListener(`readystatechange`,(e)=>{
            if(xhr.readyState!==4)  return
            if(xhr.status>=200 && xhr.status<300){
                elemento.outerHTML=xhr.responseText
            }else{
                let mensaje=xhr.statusText || `La carga del contenido no es posible si no se esta cargando desde un servidor web`
                elemento.outerHTML=`<div><p>Error ${xhr.status}: ${mensaje}</p></div>`
            }
        })
        xhr.open(`GET`,url)
        xhr.setRequestHeader(`Content-type`,`text/html;charset=utf-8`)
        xhr.send()
    }
    document.querySelectorAll(`[data-include]`).forEach((elemento)=>{
        cargarHeaderFooter(elemento,elemento.getAttribute(`data-include`))
    })
})