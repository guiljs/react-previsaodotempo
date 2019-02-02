import React, { Component } from "react";
import "./App.css";

import Dia from "./Dia";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { cidade: "", descricao: "", icon: "", forecast: [] };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const weatherUrl =
      "http://api.openweathermap.org/data/2.5/weather?APPID=92f8f0fbf240fc46079bafca7aa56c15&id=3448439";
    const foreacastUrl =
      "http://api.openweathermap.org/data/2.5/forecast?APPID=92f8f0fbf240fc46079bafca7aa56c15&id=3448439&units=metric";

    fetch(weatherUrl)
      .then(response => {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }

        // Examine the text in the response
        response.json().then(data => {
          this.setState({
            ...this.state,
            cidade: data.name,
            descricao: data.weather[0].description,
            icon: data.weather[0].icon
          });
          console.log(data.name);
        });
      })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });

    fetch(foreacastUrl).then(r => {
      r.json().then(data => {
        this.setState({ ...this.state, forecast: data.list });
      });
    });
  }
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
        <h1>Tempo em {this.state.cidade}</h1>
        <img
          src={"https://openweathermap.org/img/w/" + this.state.icon + ".png"}
          alt="icone"
        />
        <p>{this.state.descricao}</p>
        {semana.map((e, i) => (
          <Dia key={i} previsao={e} />
        ))}

        <div>
          {this.state.forecast.map((value, index) => (
            <div>
              <p>Data e hora : {value.dt_txt}</p>
              <p>Temperatura : {value.main.temp}º</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
