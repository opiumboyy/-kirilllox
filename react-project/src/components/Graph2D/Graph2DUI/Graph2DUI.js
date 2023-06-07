import { useRef, useState, useCallback } from 'react';

import AddButton from './AddButton/AddButton';
import FunctionList from './FunctionList/FunctionList';
import FunctionBlock from './FunctionBlock/FunctionBlock';


import './Graph2DUI.css';

const Graph2DUI = () => {

    const listRef = useRef(null);
    const [showPanel, setShowPanel] = useState(false);
    const [functionsCount, setFunctionsCount] = useState(0);

    const showHidePanel = useCallback(() => {
        setShowPanel(!showPanel);
    }, [setShowPanel, showPanel]);

    const addFunction = useCallback(() => {
        listRef.current.appendChild(<FunctionBlock />)
        setFunctionsCount(functionsCount + 1);
    }, [setFunctionsCount, functionsCount])

    return (
        <div className='graph2DUI'>
            {showPanel && <div className='funcs-menu'>
                <AddButton onClick={addFunction} />
                <FunctionList list={listRef} />
            </div>
            }
            <button onClick={showHidePanel}>
                {showPanel ? '⇐' : '⇒'}
            </button>
        </div>
    )
}

export default Graph2DUI;