Template.prototype.UI3D = () => `
    <nav>
        
        <div class = "block3D ">
            <div class="figuresMenu">
                <div class ='figuresCheckBoxes'>
                    <input type="checkbox" id="PolygonsCheckBox" data-setting = "showPolygons"  name="Polygons" checked>
                    <label for="PolygonsCheckBox">Полигоны</label>
                    <input type="checkbox" id="EdgesCheckBox" data-setting = "showEdges" name="Edges" checked>
                    <label for="EdgesCheckBox">Рёбра</label>
                    <input type="checkbox" id="PointsCheckBox" data-setting = "showPoints" name="Points" checked>
                    <label for="PointsCheckBox">Точки</label>
                    <input type="checkbox" id="animationCheckBox" data-setting = "showAnimation" name="Animation">
                    <label for="animationCheckBox">Анимация</label>
                    <input type="checkbox" id="shadowCheckBox" data-setting = "showShadows" name="Shadows" checked>
                    <label for="shadowCheckBox">Тени</label>
                </div>
                <input class="lightPower" type="range" min="0" max="50000" step="1000" value="10000">
                <div class="addFigure">Добавить</div>
                <div id = 'figuresList' class = 'hide'>
                    <div data-figure="Cube">Куб</div>
                    <div data-figure="Sphere">Сфера</div>
                    <div data-figure="Ellipsoid">Эллипсоид</div>
                    <div data-figure="Cone">Конус</div>
                    <div data-figure = "Cylinder">Цилиндр</div>
                    <div data-figure="ParabolicCylinder">Параболический цилиндр</div>
                    <div data-figure = "HyperbolicCylinder">Гиперболический цилиндр</div>
                    <div data-figure = "SingleCavityHyperboloid">Однополостный гиперболоид</div>
                    <div data-figure = "DoubleCavityHyperboloid">Двуполостный гиперболоид</div>
                    <div data-figure = "EllipticalParaboloid">Эллиптический параболоид</div>
                    <div data-figure = "HyperbolicParaboloid">Гиперболический параболоид</div>
                    <div data-figure = "Tor">Тор</div>
                    <div data-figure = "SunSystem" id = "sunSystem">Солнечная система</div>
                </div>

                <div class="figuresContainer"></div>
            </div>
        </div>
    </nav>
`;