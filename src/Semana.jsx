import React, { Component } from "react";
import Dia from "./Dia";
class Semana extends Component {
  render() {
    return (
      <div>
        <h4>Próximos dias</h4>
        {this.props.forecast
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

export default Semana;
