import './CalcResult.css';

const CalcResult = ({ result }) => {
    return (
        <div className="result-container">
            <textarea
                className="calc-result"
                disabled
                ref={result}
            >
            </textarea>
        </div>
    )
}

export default CalcResult;