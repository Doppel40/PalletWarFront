import React, { Component } from 'react'
import './App.css';
import ReactDOM from 'react-dom';
import Pokemon from './components/Pokemon';
import FightsNumber from './components/FightsNumber';
import DisplayChaos from './components/DisplayChaos';

class App extends Component {

  constructor(props) {
    super(props);  
    this.state = { value: '' };
    this.state = { response: [] };  
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) { 
 
    event.preventDefault();
    var xhr = new XMLHttpRequest()
    var url = "https://6og08elki9.execute-api.us-east-1.amazonaws.com/Dev/Palletwar";

    const results = this.state.value; // '["Charmander","Squirtle", "Bulbasaur"]';

    function IsThereChaos(chaos) {
      console.log("Is there chaos " + chaos.chaos);
      if (chaos.chaos == "Y") {
        return <DisplayChaos />;
      }

      console.log("fights number  " + chaos.fightsNumber);
      return <FightsNumber props={chaos.fightsNumber} />;
    }

    // Se recibe la respuesta de la petición
    xhr.addEventListener ( 'load', () => {
      try{
      this.setState({ response: JSON.parse(xhr.responseText) });
      this.setState({ chaos: this.state.response.chaos });
      this.setState({ petitions: this.state.response.petitions });
      this.setState({ fightsNumber: this.state.response.fightsNumber });
      this.setState({ FightsList: this.state.response.FightsArray });      

      function FightListPrint(props) {                       
        return (
          <div className="App">
            <table>
              <thead> 
                <tr>
                  <th colSpan='2'>
                    <h1>Fights Results</h1>
                  </th>                
                </tr>               
              </thead>
              <tbody>
                {props.map(function (d, idx) {
                  return (
                    <tr>
                      <td>                      
                        <Pokemon pokemon={d.winner} estado={'Winner'} />                        
                      </td>
                      <div>
                        VS
                      </div>
                      <td>                                              
                        <Pokemon pokemon={d.loser} estado={'Loser'} />                        
                      </td>
                    </tr>)                  
                })}
              </tbody>
              <tfoot></tfoot>
            </table>
          </div>
        );
      }            
      if (this.state.chaos == "N"){
        // seguimiento
        console.log("response " + xhr.responseText);
        console.log("response resultsarray " + this.state.response.resultsArray);
        console.log("response chaos " + this.state.response.chaos + " ||  state chaos " + this.state.chaos);
        console.log("response fightsNumber " + this.state.response.fightsNumber + " ||  state fightsnumber " + this.state.fightsNumber);
        console.log("response petitions " + this.state.response.petitions + " state petitions  " + this.state.petitions);
        console.log("response fightsArray " + this.state.response.FightsArray + " state fightsArray " + this.state.FightsList[0].winner);
        
        ReactDOM.render(FightListPrint(this.state.FightsList), document.getElementById('FightsList'));        
      }else
      {
        console.log("chaos other chaos "+this.state.chaos);
        ReactDOM.render(<div></div>, document.getElementById('FightsList'));
      }
      ReactDOM.render(<IsThereChaos chaos={this.state.chaos} fightsNumber={this.state.fightsNumber} />, document.getElementById('FightsNumber'));      
    }
    catch(e) {         
        ReactDOM.render(<span>something is wrong with the fights... </span> , 
            document.getElementById('FightsList'));
    } 
    })

    // Se genera la petición
    xhr.open('POST', url)
    xhr.send(results)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <form onSubmit={this.handleSubmit}>
            <label>
              <span><h2>Results:</h2> </span>
              <input className="inputText" type="text" value={this.state.value} onChange={this.handleChange} />           
            <input type="submit" value="Submit" /> </label>
          </form>

        </header>
      </div>
    )
  }
}
export default App;
