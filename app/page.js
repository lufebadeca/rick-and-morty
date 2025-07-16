'use client'
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import { Header } from "@/componentes/Header";
import Card from "@/componentes/Card";
import { Footer } from "@/componentes/Footer";
import { ListaPersonajes } from "@/componentes/ListaPersonajes.js";

export default function Home() {

  //estado que llevará la lista de personajes
  const [ personajes, setPersonajes ] = useState( [] ); //un estado, y una funcion para cambiar es estado

  //ata la ejecucion de la funcion del fetch a la primera carga del componente
  useEffect( ()=>{
    async function traerPersonajes (){
      const resp = await fetch('https://rickandmortyapi.com/api/character');
      //console.log(resp)
      const respuesta = await resp.json();
      //console.log(respuesta)
      const listaPersonajes = respuesta.results //lista
      //guardar la lista de personajes en un estado, para poderlo usar en el contenido
      setPersonajes(listaPersonajes);
    }
    traerPersonajes();
  }, [] ) //
 

  return (
    <div className="h-[100vh] ">

     <Header/>

      <h1>Chatea con un personaje</h1>

      <div className="flex">
        <ListaPersonajes personajes={personajes}/>
      
        <section className="p-8 flex flex-wrap gap-3 overflow-auto">
          { personajes.map( (personaje)=>
            <Link href={`/chat/${personaje.id}`} key={personaje.id}>
            <Card munequito={personaje} /> 
            </Link>
          )}
        </section>

      </div>
      

      <Footer/>
    </div>
  );
}
