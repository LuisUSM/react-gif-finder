import { useState } from "react";
/*
AddCategory es el buscador (cuadro de texto) que nos permite añadir GIFs con nuestra aplicación. El usuario escribe lo que quiera buscar, y este componente se encarga de añadir la categoría junto al resto de las que ya están presentes.
*/


export const AddCategory = ({ onAddCategory }) => {

    // "inputValue" es el estado que almacena lo escrito en el cuadro de texto, el buscador.
    const [inputValue, setInputValue] = useState('');

    // "onInputChange" actualiza "inputValue" al tomar del evento lanzado el "value" de su "target" (event.target.value).
    const onInputChange = ({ target }) =>
    {
        setInputValue( target.value );
    }

    //Para prevenir que la página recargue al momento de dar "Enter" al terminar de escrbir nuestra entrada en el buscador de GIFs (cuadro de texto), tomamos el evento enviado desde el elemento form y utilizamos la función preventDefault para ello.

    // "onSubmit()" es la función que es llamada al subir el formulario.
    const onSubmit = ( event ) =>
    {
        // Tomamos la nueva categoría añadida en el buscador y eliminamos los espacios en blanco con el método "trim".
        const newAddedCategory = inputValue.trim();

        // "preventDefault()" es una función que impide que un evento en particular desarrolle su comportamiento habitual. En este caso, como nuestro evento viene de un formulario, preventDefault impide que este se suba y por tanto recargue la página.
        event.preventDefault();

        // Si la categoría añadida es igual o menor a un caracter, no es añadida gracias a la condición siguiente.
        if ( newAddedCategory.length <= 1 ) return;

        // Si la categoría es válida, entonces se añade llamando a la función "onAddCategory()".
        onAddCategory( newAddedCategory );
        
        // Al añadir una nueva categoría exitosamente, el buscador es vaciado.
        setInputValue('');
    }

    return (
       // El componente solo rederiza un elemento, el cual es el cuadro de texto que sirve como buscador de GIFs. Este, a su vez, esta dentro de un elemento "form".
       <form onSubmit={ (event) => onSubmit(event)} name='searchGifs'>
            <input 
                type="text" 
                placeholder="Buscar GIFs"
                value={ inputValue }
                onChange={ (event) => onInputChange(event)}
                id='textBox'
            />
        </form>
        // "onChange" se encarga de hacer que nuestro buscador funcione bien al cambiar su contenido con el texto que escribimos en tiempo real. Esto lo hace llamando a la función "onInputChange() que actualiza el estado. El propio estado, entonces, es el valor tomado por el buscador, que es inputValue".
    )
}
