import { Header } from "@/componentes/Header";
import { Footer } from "@/componentes/Footer";


export default function Acerca() {

  return(
    <>
      <Header/>

      <div className="p-8">
        <h2>Acerca de:</h2>
        <p>Este proyecto muestra personajes de Rick y Morty usando la API de Rick y Morty</p>
      </div>
    
      <Footer/>
    </>
  )
}