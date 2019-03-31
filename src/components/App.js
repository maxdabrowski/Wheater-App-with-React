import React, { Component } from "react";
import "./App.css";
import Form from "./Form";
import Result from "./Result";

class App extends Component {
  state = {
    value: "",
    date: "",
    time: "",
    city: "",
    sunrise: "",
    sunset: "",
    temp: "",
    pressure: "",
    wind: "",
    clouds: "",
    error: false,
    icon: ""
  };

  handleInputChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  handleCitySubmit = e => {
    e.preventDefault();

    const API = `https://api.openweathermap.org/data/2.5/weather?q=${
      this.state.value
    }&appid=0f950eda622707e675ea5e8bddc2abe1&units=metric`;

    fetch(API)
      .then(response => {
        if (response.ok) {
          return response;
        }
        throw Error("nie znaleziono miasta");
      })
      .then(response => response.json())
      .then(data => {
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        });

        this.setState(prevState => ({
          error: false,
          date: date,
          time: time,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          temp: data.main.temp,
          pressure: data.main.pressure,
          wind: data.wind.speed,
          city: this.state.value,
          clouds: data.clouds.all,
          icon: data.weather[0].icon
        }));
      })

      .catch(err => {
        this.setState(prevState => ({
          error: true,
          city: prevState.value
        }));
      });
  };

  render() {
    return (
      <div className="app">
        <Form
          value={this.state.value}
          change={this.handleInputChange}
          submit={this.handleCitySubmit}
        />
        <Result weather={this.state} />
      </div>
    );
  }
}
export default App;
