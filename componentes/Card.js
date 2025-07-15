import React from "react";

const Card = ( {munequito} )=>{

  console.log("qué es personaje aquí?",munequito)

  return(
    <section
    className="w-[300px] bg-yellow-50 border rounded-lg">
      <img src={munequito?.image}/>

      <div className="p-3">
        <h2>{munequito?.name}</h2>
        <h4>gender: {munequito?.gender}</h4>
        <h4>specie: {munequito?.species}</h4>
      </div>
      
    </section>
  )
}

export default Card;