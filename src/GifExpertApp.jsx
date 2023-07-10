import { useState } from "react";
import { AddCategory } from "./components/AddCategory";
import { GifGrid } from "./components/GifGrid";
/*
GifExpertApp es una aplicación que te permite buscar GIFs por medio de un buscador, mostrando los 10 GIFs más populares. Se pueden realizar varias búsquedas en la misma sección, por lo que los GIFs se irán almacenando por grupos, a los cuales se les ha nombrado aquí como "categorías".

2 componentes personalizados son utilizados...
  - AddCategory
  - GifGrid
*/

export const GifExpertApp = () => {
  // "localStorage API". Haciendo uso de la API "localStorage" podemos crear y tomar datos almacenados en la computadora del usuario. Esto nos permite hacer páginas web que no pierdan su información. En el caso de nuestra app de GIFs, esto nos sirve para conservar los GIFs que hayan sido buscados anteriormente.

  // Sí el espacio local para almacenar los GIFs "myGifs" no existe, entonces creamos uno.
  if (!localStorage.getItem('myGifs'))
  {
    localStorage.setItem('myGifs', JSON.stringify([]));
  }

  // Tomamos la información almacenada en "local storage" y la introducimos dentro del estado "categories" de nuestro componente. Así, los GIFs que fueron buscados con anterioridad pueden volver a ser cargados sin problemas.
  const storedCategories = JSON.parse(localStorage.getItem('myGifs'));

  // Este es el estado que almacena las categorías de los GIFs, en un arreglo.
  const [categories, setCategories] = useState([...storedCategories]);

  // Cuando el usuario agregue una categoría más con el buscador, esta se almacenará también en "local storage" haciendo que este se mantenga siempre actualizado.
  localStorage.setItem('myGifs', JSON.stringify(categories.length > 0 ? categories : []));

  // "onAddCategory()" añade las nuevas categorías a "categories". Toma un solo argumento "newCategory" que es la nueva categoría a añadir.
  const onAddCategory = ( newCategory ) =>
  {
    // Todas las categorías ya existentes son pasadas a letras minúsculas con el método "toLowerCase".
    const lowCaseCategories = categories.map( category =>
      ( category.toLowerCase() )
    );
    
    // Igualmente, la nueva categoría a añadir es convertida a letras minúsculas.
    const lowCaseNewCategory = newCategory.toLowerCase();

    // Con todas las categorías en minúsculas, podemos comparar fácilmente si la categoría añadida ya existe o no. Si es así, es rechazada con la siguiente condición, que utiliza el método "includes".
    if ( lowCaseCategories.includes( lowCaseNewCategory ) ) return;
    
    // Si la nueva categoría aún no existe, es añadida al principio del estado junto al resto de categorías ya existentes con "setCategories()".
    setCategories( [ newCategory, ...categories ] );
  };

  // La función "onDeleteCategory" elimina la categoría que le es enviada del estado "categories".
  const onDeleteCategory = ( category ) =>
  {
    // Las categorías actuales del estado son pasadas a letras minúsculas.
    const lowCaseCategories = categories.map( c =>
    ( c.toLowerCase() ));
    
    // La nueva categoría a eliminar es pasada a letras minúsculas.
    const lowCaseCategory = category.toLowerCase();

    // Se busca el índice de la categoría a eliminar en el estado.
    const categoryIndex = lowCaseCategories.indexOf(lowCaseCategory);

    // Se extrae el estado actual.
    const newCategories = categories;
    
    // Se elimina la categoría dada del estado extraído.
    newCategories.splice(categoryIndex, 1);

    // El nuevo estado es definido, con la categoría correspondiente eliminada.
    setCategories([ ...newCategories ]);
  }; 

  // GifGrid renderiza los GIFs por categoría
  const renderGIFs = () =>
  {
    return categories.map((category) => 
    {

      return <GifGrid 
        key={ category }
        category={ category }
        onDeleteCategory={ onDeleteCategory }
      /> 
    }); 
  };
  /* La categorías en "categories" son iteradas a través del método ".map". Estas son enviadas como "props" al componente GifGrid. Por tanto, habrá tantos componentes GifGrid como categorías en "categories". */

  return (
    <>
        <h1>GifExpertApp</h1>

        {/* AddCategory renderiza el cuadro de texto que nos permite añadir más GIFs */}
        <AddCategory onAddCategory={ onAddCategory }/>
        {/* Al componente se le es enviado la función "onAddCategory" la cual se encarga de añadir las nuevas categorías a "categories" */}

        {/* La función "renderGIFs" para renderizar todos los GIFs por categoría es llamada aquí */}
        { renderGIFs() }
    </>
  )
}
