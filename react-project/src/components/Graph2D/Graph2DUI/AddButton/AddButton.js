import './AddButton.css';

const AddButton = ({ onClick = () => { } }) => {
    return (
        <div className='add-function-block'>
            <div
                onClick={onClick}
                className="add-function-button">
                Добавить</div>
        </div>
    )
}

export default AddButton;