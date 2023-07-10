import { useState, useEffect } from "react";
import getGifs from "../helpers/getGifs";
/*
"useFetchGifs()" manda a llamar la función "getGifs()" para obtener la información de los GIFs deseados. Cuando la llamada ha finalizado, "useFetchGifs()" devuelve 2 cosas: la información de los GIFs (images) y un booleano que indica si estos han terminado de cargar o no (isLoading);

1 componente personalizado es utilizado...
  - getGifs
*/

export const useFetchGifs = ( category ) => {

    // El estado "images" almacena los GIFs en sí. Cada elemento de "images" tiene tres elementos a su vez: la URL del GIF, su id y su nombre (título).
    const [images, setImages] = useState([]);

    // "isLoading" es un estado que indica si los GIFs buscados en la app han terminado de cargar o no (es un booleano).
    const [isLoading, setIsLoading] = useState( true );

    // "getImages()" es una función asíncrona ( async ). Se encarga de obtener los GIFs.
    const getImages = async() =>
    {
        // "newImages" almacena los nuevos GIFs obtenidos por la función "getGifs()" la cual hace uso de la Fetch API para lograrlo.
        const newImages = await getGifs( category );

        // Los GIFs obtenidos son almacenados en el estado.
        setImages( newImages );

        // Al ya haber sido obtenidos los GIFs, "isLoading" pasa a ser false, dando a entender que estos ya han cargado.
        setIsLoading( false );
    }

    // Gracias a este "useEffect" será mandada a llamar la función "getImages()" cada vez que un nuevo grupo de GIFs sea buscado con la aplicación.
    useEffect( () => 
    {
        getImages();
    }
    , []);

    /*
    useFetchGifs retorna 2 cosas...
        - images, los nuevos GIFs obtenidos
        - isLoading, un booleano que indica si estos ya han cargado o no
    */
    return {
        images,
        isLoading
    }
}
