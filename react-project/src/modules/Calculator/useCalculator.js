import Calculator from "./Calculator";

const useCalculator = (refA, refB, refC) => {
    const calc = new Calculator();
    return (operand) => {
        const a = calc.getEntity(refA.current.value);
        const b = calc.getEntity(refB.current.value);
        const c = calc[operand](a, b);
        refC.current.value = c.toString();
    }
}

export default useCalculator;