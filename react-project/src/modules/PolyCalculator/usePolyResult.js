import PolynomialCalculator from "./PolynomialCalculator";
import Calculator from "../Calculator/Calculator";

const usePolyResult = (refC, refX, refResult) => {
    return () => {
        const x = (new Calculator()).getEntity(refX.current.value);
        const c = (new PolynomialCalculator()).getPolynomial(refC.current.value);
        refResult.current.value = (c.getValue(x)).toString();
    }
}

export default usePolyResult;