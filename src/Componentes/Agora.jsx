import React, { Component } from "react";

class Agora extends Component {
  render() {
    return (
      <div className="card text-left mb-3">
        <div className="card-body">
          <h4 className="card-title">Agora em {this.props.cidade}</h4>
          <div className="card-text">
            <img
              src={
                "https://openweathermap.org/img/w/" + this.props.icon + ".png"
              }
              alt="icone"
            />
            <p>{this.props.descricao}</p>
            <p>{this.props.main.temp}º</p>
          </div>
        </div>
      </div>
    );
  }
}
export default Agora;
