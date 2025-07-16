import React from "react";
import Link from "next/link";

export const ListaPersonajes = ( {personajes} )=>{

  console.log("estos son los pers", personajes)

  return(
    <section className="flex flex-col border border-gray-200 h-[75vh] w-1/5 overflow-y-auto">

      <h1>Lista de personajes</h1>

      <section>
        {personajes && personajes.map( (pers)=>(
          <Link href={`/chat/${pers.id}`} key={pers.id}>
            <article className="flex justify-between items-center bg-gray-100 p-2 m-3 rounded-md" >
            <img src={pers.image} className="rounded-full w-[30px]"/>
            <h4 className="text-xs">{pers.name}</h4>
            <h4 className="text-xs text-gray-500">{pers.gender}</h4>
          </article>
          </Link>
        ))}
      </section>

    </section>
  )
}