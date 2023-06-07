import './CalcInput.css';

const CalcInput = ({ inputA, inputB }) => {
    return (
        <div className='calc-input'>
            <textarea
                placeholder='a'
                ref={inputA}
            ></textarea>
            <textarea
                placeholder='b'
                ref={inputB}
            ></textarea>
        </div>
    )
}

export default CalcInput;