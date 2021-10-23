import cargarContenido, { cargarContenidoEnlace } from "./ajax/cargar_HTML.js"
import dragDrop from "./ajax/drag_drop.js"
import validarFormularioConNode from "./ajax/formulario_con_node.js"
import subirArchivo from "./ajax/uploader.js"
import validarFormularioB from "./ajax/formularioB.js"
import peticionStripe from "./ajax/stripe_checkout.js"
import convertirMarkdown from "./ajax/cargar_markdown.js"
import mostrarPokemons from "./ajax/poke_api.js"

const d=document,
      $main=d.querySelector(`main`)

d.addEventListener(`DOMContentLoaded`,(e)=>{
    cargarContenido({
        url:`assets/inicio.html`,
        exito:(html)=>$main.innerHTML=html,
        error:(err)=>$main.innerHTML=`<h1>${err}</h1>`
    })
    cargarContenidoEnlace(`main`,`.menu a`)
    subirArchivo(`.uploadbox`,`archivos`)
    dragDrop(`.drag-drop`,`.zona-drop`)
    //validarFormularioB()
    validarFormularioConNode()
    peticionStripe()
    convertirMarkdown()
    mostrarPokemons()
})

