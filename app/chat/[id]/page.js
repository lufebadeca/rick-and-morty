'use client'
import Link from "next/link";
import { Header } from "@/componentes/Header";
import { Footer } from "@/componentes/Footer";
import { useParams } from "next/navigation"; //lee los params de la ruta
import { ListaPersonajes } from "@/componentes/ListaPersonajes.js";
import { useState, useEffect } from "react";

export default function Chat() {

  const params = useParams();
  console.log(params);

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
    <div className="h-[100vw]">
      <Header/>

      <ListaPersonajes personajes={personajes}/>

      <div className="p-8">
        <h1>Este es el user {params.id}</h1>
        <p>Acá va a salir el chat con el user {params.id}</p>
      </div>

      <Footer/>
    </div>
  );
}
