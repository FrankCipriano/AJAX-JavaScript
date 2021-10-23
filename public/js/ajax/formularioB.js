const d=document

const validarFormularioB=()=>{
    d.addEventListener(`keyup`,(e)=>{
        if(e.target.matches(`.formulario-contacto [required]`)){
            let $input=e.target,
            pattern=$input.pattern || $input.dataset.pattern
            if(pattern && $input.value!==""){
                let regex=new RegExp(pattern)
                return !regex.exec($input.value)
                ?d.getElementById($input.name).classList.add(`is-active`)
                :d.getElementById($input.name).classList.remove(`is-active`)
            }
            if(!pattern){
                return $input.value===""
                ?d.getElementById($input.name).classList.add(`is-active`)
                :d.getElementById($input.name).classList.remove(`is-active`)
            }
        }
    })
    d.addEventListener(`submit`,(e)=>{
        e.preventDefault()
        alert(`El comentario esta a punto de enviarse.!!`)
        const $formulario=d.querySelector(`.formulario-contacto`),
            $loader=d.querySelector(`.contacto-loader`),
            $respuesta=d.querySelector(`.contacto-respuesta`)
        $loader.classList.remove(`none`)

        fetch("https://formsubmit.co/ajax/francoswordfish@gmail.com",{
            method:`POST`,
            body:new FormData(e.target)
        }).then((res)=>res.ok? res.json():Promise.reject(res))
        .then((json)=>{
            console.log(json)
            $loader.classList.add(`none`)
            $respuesta.classList.remove(`none`)
            $respuesta.innerHTML=`<p>${json.message}</p>`
            $formulario.reset()
        }).catch((err)=>{
            console.log(err)
            let message=err.statusText || `Ocurrió un error al enviar email, intente mas tarde`
            $respuesta.innerHTML=`<p>Error ${err.status}: ${message}</p>`
            $loader.classList.add(`none`)
            $respuesta.classList.remove(`none`)
        }).finally(()=>{
            setTimeout(()=>{
                $respuesta.classList.add(`none`)
                $respuesta.innerHTML=``
            },3000)
        })
    })
}
export default validarFormularioB

