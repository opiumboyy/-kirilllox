import { useState } from "react";
import { useCallback } from "react";

import CheckBoxes from "./CheckBoxes/CheckBoxes";
import FiguresList from "./FiguresList/FiguresList";

import './Graph3DUI.css';

const Graph3DUI = ({ addFigure, checkBoxes, figures }) => {
    const [showPanel, setShowPanel] = useState(false);
    const [showAddList, setShowAddList] = useState(false);

    const showHidePanel = useCallback(() => {
        setShowPanel(!showPanel);
    }, [setShowPanel, showPanel]);

    const showHideAddList = useCallback(() => {
        setShowAddList(!showAddList);
    }, [setShowAddList, showAddList])

    const addFigureOnClickHandler = useCallback((figure) => {
        addFigure(figure);
        showHideAddList();
    }, [addFigure, showHideAddList])

    return (
        (<div className="graph3DUI">
            {showPanel && <div className="figures-menu">
                <CheckBoxes
                    checkBoxes={checkBoxes}
                />
                <div className="add-button-block">
                    {showAddList ? <FiguresList
                        figures={figures}
                        onClick={addFigureOnClickHandler}
                    /> :
                        <button onClick={showHideAddList}>Выбрать фигуру</button>
                    }
                </div>
            </div>
            }
            <button onClick={showHidePanel}>
                {showPanel ? '⇐' : '⇒'}
            </button>
        </div>)
    )
}

export default Graph3DUI;