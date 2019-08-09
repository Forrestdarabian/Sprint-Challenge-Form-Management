import React from 'react';
import ReactDOM from 'react-dom';
import FormikOnboarding from './App';

import './index.css';

function App() {
  return (
    <div className="App">
      <FormikOnboarding />
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);