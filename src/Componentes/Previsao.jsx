import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Semana from "./Semana";
import Agora from "./Agora";
import Wait from "./Wait";

class Previsao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cidade: "Sao Paulo",
      descricao: "",
      icon: "01",
      forecast: [],
      main: "",
      show: false
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleChange(e) {
    this.setState({ ...this.state, cidade: e.target.value });
  }

  componentDidMount() {
    this.chamaAPI();
  }

  handleClose() {
    this.setState({ ...this.state, show: false });
  }

  handleShow() {
    this.setState({ ...this.state, show: true });
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
    this.setState({ ...this.state, waitVisible: true });
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

    fetch(foreacastUrl)
      .then(r => {
        if (r.status !== 200) {
          this.setState({ forecast: [] });
          console.log(r);
          r.json().then(data => {
            //alert(data.message);
            this.setState({ ...this.state, show: true, message: data.message });
          });
          return;
        }
        r.json()
          .then(data => {
            this.setState({ ...this.state, forecast: data.list });
          })
          .then(this.setState({ ...this.state, waitVisible: false }));
      })

      .catch(function(err) {
        console.log("Fetch Error : -s", err);
      });
  }

  render() {
    return (
      <div className="container">
        <Wait visible={this.state.waitVisible} />

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Opa!</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.message}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>

        <h1>Previsão do Tempo</h1>
        <div className="input-group mb-3">
          <input
            type="search"
            className="form-control"
            name="txtCidade"
            id="txtCidade"
            aria-describedby="helpId"
            placeholder="Cidade"
            onChange={this.handleChange}
          />

          <div className="input-group-append">
            <button
              value="Rio de Janeiro"
              onClick={() => {
                this.chamaAPI();
              }}
              className="btn btn-primary mb-3"
            >
              Buscar
            </button>
          </div>
        </div>

        <Agora
          cidade={this.state.cidade}
          icon={this.state.icon}
          descricao={this.state.descricao}
          main={this.state.main}
        />

        <Semana forecast={this.state.forecast} />
      </div>
    );
  }
}
export default Previsao;
