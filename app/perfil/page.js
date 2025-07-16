import Link from "next/link";
import { Header } from "@/componentes/Header";
import { Footer } from "@/componentes/Footer";

export default function Perfil() {

  return (
    <div className="flex flex-col h-max">
      <Header/>

      <div className="p-8">
        <h1>Este es mi Perfil</h1>
        <p>Acá va a salir mi perfil</p>
      </div>

      <Footer/>
    </div>
  );
}
