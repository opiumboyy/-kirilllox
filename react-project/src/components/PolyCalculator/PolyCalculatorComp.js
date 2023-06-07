import { useRef } from 'react';

import usePolyCalc from '../../modules/PolyCalculator/usePolyCalc';
import usePolyResult from '../../modules/PolyCalculator/usePolyResult';

import PolyCalcInput from './polyCalcComponents/input/PolyCalcInput';
import NewPoly from './polyCalcComponents/newPoly/NewPoly';
import PolyOperandBlock from './polyCalcComponents/operands/PolyOperandBlock';
import PolyResult from './polyCalcComponents/result/PolyResult';

import './PolyCalculatorComp.css';

const PolyCalculatorComp = () => {

    const refInputA = useRef(null);
    const refInputB = useRef(null);
    const refNewPoly = useRef(null);
    const refResult = useRef(null);
    const refInputX = useRef(null);

    const polyCalc = usePolyCalc(refInputA, refInputB, refNewPoly);
    const polyResult = usePolyResult(refNewPoly, refInputX, refResult);

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
    ]

    return (
        <div className='poly-calculactor'>
            <PolyCalcInput
                inputA={refInputA}
                inputB={refInputB}
            />
            <NewPoly
                newPoly={refNewPoly}
            />
            <PolyOperandBlock
                operandButtons={operandButtons}
                onClick={polyCalc}
            />
            <PolyResult
                onClick={polyResult}
                inputX={refInputX}
                result={refResult}
            />
        </div>
    );
}

export default PolyCalculatorComp;