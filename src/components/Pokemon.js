
import React from 'react';


const Pokemon = ({ pokemon , estado}) => {   
        
    return(  
        <div className="pokemon">
   
        <h2 className="pokemon-title">{pokemon}</h2>
        <span className="pokemon-subtitle">{estado}</span> <br></br>               
       </div>
      );    
}

export default Pokemon;
