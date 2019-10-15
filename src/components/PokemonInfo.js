
import React from 'react';

const PokemonInfo = ({ pokemon, Image , initialMove, initialAbility, primaryType}) => {   
        
    return(  
        <div className="pokemon">   
            <h2 className="pokemon-title">{pokemon}</h2>
            <img className="pokemon-image" src={Image} />
            <hr></hr>
            <span className="pokemon-subtitle">Initial move: {initialMove}</span> <br></br>               
            <span className="pokemon-subtitle">Initial Ability: {initialAbility}</span> <br></br>                                       
            <span className="pokemon-subtitle">Primary Type: {primaryType}</span> <br></br>               
        </div>
      );    
}

export default PokemonInfo;
