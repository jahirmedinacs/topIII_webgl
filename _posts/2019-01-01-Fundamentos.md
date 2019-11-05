---
layout: post
title:  "Fundamentos del Aprendizaje Automatico"
date:   2019-01-01 12:00:00 -0500
author: Jeffri Murrugarra
preview_img: "https://upload.wikimedia.org/wikipedia/commons/0/02/KorrRes.png"
---

___Es importante que antes de comenzar este viaje juntos, todos partamos del mismo punto, esto significa para nuestro caso, tener un conocimiento basico en algebra y estadistica. De forma que nadie se encuentre en desventaja o se pierda___

---
---

# {{page.title}}


## Que es un Dato?

## Tipos de Ajuste
Bla bla
### Sobreajuste _(Overfitting)_

<p>Sea \( \mathbb{T} \) y \( \mathbb{D} \) los espacios de Objetivos y Datos respectivamente, incluyendo aquellos datos que no se conocen o no se poseen al momento de la ejecucion del algoritmo o tenica de aprendizaje.
Ademas \( t \) y \( d \) son sub espacios de \( \mathbb{T} \) y \( \mathbb{D} \) respectivamente, siendo estos los datos conocidos (datos objetivo y datos de entrenamiento o simplemente datos)</p>

<p>
	\[ t \in \mathbb{T} \land  d \in \mathbb{D} \]
</p> 

Definace como el sobreajuste a aquel modelo predictivo que acierta perfectamente en todos los puntos dados sin execepcion, aun cuando esto implique un comportamiento erratico (maxima covertura local)
<p>
 \[ t = \{ f(d_{i}) | d_{i} \in D \} \]
</p>

<p>Pero , si consideramos una funcion \( g \) que cumple con la maxima convertura global y un espacio de hiperparamentros \( \mathbb{H} \) asociado a la funcion (estas pueden ser los pesos de un perceptron), de forma que:</p>

<p>
	\[ g: \mathbb{D} \times \mathbb{H} \rightarrow \mathbb{T} \]
</p>

Entonces, Formalmente podriamos definir el sobreajuste (_overfitting_) como la situancion en la que:
<p>
	\[ g(d) = f(d) \land g(\mathbb{D}) \neq f(\mathbb{D}) \]
	\[ f(d) \in g(\mathbb{D})\]
	\[ g(\mathbb{D}) - g(d) \neq f(\mathbb{D} - d) \]
</p>

### Subajuste _(Underfitting)_