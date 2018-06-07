import React, { Component } from 'react';
import Cloud from './sun-cloud-icon.png';
import Test from './test.png';
import './App.css';

console.log(Cloud)

class App extends Component {

  //*************** Intializing *******************
  constructor(props){
    super(props)
    this.state = {
      key: '',
      place: '',
      date: '' ,
      text: 'Hello Guys! Welcome to Weather Outlook',
      mininF: '',
      maxinF: '',
      mininC: '',
      maxinC: '',
      dayicon: Test,
      nighticon: Test,
      day: '',
      night: '',
    }
  }

  // current-key: 1A5EWQnGyHTPapyrBsgsO9RwN4uksc3I
  // current-location-API: http://dataservice.accuweather.com/forecasts/v1/daily/1day/202446?apikey=1A5EWQnGyHTPapyrBsgsO9RwN4uksc3I
  // To get image use : https://developer.accuweather.com/sites/default/files/04-s.png

  //***************** Get the Key of City Searched Using Accuweather Location API *********************
  getKey = (event) => {
    event.preventDefault()
    fetch('http://dataservice.accuweather.com/locations/v1/cities/search?apikey=1A5EWQnGyHTPapyrBsgsO9RwN4uksc3I&q=' + this.refs.cityname.value)
      .then(response => response.json())
      .then(data =>
        this.setState({
          key: data[0].Key            //Store the key in state
        })
      )
    console.log(this.state.key)
  }

  //************** display weather info got from Accuweather Forecast API ********************
  displayData = (event) => {
    event.preventDefault()
    var d = new Date();           //Date Object
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.setState({
      date: d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear(),        //Store current date in state
      place: this.refs.cityname.value.toUpperCase(),        //Store city in state
    })
    fetch('http://dataservice.accuweather.com/forecasts/v1/daily/1day/' + this.state.key + '?apikey=1A5EWQnGyHTPapyrBsgsO9RwN4uksc3I')
      .then(response => response.json())
      .then(data => this.setState({
        text: data.Headline.Text,
        mininF: data.DailyForecasts[0].Temperature.Minimum.Value + '°F',
        maxinF: data.DailyForecasts[0].Temperature.Maximum.Value + '°F',
        mininC: 'Minimum Temperature: ' + Math.round((parseInt(data.DailyForecasts[0].Temperature.Minimum.Value)-32)/1.8).toString() + '°C',
        maxinC: 'Maximum Temperture: ' + Math.round((parseInt(data.DailyForecasts[0].Temperature.Maximum.Value)-32)/1.8).toString() + '°C',
        dayicon: parseInt(data.DailyForecasts[0].Day.Icon) < 10 ? 'https://developer.accuweather.com/sites/default/files/0' + data.DailyForecasts[0].Day.Icon + '-s.png' : 'https://developer.accuweather.com/sites/default/files/' + data.DailyForecasts[0].Day.Icon + '-s.png',
        nighticon: parseInt(data.DailyForecasts[0].Night.Icon) < 10 ? 'https://developer.accuweather.com/sites/default/files/0' + data.DailyForecasts[0].Night.Icon + '-s.png' : 'https://developer.accuweather.com/sites/default/files/' + data.DailyForecasts[0].Night.Icon + '-s.png',
        day: 'Expected At Day: ' + data.DailyForecasts[0].Day.IconPhrase,
        night: 'Expected At Night: ' + data.DailyForecasts[0].Night.IconPhrase,
      }))
  }

  render(){

    return(
      <div style = {{width: '100%'}}>
        <div className = 'header'>
          <center>
            <img src = {Cloud} alt = 'Cloud Icon' height = '70px' width = '70px'/>
            <span className = 'title'> Weather Outlook </span>
          </center>
        </div>
        <center>
          <div className = 'container'>
            <form onSubmit = {this.displayData}>
              <input ref = 'cityname' type = 'text' placeholder = 'Search City' onBlur = {this.getKey} className = 'input' />
              <button onClick = {this.displayData} className = 'button'>Search</button>
            </form>
            <center>
              <div className = 'place'>{this.state.place}</div>
              <div className = 'date'>{this.state.date}</div>
              <div><b>{this.state.text}</b></div>
              <div className = 'temp'>
                <div>{this.state.mininC}  {this.state.mininF}</div>
                <div>{this.state.maxinC}  {this.state.maxinF}</div>
              </div>
              <div>
                <figure>
                  <img src = {this.state.dayicon} height = '100px' width = '150px' />
                  <figcaption><b>{this.state.day}</b></figcaption>
                </figure>
              </div>
              <div>
                <figure>
                  <img src = {this.state.nighticon} height = '100px' width = '150px' />
                  <figcaption><b>{this.state.night}</b></figcaption>
                </figure>
              </div>
            </center>
          </div>
        </center>
      </div>
    )
  }
}

export default App;
