import React from "react";
import Link from "next/link";

export const Header = ()=>{

  return(
    <nav className="flex px-4 py-8 justify-between border border-red-400 bg-red-50">

      <Link href="/">
        <section className="flex items-center">
          <img src="/rick_icon.png" alt="imagen rick" width="40px"/>
          <h2>Rick y Morty app</h2>
        </section>
      </Link>
      
      <section className="flex">
        <ul className="flex gap-4 items-center">
          <Link href="/personajes">
            <li>Personajes</li>
          </Link>
          <Link href="/perfil">
            <li>Perfil</li>
          </Link>
          <Link href="acercade">
            <li>Acerca de</li>
          </Link>
        </ul>
      </section>

    </nav>
  )
}