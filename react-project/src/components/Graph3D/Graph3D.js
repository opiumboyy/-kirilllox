import { useEffect } from "react";
import { useRef } from "react";

import useCanvas from "../../modules/Canvas/useCanvas";
import Math3D, {
    Point, Light, Cube, Cone, Cylinder,
    DoubleCavityHyperboloid, Ellipsoid, EllipticalParaboloid,
    HyperbolicCylinder, HyperbolicParaboloid, ParabolicCylinder,
    SingleCavityHyperboloid, Sphere, Tor
} from '../../modules/Math3D';

import Graph3DUI from "./Graph3DUI/Graph3DUI";

import './Graph3D.css';

const Graph3D = () => {
    const width = 1200;
    const height = 800;
    const proportion = width / height;

    const zoomStep = 1.1;

    const scene = [];

    const WIN = {
        WIDTH: 20 * proportion,
        HEIGHT: 20,
        BOTTOM: -10,
        LEFT: -10 * proportion,
        FOCUS: new Point(0, 0, 20),
        CAMERA: new Point(0, 0, 30),
    }

    const LIGHT = new Light(20, 20, -10);

    const checkBoxes = [
        {
            text: 'Точки',
            onClick: (value) => showHidePoints(value),
            checked: false,
        },
        {
            text: 'Рёбра',
            onClick: (value) => showHideEdges(value),
            checked: false,
        },
        {
            text: 'Полигоны',
            onClick: (value) => showHidePolygons(value),
            checked: true,
        },
        {
            text: 'Анимация',
            onClick: (value) => showHideAnimation(value),
            checked: false,
        },
        {
            text: 'Тени',
            onClick: (value) => showHideShadows(value),
            checked: false,
        },
    ]

    const figures = [
        {
            name: 'Cube',
            text: 'Куб',
        },
        {
            name: 'Sphere',
            text: 'Сфера',
        },
        {
            name: 'Cone',
            text: 'Конус',
        },
        {
            name: 'Ellipsoid',
            text: 'Эллипсоид',
        },
        {
            name: 'Cylinder',
            text: 'Цилиндр',
        },
        {
            name: 'ParabolicCylinder',
            text: 'Параболический цилиндр',
        },
        {
            name: 'HyperbolicCylinder',
            text: 'Гиперболический цилиндр',
        },
        {
            name: 'SingleCavityHyperboloid',
            text: 'Однополостный гиперболоид',
        },
        {
            name: 'DoubleCavityHyperboloid',
            text: 'Двуполостный гиперболоид',
        },
        {
            name: 'EllipticalParaboloid',
            text: 'Эллиптический параболоид',
        },
        {
            name: 'HyperbolicParaboloid',
            text: 'Гиперболический параболоид',
        },
        {
            name: 'Tor',
            text: 'Тор',
        },
    ]

    const math3D = new Math3D({ WIN });

    const interval = setInterval(() => {
        if (checkBoxes[3].checked) {
            scene.forEach((figure) => {
                if (figure) {
                    figure.doAnimation(math3D);
                }
            })
        }
    }, 60);

    const Canvas = useCanvas((FPS) => renderScene(FPS));
    const canvas = useRef(null);

    let canRotate = false;

    useEffect(() => {
        canvas.current = Canvas({
            id: 'canvas3D',
            width: width,
            height: height,
            WIN: WIN,
            callbacks: {
                wheel,
                mouseUp,
                mouseDown,
                mouseMove,
                mouseLeave,
                movePoint
            },
        });

        addFigure('Cube');

        return () => {
            clearInterval(interval);
            canvas.current = null
        }
    })

    const showHidePoints = (value) => {
        checkBoxes[0].checked = value;
    }

    const showHideEdges = (value) => {
        checkBoxes[1].checked = value;
    }

    const showHidePolygons = (value) => {
        checkBoxes[2].checked = value;
    }

    const showHideAnimation = (value) => {
        checkBoxes[3].checked = value;
    }

    const showHideShadows = (value) => {
        checkBoxes[4].checked = value;
    }

    const drawPoints = () => {
        scene.forEach((figure) => {
            if (figure) {
                figure.points.forEach((point) => {
                    canvas.current.point(math3D.xs(point), math3D.ys(point), 'black', 2);
                });
            }
        });
    }

    const drawEdges = () => {
        scene.forEach((figure) => {
            if (figure) {
                figure.edges.forEach((edge) => {
                    canvas.current.line(
                        math3D.xs(figure.points[edge.point1]),
                        math3D.ys(figure.points[edge.point1]),
                        math3D.xs(figure.points[edge.point2]),
                        math3D.ys(figure.points[edge.point2]),
                    )
                });
            }
        });
    }

    const drawPolygons = (polygons) => {
        polygons.forEach((polygon) => {
            const points = [];

            for (let i = 0; i < polygon.points.length; i++) {
                points.push(scene[polygon.figureIndex].points[polygon.points[i]]);
            }

            let { r, g, b } = polygon.color;
            const { isShadow, dark } = (checkBoxes[4].checked ?
                math3D.calcShadow(polygon, scene, LIGHT) : false);
            const lumen = math3D.calcIllumination(polygon.distance,
                LIGHT.lumen * (isShadow ? dark : 1));
            r = Math.round(r * lumen);
            g = Math.round(g * lumen);
            b = Math.round(b * lumen);

            canvas.current.polygon(
                points.map((point) => {
                    return {
                        x: math3D.xs(point),
                        y: math3D.ys(point),
                    };
                }),
                polygon.rgbToColor(r, g, b),
            );
        });
    }

    const renderScene = (FPS) => {
        if (canvas.current) {
            //console.log(FPS);

            canvas.current.clear();

            if (checkBoxes[2].checked) {
                const polygons = [];
                scene.forEach((figure, index) => {
                    if (figure) {
                        math3D.calcCenters(figure);

                        if (checkBoxes[4].checked) {
                            math3D.calcRadius(figure);
                        }

                        math3D.calcDistance(figure, WIN.CAMERA, 'distance');
                        math3D.calcDistance(figure, LIGHT, 'lumen');

                        figure.polygons.forEach((polygon) => {
                            polygon.figureIndex = index;
                            polygons.push(polygon);
                        });
                    }
                });
                math3D.sortByArtistAlgoritm(polygons);

                drawPolygons(polygons);
            }

            if (checkBoxes[1].checked) {
                drawEdges();
            }

            if (checkBoxes[0].checked) {
                drawPoints();
            }

            canvas.current.render();
        }

    }

    const wheel = (event) => {
        const delta = (event.wheelDelta > 0) ? zoomStep : 1 / zoomStep;
        scene.forEach((figure) => {
            if (figure) {
                figure.points.forEach((point) => {
                    math3D.transformPoint(math3D.zoom(delta), point);
                });
                math3D.transformPoint(math3D.zoom(delta), figure.centre);
            }
        })
    }

    const mouseUp = () => {
        canRotate = false;
    }

    const mouseDown = () => {
        canRotate = true;
    }

    const mouseMove = (event) => {
        if (canRotate) {
            const prop = 240;
            scene.forEach((figure) => {
                if (figure) {
                    figure.points.forEach((point) => {
                        math3D.transformPoint(math3D.rotateOx(event.movementY / prop), point);
                        math3D.transformPoint(math3D.rotateOy(-event.movementX / prop), point);
                    })
                    math3D.transformPoint(math3D.rotateOx(event.movementY / prop), figure.centre);
                    math3D.transformPoint(math3D.rotateOy(-event.movementX / prop), figure.centre);
                }
            })
        }
    }

    const mouseLeave = () => {
        canRotate = false;
    }

    const movePoint = (dx, dy, dz = 0) => {
        scene.forEach((figure) => {
            if (figure) {
                figure.points.forEach((point) => {
                    math3D.transformPoint(math3D.move(dx, dy, dz), point)
                })
            }
        })
    }

    const addFigure = (figure) => {
        const num = 0;
        switch (figure) {
            case "Cube":
                scene[num] = new Cube({});
                break;

            case "Cone":
                scene[num] = new Cone({});
                break;

            case "Cylinder":
                scene[num] = new Cylinder({});
                break;

            case "DoubleCavityHyperboloid":
                scene[num] = new DoubleCavityHyperboloid({});
                break;

            case "Ellipsoid":
                scene[num] = new Ellipsoid({});
                break;

            case "EllipticalParaboloid":
                scene[num] = new EllipticalParaboloid({});
                break;

            case "HyperbolicParaboloid":
                scene[num] = new HyperbolicParaboloid({});
                break;

            case "HyperbolicCylinder":
                scene[num] = new HyperbolicCylinder({});
                break;

            case "ParabolicCylinder":
                scene[num] = new ParabolicCylinder({});
                break;

            case "SingleCavityHyperboloid":
                scene[num] = new SingleCavityHyperboloid({});
                break;

            case "Sphere":
                scene[num] = new Sphere({});
                break;

            case "Tor":
                scene[num] = new Tor({});
                break;

            default:
                break;
        }

        scene[num].setAnimation('rotateOy', 0.025, new Point());
        scene[num].setAnimation('rotateOx', 0.05, new Point());
    }

    return (
        <div className="graph3D">
            <Graph3DUI
                checkBoxes={checkBoxes}
                figures={figures}
                addFigure={addFigure}
            />
            <canvas id='canvas3D'></canvas>
        </div>
    )
}

export default Graph3D;