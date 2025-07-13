'use client'
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import { Header } from "@/componentes/Header";
import Card from "@/componentes/Card";
import { Footer } from "@/componentes/Footer";

export default function Home() {

  //estado que llevará la lista de personajes
  const [ personajes, setPersonajes ] = useState([]); //un estado, y una funcion para cambiar es estado

  //ata la ejecucion de la funcion del fetch a la primera carga del componente
  useEffect( ()=>{
    async function traerPersonajes (){
      const resp = await fetch('https://rickandmortyapi.com/api/character');
      //console.log(resp);
      const respuesta = await resp.json();
      //console.log(respuesta);

      const listaPersonajes = respuesta.results //lista
      //console.log( listaPersonajes)

      //guardar la lista de personajes en un estado, para poderlo usar en el contenido
      setPersonajes(listaPersonajes)
    }
    traerPersonajes();
  }, [] )
 

  return (
    <div className="h-[100vh] ">

     <Header/>

      <div className="p-8">
        <h1>Este es mi home</h1>
        <Card munequito={personajes[0]}/>
      </div>

      <Footer/>
    </div>
  );
}
