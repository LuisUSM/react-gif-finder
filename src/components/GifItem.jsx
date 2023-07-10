export const GifItem = ({ title, url }) => {
    /*
    "GifItem" es el componente que renderiza cada GIF, individualmente, haciendo uso de la información que le es compartida. 
    */

    return (
    // "img" es el GIF, mientras que "p" su nombre o título.
    <div className="card">
        <img src={ url } alt={ title } />
        <p>{ title }</p>
    </div>
    )
}

