import React, { useState } from 'react';
import Menu from './components/Menu/Menu'; 
import './components/Menu/navigation.css';
import './components/Menu/style.css';
import './components/Menu/nav2.css';


import CalculatorComp from './components/Calculator/CalculatorComp';
import PolyCalculatorComp from './components/PolyCalculator/PolyCalculatorComp';
import Graph2D from './components/Graph2D/Graph2D';
import Graph3D from './components/Graph3D/Graph3D';
import './App.css';
import './main.css';

const App = () => {
  const [showComponent, setShowComponent] = useState('Calculator');



  const components = [
    {
      name: 'Graph2D',
      text: 'Графики',
    },
    {
      name: 'Calculator',
      text: 'Калькулятор',
    },
    {
      name: 'PolyCalculator',
      text: 'Полиномы',
    },
    {
      name: 'Graph3D',
      text: '3D Графика',
    },
  ];

  return (
    <div className="menu">
      <Menu showComponent={setShowComponent} /> 
      {showComponent === 'Calculator' ? (
        <CalculatorComp />
      ) : showComponent === 'PolyCalculator' ? (
        <PolyCalculatorComp />
      ) : showComponent === 'Graph2D' ? (
        <Graph2D />
      ) : showComponent === 'Graph3D' ? (
        <Graph3D />
      ) : (
        <></>
      )}
    </div>
  );
};

export default App;