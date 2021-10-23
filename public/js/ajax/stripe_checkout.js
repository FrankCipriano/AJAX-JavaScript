const keys={
    secret:`sk_test_51JmpN7GeBhp9iIotAUabmGfeDYhQzneiZ24YBX3OCojjOjh1PP3GZA2JR8IcFK3V3BypgxNjSJgaZWB4SceBuQ5y00Gw0NbBLu`,
    public:`pk_test_51JmpN7GeBhp9iIotanrzB0pIraBHvcj01sLigSmsJyLO1pg15poEIzzdKYRzhoTcXWbxnMmepNAKw8uOhBeuODvI009xL3E7su`
}
const fetch_options={
    headers:{
        Authorization:`Bearer ${keys.secret}`
    }
}
const d=document,
    $contendedor=d.querySelector(`.contenedor`)
let productos,precios

const formatearMoneda=(cantidad)=>`US$ ${cantidad.slice(0,-2)}.${cantidad.slice(-2)}`

const peticionStripe=()=>{
    d.addEventListener(`click`,(e)=>{
        if(e.target.matches(`.tienda`)){
            Promise.all([
                fetch(`https://api.stripe.com/v1/products`,fetch_options),
                fetch(`https://api.stripe.com/v1/prices`,fetch_options)
            ]).then((responses)=>Promise.all(responses.map((res)=>res.json())))
            .then((json)=>{
                console.log(json)
                const $tecnologias=d.getElementById(`tecnologias`),
                    $plantilla=d.getElementById(`plantilla-tecnologia`).content,
                    $fragment=d.createDocumentFragment()
                productos=json[0].data
                precios=json[1].data

                precios.forEach((precio)=>{
                    let detalle_producto=productos.filter((producto)=>producto.id===precio.product)
                    $plantilla.querySelector(`.tecnologia`).setAttribute(`data-precio`,precio.id)
                    $plantilla.querySelector(`img`).src=detalle_producto[0].images[0]
                    $plantilla.querySelector(`img`).alt=detalle_producto[0].name
                    $plantilla.querySelector(`figcaption`).innerHTML=`${detalle_producto[0].name}<br>${formatearMoneda(precio.unit_amount_decimal)} ${precio.currency}`
                    let $clone=d.importNode($plantilla,true)
                    $fragment.appendChild($clone)
                })
                $tecnologias.appendChild($fragment)
            }).catch((err)=>{
                let mensaje=err.statusText || `Ocurrió un error al conectarse con la API de stripe`
                $contendedor.innerHTML=`<p>Error ${err.status}: ${mensaje}</p>`
            })
        }
        if(e.target.matches(`.tecnologia *`)){
            let precio=e.target.parentElement.getAttribute(`data-precio`)
            Stripe(keys.public).redirectToCheckout({
                lineItems:[{
                    price:precio,
                    quantity:1}],
                mode:`subscription`,
                successUrl:`http://127.0.0.1:3000/assets/success_stripe.html`,
                cancelUrl:`http://127.0.0.1:3000/assets/success_stripe.html`
            }).then((res)=>{
                if(res.error) $tecnologias.insertAdjacentHTML(`afterend`,res.error.message)
            })
        }
    })
}

export default peticionStripe