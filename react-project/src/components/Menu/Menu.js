import React from 'react';




const Menu = ({ showComponents, selectedComponent }) => {
  return (
    <div className="header">
      <input type="checkbox" id="nav-toggle" hidden />
      <nav className="nav">
        <label htmlFor="nav-toggle" className="nav-toggle"></label>
        <ul className="menu">
          <li>
            <a
              className={`menu-item ui${selectedComponent === 'graph2D' ? ' select-menu-button' : ''}`}
              data-item="graph2D"
              onClick={() => showComponents('graph2D')}
            >
              Графики
            </a>
          </li>
          <li>
            <a
              className={`menu-item ui${selectedComponent === 'calculator' ? ' select-menu-button' : ''}`}
              data-item="calculator"
              onClick={() => showComponents('calculator')}
            >
              Калькулятор
            </a>
          </li>
          <li>
            <a
              className={`menu-item ui${selectedComponent === 'polynoms' ? ' select-menu-button' : ''}`}
              data-item="polynoms"
              onClick={() => showComponents('polynoms')}
            >
              Полиномы
            </a>
          </li>
          <li>
            <a
              className={`menu-item ui${selectedComponent === 'Graph3D' ? ' select-menu-button' : ''}`}
              data-item="Graph3D"
              onClick={() => showComponents('Graph3D')}
            >
              3D Графика
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
