import React from 'react';

const FightsNumber = ({ props }) => {
  
    return (
      <div>
        <center><h1>Number of Fights: </h1> <p className="result">{props}</p></center>       
        <hr></hr>
      </div>
    )
  };

export default FightsNumber;