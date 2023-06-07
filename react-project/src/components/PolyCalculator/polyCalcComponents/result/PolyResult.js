import CalcButton from '../../../components/calculatorButton/CalcButton';

import './PolyResult.css';

const PolyResult = ({ onClick, inputX, result }) => {
    return (
        <div className='poly-result-container'>
            <textarea
                placeholder='X'
                ref={inputX}
            ></textarea>
            <CalcButton
                onClick={onClick}
                text={'Подставить X'}
            />
            <textarea
                className='poly-result'
                disabled
                ref={result}
            ></textarea>
        </div>
    )
}

export default PolyResult;