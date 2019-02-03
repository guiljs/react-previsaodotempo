import React, { Component } from "react";
import "./App.css";
import Dia from "./Dia";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cidade: "Sao Paulo",
      descricao: "",
      icon: "01",
      forecast: [],
      main: ""
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.chamaAPI();
  }
  chamaAPI() {
    console.log("Chama API");
    console.log(this.state.cidade);
    const weatherUrl =
      "http://api.openweathermap.org/data/2.5/weather?APPID=92f8f0fbf240fc46079bafca7aa56c15&q=" +
      this.state.cidade +
      "&units=metric&lang=pt";
    const foreacastUrl =
      "http://api.openweathermap.org/data/2.5/forecast?APPID=92f8f0fbf240fc46079bafca7aa56c15&q=" +
      this.state.cidade +
      "&units=metric&lang=pt";

    console.log(weatherUrl);
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
            icon: data.weather[0].icon,
            main: data.main
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
    return (
      <div className="App">
        <button
          value="Rio de Janeiro"
          onClick={() => {
            this.setState(
              { ...this.state, cidade: "Rio de Janeiro" },
              function() {
                this.chamaAPI();
              }
            );
          }}
        >
          Previsão Rio de Janeiro
        </button>
        <h1>Tempo em {this.state.cidade}</h1>
        <img
          src={"https://openweathermap.org/img/w/" + this.state.icon + ".png"}
          alt="icone"
        />
        <p>{this.state.descricao}</p>
        <p>{this.state.main.temp}</p>

        <h2>Próximos dias</h2>
        {this.state.forecast
          .filter((value, index) => {
            let d = new Date(value.dt * 1000);
            return d.getHours() === 10;
          })
          .map((value, index) => (
            <React.Fragment key={index}>
              <Dia
                key={index}
                previsao={value}
                onClick={() => {
                  console.log(value.dt);
                }}
              />
            </React.Fragment>
          ))}
      </div>
    );
  }
}

export default App;
