# Markdown
## Que es markdown?

Un lenguaje de marcas ligero que no cuenta con una estandarizacion ni en
sintaxis, ni en implementacion. Su sintaxis de resaltado es ambigua y pobre, pero
intenta cubrir su mediocridad insertando directamente marcas XML en el
texto "humanamente legible"... diluyendo asi su proposito, pero convirtiendolo en
un "buen" facilitador para la escritura de HTML

### Syntaxis
### Encabezados

``` markdown
# Encabezado principal
## Segundo nivel
### 3er. nivel
algo de texto
### 3er. nivel
mas texto

# Otro encabezado principal
```

Toda linea que inicia con uno o varios `#` seguido por al menos un espacio en
blanco, es un encabezado.

El texto (en la misma linea) donde esta el o los `#` sera el titulo del encabezado.

El nivel del encabezado depende del numero de `#` al inicio de la linea, es
decir

- `#` == `h1`
- `##` == `h2`
- `###` == `h3`
- `####` == `h4`
- `#####` == `h5`

A que encabezado pertenece el texto? al primero que aparezca por encima de
el

### Listas

Disponemos de dos tipos de listas, ordenadas (numeradas) y no
ordenadas, para las primeras colocamos un numero (el que sea) seguido de un
punto y comenzamos a escribir

listas ordenadas

``` markdown
1. elemento uno
2. elemento dos
3. elemento tres
```

para las segundas (listas no ordenadas) simplemente un guion al inicio

``` markdown
- elemento uno
- elemento dos
- elemento tres
```

markdown no permite que un elemento tenga mas de un parrafo, por ejemplo

``` markdown
1. primer elemento de la lista
2. segundo elemento de la lista
3. tercer elemento de la lista
   con una linea adicional

   este texto, a pesar de estar indentado, no forma parte
   del tercer elemento, es un parrafo independiente

igual de independiente que este
```

para hacer esto tendriamos que recurrrir a a html en si, convirtiendo lo
anterior en

``` markdown
<ul>
    <li><p>primer elemento de la lista</p></li>
    <li><p>segundo elemento de la lista</p></li>
    <li><p>tercer elemento de la lista con una linea adicional</p>
        <p>la linea adicional</p></li>
</ul>
```

### Citas

``` markdown
> esto es una cita

> esto tambien
> es una
> cita
```

### Resaltado

```
**bold**          ==> <b>bold</b>
__bold__          ==> <b>bold</b>
*italic*          ==> <i>italic</i>
_italic_          ==> <i>italic</i>
***bold&italic*** ==> <b><i>bold&italic</i></b>
___bold&italic___ ==> <b><i>bold&italic</i></b>
`code`            ==> <code>code</code>
~~strike~~        ==> <s>strike</s>
```

### Enlaces

cualquier texto que cumpla con la regexp `(https?|ftp|file)://\S+` (o algo asi) se
convierte en un enlace

tambien se puede colocar un texto alternativo como "fachada" del enlace, con la sintaxis

``` markdown
[texto-alternativo](enlace)
```

### imagenes

```
![texto-alternativo](enlace)
```

### Bloques de Codigo

hay dos sintaxis para esto, primero envolver una region con tres comillas
invertidas ``` contenidas en una linea propia, sin espacios al inicio. Colocar el nombre del lenguaje en el que se supone esta escrito
el codigo es opcional

<pre><code>
``` lenguaje
mi codigo
+ codigo
y + codigo
```
</code></pre>

tiene el mismo efecto, dejar cuatro espacios en blanco al inicio de
cada linea, separando el texto con una linea en blanco al inicio y al final

```
texto estandar

    esto es codigo
    y esto tambien es codigo
    y tambien esto

+ texto estandar
```

## enlaces

- https://es.wikipedia.org/wiki/Markdown
- http://joedicastro.com/pages/markdown.html
- http://joedicastro.com/markdown-la-mejor-opcion-para-crear-contenidos-web.html
- http://joedicastro.com/comparativa-de-lenguajes-de-marcado-ligero.html
- https://nasciiboy.github.io/emacs/org-mode/
