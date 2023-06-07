import React from 'react';


const Header = ({ showComponents, components, selectedComponent }) => {
  return (
    <div className="header">
      <nav className="nav">
        <label htmlFor="nav-toggle" className="nav-toggle"></label>
        <ul className="menu">
          {components.map((component, index) => (
            <li key={index}>
              <a
                className="menu"
                data-item={component.name}
                onClick={() => showComponents(component.name)}
              >
                {component.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Header;