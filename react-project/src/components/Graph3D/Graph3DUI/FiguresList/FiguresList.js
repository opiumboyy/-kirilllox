import './FiguresList.css';

const FiguresList = ({ figures, onClick }) => {
    return (
        <div className='figures-list'>
            {figures.map((figure, index) => {
                return (
                    <div
                        key={index}
                        onClick={() => onClick(figure.name)}
                        className='figure-button'>
                        {figure.text}
                    </div>
                )
            })}
        </div>
    )
}

export default FiguresList;