import React, { Component } from 'react'
import './App.css';
import ReactDOM from 'react-dom';
import PokemonInfo from './components/PokemonInfo';

class PokeInfo extends Component {

  constructor(props) {
    super(props);    
    this.state = { value: '' };    
    this.state = { response: [] };
    this.state = { image: '' };    
    this.state = { move: '' };    
    this.state = { ability: '' };    
    this.state = { type: '' };                
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) { 
    const results = this.state.value; // '["Charmander","Squirtle", "Bulbasaur"]';   

    console.log("whosh "+results);
    event.preventDefault();
    var xhr = new XMLHttpRequest()
    var url = "https://pokeapi.co/api/v2/pokemon/"+results.toLocaleLowerCase();   
    var moves= '';
    var types = '';
    var abilities = '';
    
   
        // Se recibe la respuesta de la petición
        xhr.addEventListener ( 'load', () => {
            try {
                this.setState({ response: JSON.parse(xhr.responseText)});
                this.setState({ image: this.state.response.sprites.front_default });
                this.setState({ move: this.state.response.moves[0].move.name });
                this.setState({ ability: this.state.response.abilities[0].ability.name });
                this.setState({ type: this.state.response.types[0].type.name });
                function ConcatAbilities(value, index, array) {
                    if (abilities != null){ abilities = abilities + ", "+array[index].ability.name;}
                    else{ abilities= array[index].ability.name; }            
                }

                function ConcatMoves(value, index, array) {
                    if (moves != null){ moves = moves + ", "+array[index].move.name;}
                    else{ moves= array[index].move.name;}                      
                }

                function ConcatTypes(value, index, array) 
                    {if (types != null){ types = types + ", "+array[index].type.name; }
                    else { types = array[index].type.name; }
                }
                            
                console.log(this.state.value);
                console.log(this.state.response.abilities[0].ability.name);
                console.log(this.state.response.moves[0].move.name);
                console.log(this.state.response.sprites.front_default);
                console.log(this.state.response.types[0].type.name);                           
                
                this.state.response.abilities.map(ConcatAbilities);
                this.state.response.moves.map(ConcatMoves);
                this.state.response.types.map(ConcatTypes);                

                console.log("moves: "+moves);
                console.log("types: "+types);        
                console.log("abilities: "+abilities);  
                ReactDOM.render(<PokemonInfo    pokemon={this.state.value} 
                                                Image={this.state.image} 
                                                initialMove={this.state.move} 
                                                initialAbility={this.state.ability} 
                                                primaryType={this.state.type} />, 
                                                document.getElementById('pokemonInfo'));
            }
            catch(e) {         
                ReactDOM.render(<span>something is wrong... maybe that pokemon doesnt exists... check the console log </span> , 
                    document.getElementById('pokemonInfo'));
            }              
        })
    

    // Se genera la petición
    xhr.open('GET', url)
    xhr.send()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <form onSubmit={this.handleSubmit}>
            <label>
              <span><h2>Pokemon:</h2> </span>
              <input className="inputText" type="text" value={this.state.value} onChange={this.handleChange} />           
            <input type="submit" value="Submit" /> </label>
          </form>
        </header>
      </div>
    )
  }
}
export default PokeInfo;
