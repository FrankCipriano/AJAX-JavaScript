const d=document
const $main=d.querySelector(`.contenedor`)

const convertirMarkdown=()=>{
    d.addEventListener(`click`,(e)=>{
        if(e.target.matches(`.markdown`)){
            fetch(`assets/markdown.md`)
            .then((res)=>res.ok? res.text(): Promise.reject(res))
            .then((text)=>{
                $main.innerHTML=new showdown.Converter().makeHtml(text)
            }).catch((err)=>{
                let mensaje=err.statusText || `No se logró cargar el archivo markdown`
                $main.innerHTML=`Error ${err.status}: ${mensaje}`          
            })
        }
    })
}

export default convertirMarkdown