export const DeleteGIFsButton = ({ category, onDeleteCategory }) => {

    return (
        <button className='deleteButton' onClick={ () => onDeleteCategory(category) }>
            Delete GIFs
        </button>
    )
}
