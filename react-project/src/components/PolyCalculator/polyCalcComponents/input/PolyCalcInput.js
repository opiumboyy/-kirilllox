import './PolyCalcInput.css';

const PolyCalcInput = ({ inputA, inputB }) => {
    return (
        <div className='poly-calc-input'>
            <textarea
                placeholder="Полином"
                ref={inputA}
            ></textarea>
            <textarea
                placeholder="Полином"
                ref={inputB}
            ></textarea>
        </div>
    )

}

export default PolyCalcInput;