import { useRef } from 'react';

import useCalculator from '../../modules/Calculator/useCalculator';

import CalcInput from './CalcComp/input/CalcInput';
import CalcResult from './CalcComp/result/CalcResult';
import OperandBlock from './CalcComp/operands/OperandBlock';

import './CalculatorComp.css';


const CalculatorComp = () => {

    const refInputA = useRef(null);
    const refInputB = useRef(null);
    const refResult = useRef(null);

    const calc = useCalculator(refInputA, refInputB, refResult);

    const operandButtons = [
        {
            operand: 'add',
            text: 'a + b',
        },
        {
            operand: 'sub',
            text: 'a - b',
        },
        {
            operand: 'mult',
            text: 'a * b',
        },
        {
            operand: 'div',
            text: 'a / b',
        },
        {
            operand: 'prod',
            text: 'a * b',
        },
        {
            operand: 'pow',
            text: 'a ^ b',
        },
    ]

    return (
        <div className='calculator'>
            <CalcInput
                inputA={refInputA}
                inputB={refInputB}
            />
            <CalcResult
                result={refResult}
            />
            <OperandBlock
                onClick={calc}
                operandButtons={operandButtons}
            />
        </div>
    );
}

export default CalculatorComp;