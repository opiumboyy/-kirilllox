import { useEffect } from "react";
import { useRef } from "react";

import Graph2DUI from "./Graph2DUI/Graph2DUI";

import useCanvas from "../../modules/Canvas/useCanvas";
import Math2D from "../../modules/Graph2D/Math2D";
import Graph2d from "../../modules/Graph2D/Graph2d";

import "./Graph2D.css";

const Graph2D = () => {

    const width = 1200;
    const height = 800;
    const proportion = width / height;

    const zoomStep = 1;

    const funcs = [];

    const WIN = {
        LEFT: -10 * proportion,
        BOTTOM: -10,
        WIDTH: 20 * proportion,
        HEIGHT: 20,
    }

    const math2D = new Math2D();

    const canvas = useRef(null);
    const graph2D = useRef(null);
    const Canvas = useCanvas((() => renderGraph()));

    let canMove = false;
    let mousePosX = 0;

    useEffect(() => {
        canvas.current = Canvas({
            WIN,
            id: 'canvas2D',
            width,
            height,
            callbacks: {
                wheel,
                mouseUp,
                mouseDown,
                mouseMove,
                mouseLeave,
            },
        })

        graph2D.current = new Graph2d(WIN, canvas.current);

        return () => {
            canvas.current = null;
        }
    })

    const wheel = (event) => {

        const delta = (event.wheelDelta > 0) ? -zoomStep : zoomStep;

        if (WIN.WIDTH + delta * proportion > 0 && WIN.HEIGHT + delta > 0) {
            WIN.WIDTH += proportion * delta;
            WIN.HEIGHT += delta;
            WIN.LEFT -= proportion * delta / 2;
            WIN.BOTTOM -= delta / 2;
        }
    }

    const mouseUp = () => {
        canMove = false;
    }

    const mouseDown = () => {
        canMove = true;
    }

    const mouseLeave = () => {
        canMove = false;
    }

    const mouseMove = (event) => {
        if (canMove) {
            WIN.LEFT -= canvas.current.sx(event.movementX);
            WIN.BOTTOM -= canvas.current.sy(event.movementY);
        }
        mousePosX = WIN.LEFT + canvas.current.sx(event.offsetX);
    }

    const renderGraph = () => {
        if (canvas.current) {
            canvas.current.clear();
            graph2D.current.grid();
            graph2D.current.printNums();
            graph2D.current.printOXY();

            funcs.forEach(func => {
                if (func) {
                    const { f, color, width, a, b, showDerivative, showIntegral } = func;
                    if (f) {
                        graph2D.current.printFunction(f, color, width);
                        if (showDerivative) {
                            graph2D.current.printDerivative(f, mousePosX);
                        }
                        if ((a || b) && a !== b) {
                            if (showIntegral) {
                                if (a > b) {
                                    graph2D.current.printIntegral(f, b, a, math2D.getIntegral(f, b, a));
                                } else {
                                    graph2D.current.printIntegral(f, a, b, math2D.getIntegral(f, a, b))
                                }
                            }
                            if (math2D.getZero(f, a, b) !== null) {
                                canvas.current.point(math2D.getZero(f, a, b), 0);
                            }
                        }
                    }
                }
            });

            canvas.current.render();
        }
    }

    

    return (
        <div className="graph2D">
            <Graph2DUI />
            <canvas id='canvas2D'></canvas>
        </div>
    );
}

export default Graph2D;