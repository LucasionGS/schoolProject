import React from 'react';
import "./App.css";
import Router from "./Router";

function App() {
  return (
    <div className="App">
      <Router path={window.location.pathname} params={new URLSearchParams(window.location.search)}></Router>
    </div>
  );
}

export default App;
