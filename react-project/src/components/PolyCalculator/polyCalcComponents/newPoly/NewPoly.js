import './NewPoly.css';

const NewPoly = ({ newPoly }) => {
    return (
        <div className='new-poly-container'>
            <textarea
                className="new-poly"
                placeholder="Новый полином"
                ref={newPoly}
            ></textarea>
        </div>
    )
}

export default NewPoly;
