import React, { Component } from "react";
import ResumoDia from "./ResumoDia";
class Semana extends Component {
  render() {
    let previousDay = null;

    return (
      <div>
        <h4>Next days</h4>
        {this.props.forecast
          .filter((value, index) => {
            let d = new Date(value.dt * 1000);
            if (d.getDay() != previousDay) {
              previousDay = d.getDay();
              return true;
            } else {
              return false;
            }
          })
          .map((value, index) => (
            <React.Fragment key={index}>
              <ResumoDia
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
