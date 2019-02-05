import React, { Component } from "react";

class Dia extends Component {
  render() {
    const { previsao } = this.props;
    return (
      <React.Fragment>
        <div
          className="card  float-left text-white bg-primary mb-3"
          onClick={this.props.onClick}
        >
          <div className="card-body">
            <h5 className="card-title">
              {new Date(previsao.dt * 1000).toLocaleDateString("pt-BR")}
            </h5>
            <img
              src={
                "https://openweathermap.org/img/w/" +
                previsao.weather[0].icon +
                ".png"
              }
              alt={previsao.weather[0].description}
            />

            <p>{previsao.weather[0].description}</p>
            <p>Mínima : {previsao.main.temp_min}º</p>
            <p>Máxima : {previsao.main.temp_max}º</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Dia;
