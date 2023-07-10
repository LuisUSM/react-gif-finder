import { GifItem } from "./GifItem";
import { useFetchGifs } from "../hooks/useFetchGifs";
import { DeleteGIFsButton } from "./DeleteGIFsButton";
/*
"GifGrid" es el componente que renderiza los grupos de GIFs, haciendo llamadas a otras funciones y utilizando componentes personalizados hijos.

2 componentes personalizados son utilizados...
  - GifItem
  - useFetchGifs
*/

export const GifGrid = ({ category, onDeleteCategory }) => {

    // Tomamos la categoría de los "props" y con ella buscamos los GIFs utilizando la API de GIPHY (la plataforma que almacena los GIFs) y la Fetch API (la interfaz que nos permite buscar recursos a través de internet). Todas estas operaciones están contenidas dentro de "useFetchGifs()" de la cual desestructuramos 2 cosas: "images" y "isLoading".
    const { images, isLoading } = useFetchGifs( category );

    return (
    <>
        <h3>{ category } </h3>
        <DeleteGIFsButton category={ category } onDeleteCategory={ onDeleteCategory }/>

        {
            isLoading && ( <h2>Cargando...</h2> )
        }
        <div className="card-grid">
            {
                // "images" contiene la información de los GIFs dentro de un objeto. Por tanto, podemos recorrer el mismo para obtener la información de un solo GIF específico, y renderizarlo. Este se renderiza haciendo uso del componente personalizado "GifItem".
                images.map( ( image ) =>
                (
                    <GifItem
                        key={ image.id }
                        { ...image }
                    />
                ))
            }
        </div>
    </>
    )
}