Template.prototype.Calculator = () =>
`<div class="calcInput">
        <textarea class="inputA"></textarea>
        <textarea class="inputB"></textarea>
    </div>
    <div class="resultContainer">
        <textarea class="result" disabled></textarea>
    </div>
    <div class="calcButtons">
        <div>
            <div class="operand" data-operand="add">Add</div>
            <div class="operand" data-operand="sub">Sub</div>
            <div class="operand" data-operand="mult">Mult</div>
        </div>
        <div>
            <div class="operand" data-operand="div">Div</div>
            <div class="operand" data-operand="prod">Prod</div>
            <div class="operand" data-operand="pow">Pow</div>
        </div>
    </div>`