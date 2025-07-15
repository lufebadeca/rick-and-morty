'use client'
import Link from "next/link";
import { Header } from "@/componentes/Header";
import { Footer } from "@/componentes/Footer";
import { useParams } from "next/navigation";

export default function Chat() {

  const params = useParams();
  console.log(params)

  return (
    <div className="h-[100vw]">
      <Header/>

      <div className="p-8">
        <h1>Este es el user {params.id}</h1>
        <p>Acá va a salir el chat con el user {params.id}</p>
      </div>

      <Footer/>
    </div>
  );
}
