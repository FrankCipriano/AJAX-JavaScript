const d=document,
    $main=d.querySelector(`main`)
    
let pokeAPI=`https://pokeapi.co/api/v2/pokemon`
    
async function cargarPokemons(url){
    try {
        //$main.insertAdjacentHTML(`beforeend`,`<img class="poke-loader" src="../assets/ball-triangle.svg" alt="Cargando">`)
        //$div.innerHTML=`<img class="poke-loader" src="../assets/ball-triangle.svg" alt="Cargando">`
        let respuesta=await fetch(url),
        json = await respuesta.json(),
        $plantilla=``,
        $prev_url,
        $next_url
        console.log(json)
        
        if(!respuesta.ok)   throw{status:respuesta.status,statusText:respuesta.statusText}
        const $div=d.querySelector(`.grid-fluid`)
        const $links=d.querySelector(`.links`)

        for(let i=0;i<json.results.length;i++){
            try {
                let respuesta = await fetch(json.results[i].url),
                    pokemon=await respuesta.json()
                if(!respuesta.ok)   throw{status:respuesta.status,statusText:respuesta.statusText}
                $plantilla+=`<figure><img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"><figcaption>${pokemon.name}</figcaption></figure>`
            } catch (error) {
                let mensaje=error.statusText || `Ocurrió un error al cargar el pókemon`
                $plantilla+=`<figure><figcaption>Error ${error.status}: ${mensaje}</figcaption></figure>`
            }
        }//-FIN DEL CICLO FOR

        $div.innerHTML=$plantilla
        $prev_url=json.previous? `<a href="${json.previous}">⏮️</a>`:``
        $next_url=json.next? `<a href="${json.next}">⏭️</a>`:``
        $links.innerHTML=`${$prev_url} ${$next_url}`
    } catch (error) {
        let mensaje=error.statusText || `Ocurrió un error al consultar la pokeAPI`
        $main.innerHTML=`<p>Error ${error.status}: ${mensaje}</p>`
    }
}//-FIN DE LA FUNCION ASINCRONA CON FETCH

const mostrarPokemons=()=>{
    d.addEventListener(`click`,(e)=>{
        if(e.target.matches(`.pokeAPI`)){
            cargarPokemons(pokeAPI)
        }
        if(e.target.matches(`.links a`)){
            e.preventDefault()
            cargarPokemons(e.target.getAttribute(`href`))
        }
    })
}

export default mostrarPokemons