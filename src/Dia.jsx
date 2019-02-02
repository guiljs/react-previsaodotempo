import React, { Component } from "react";

class Dia extends Component {
  render() {
      const {previsao} = this.props;
    return (
      <React.Fragment>
        <div className="card">
        <i className={"fa fa-"+previsao.clima}></i> 
        <p>{previsao.dia}</p>        
        <p>Mínima : {previsao.minima}º</p>
        <p>Máxima : {previsao.maxima}º</p>

        
        </div>

        
      </React.Fragment>
    );
  }
}

export default Dia;
