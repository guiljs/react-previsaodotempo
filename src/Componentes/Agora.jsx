import React, { Component } from "react";

class Agora extends Component {
  render() {
    return (
      <div className="card text-left mb-3">
        <div className="card-body">
          <p className="card-title h4">
            Now at {this.props.cidade} - {this.props.country}{" "}
            <img
              src={
                "https://www.countryflags.io/" +
                this.props.country +
                "/shiny/64.png"
              }
            />
          </p>
          <div className="card-text">
            <img
              src={
                "https://openweathermap.org/img/w/" + this.props.icon + ".png"
              }
              alt="icone"
            />
            <div className="row">
              <div className="col-4">{this.props.descricao}</div>
              <div className="col-8">Temp : {this.props.main.temp}º</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Agora;
