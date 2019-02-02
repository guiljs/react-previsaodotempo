import React, { Component } from "react";
import "./App.css";

import Dia from "./Dia";

class App extends Component {
  render() {
    let semana = [
      { dia: "Segunda", clima: "sun", minima: 20, maxima: 35 },
      { dia: "Terça", clima: "cloud-sun", minima: 22, maxima: 32 },
      { dia: "Quarta", clima: "cloud-sun-rain", minima: 25, maxima: 36 },
      { dia: "Quinta", clima: "sun", minima: 27, maxima: 30 },
      { dia: "Sexta", clima: "cloud-showers-heavy", minima: 23, maxima: 24 }
    ];
    return (
      <div className="App">
        {semana.map((e, i) => (
          <Dia previsao={e} />
        ))}
      </div>
    );
  }
}

export default App;
