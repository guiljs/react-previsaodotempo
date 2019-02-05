import React, { Component } from "react";
import Dia from "./Dia";

class Previsao extends Component {
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
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ ...this.state, cidade: e.target.value });
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
      <div className="container">
      <h1>Previsão do Tempo</h1>
        <div className="form-group">
          <label for="txtCidade">Pesquise uma cidade</label>
          <input
            type="search"
            class="form-control"
            name="txtCidade"
            id="txtCidade"
            aria-describedby="helpId"
            placeholder="Cidade"
            onChange={this.handleChange}
          />
          <small id="helpId" class="form-text text-muted">
            Digite a cidade
          </small>
        </div>
        <button
          value="Rio de Janeiro"
          onClick={() => {
            this.chamaAPI();
          }}
          className="btn btn-primary mb-3"
        >
          Previsão da cidade
        </button>

        <div class="card text-left mb-3">
          <div class="card-body">
            <h4 class="card-title">Agora em {this.state.cidade}</h4>
            <p class="card-text">
              <img
                src={
                  "https://openweathermap.org/img/w/" + this.state.icon + ".png"
                }
                alt="icone"
              />
              <p>{this.state.descricao}</p>
              <p>{this.state.main.temp}º</p>
            </p>
          </div>
        </div>
        <div className="card">
          <div class="card-body">
            <h4 className="card-title">Próximos dias</h4>
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
        </div>
      </div>
    );
  }
}
export default Previsao;
