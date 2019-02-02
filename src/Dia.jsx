import React, { Component } from "react";

class Dia extends Component {
  render() {
      const {previsao} = this.props;
    return (
      <React.Fragment>
        <div className="card">
        <p>{previsao.dt_txt}</p>     
        <img
          src={"https://openweathermap.org/img/w/" + previsao.weather[0].icon + ".png"}
          alt={previsao.weather[0].description}
        />
        
        <p>{previsao.weather[0].description}</p>   
        <p>Mínima : {previsao.main.temp_min}º</p>
        <p>Máxima : {previsao.main.temp_max}º</p>        
        </div>

        
      </React.Fragment>
    );
  }
}

export default Dia;
