import React from 'react';
import logo from './logo.svg';
import ErrorBoundary from './ErrorBoundary';
import Timer from './components/Timer';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Шаблон React успешно развернут, <br />
            Ждите обновлений от AI :)
          </p>
          <div className="Timer-container">
            <h2>Timer Component</h2>
            <Timer />
          </div>
        </header>
      </div>
    </ErrorBoundary>
  );
}

export default App;
