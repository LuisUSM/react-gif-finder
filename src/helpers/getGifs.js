const getGifs = async( category ) =>
{
    /*
        "getGifs()" es una función de JavaScript que se encarga de obtener los GIFs que deseamos, según es la categoría, por medio de la API Key proporcionada por GIPHY y la Fetch API. Esta retorna la información necesaria para renderizar 10 GIFs dentro de un objeto.
    */

    // Esta es la URL que es utilizada para buscar la GIFs en la web. Hacemos uso de la API GIPHY y la API Key proveída por la misma para hacerlo. Además, la categoría debe ser incluida para poder buscar los GIFs deseados.
    const url = `https://api.giphy.com/v1/gifs/search?api_key=nYIFJ2uCq4zN9MNMJyZDBxwsXa6ILKNg&q=${ category }&limit=10`;

    // Se hace una llamada con la función "fetch()" de la Fetch API usando la URL anterior para obtener la información de los GIFs deseados. Las respuesta a la llamada es almacenada en "resp".
    const resp = await fetch( url );

    // Los GIFs son extraídos de la respuesta a la llamada gracias al método ".json" el cual lee el cuerpo (body) de la misma respuesta y lo devuelve en forma de un objeto tipo JSON. Como el método utiliza una promesa para ello, es que se debe colocar la palabra clave "await". La información de los GIFs, ya obtenidos, se almacenan en "data".
    const { data = [] } = await resp.json();

    // Cada GIF dentro del objeto tiene mucha infomación, pero solo nos interesan tres datos de los mismos. Por ello, es que creamos un nuevo objeto llamado "gifs" donde cada GIF solo tiene la información que necesitamos.
    const gifs = data.map( img => (
        {
            id: img.id,
            title: img.title,
            url: img.images.downsized_medium.url
        }
    ));

    // "getGifs()" retorna "gifs" que es un objeto que a su vez almacena otros 10 objetos, cada uno de ellos conteniendo la información que solo es necesaria para cada GIF en particular (URL, ID y Title).
    return gifs;
}

export default getGifs;