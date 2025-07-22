'use client'
import Link from "next/link";
import { Header } from "@/componentes/Header";
import { Footer } from "@/componentes/Footer";
import { useParams } from "next/navigation"; //lee los params de la ruta
import { ListaPersonajes } from "@/componentes/ListaPersonajes";
import { useState, useEffect, useRef } from "react";
import { GoogleGenAI} from "@google/genai"

const ai = new GoogleGenAI( {apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY} );

export default function Chat() {
  const [ personajes, setPersonajes ] = useState( [] ); //un estado, y una funcion para cambiar es estado
  const [ personajeActivo, setPersonajeActivo] = useState();

  //estados clave para la conversación: uno con el texto a escribir
  const [textoInput, setTextoInput] = useState("");
  //el otro estado es un array que guarda mensajes
  const [conversacion, setConversacion] = useState([]);

  const params = useParams(); // useParams lee el id incrustado en la URL de la ruta: ej: { id: 7 }
  const idActivo = params.id;  // el id traido de params: ej: 7
  //console.log(idActivo);

  const [chatHistorialRef, setChatHistorialRef] = useState(null);

  //ref para ubicar el final del chat
  const [loader, setLoader] = useState(false);
  const chatWindowRef = useRef(null);

  useEffect(()=>{ 
    if (!conversacion || !personajeActivo) return;
    const chatInstance = ai.chats.create({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction: `Eres una persona llamada ${personajeActivo?.name}, tu género es ${personajeActivo?.gender}, tu origen es ${personajeActivo?.origin.name} y estamos en una conversación de chat`
    },
    history: conversacion.map( (msg)=>
      ( { role: msg.remitente === "yo" ? "user" : "model", parts: [{text: msg.texto}] } )
    )});
    setChatHistorialRef(chatInstance);

    chatWindowRef.current?.scrollIntoView({behavior: "smooth"});

  }, [conversacion, personajeActivo])
  
  ////este use effect trae los 20 personajes con fetch en la primera carga del componente
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
  }, [] ) 

  //este useEffect es para traer un unico personaje que es el activo en la page
  useEffect( ()=>{
    async function traerActivo (){
      const resp = await fetch('https://rickandmortyapi.com/api/character/'+ idActivo);
      const respuesta = await resp.json();
      setPersonajeActivo(respuesta);
    }
    traerActivo();
  }, [idActivo])

  //funcion que envia el mensaje
  const enviarMensaje=async ()=>{
    if (textoInput==="") return //si el texto a enviar es vacio, sale
    // mensaje es un objeto con propiedades: {remitente: "yo", texto: "hola"}
    // conversacion es una lista de mensajes:  [remitente: "", texto: "hi", remitente: "yo", texto: "bye"]

    const nuevoMensaje = {remitente: "yo", texto: textoInput};
    
    setConversacion((prev) => { return [...prev, nuevoMensaje] });
    setLoader(true);
    setTextoInput("");
    const response = await geminiResponse(nuevoMensaje.texto);
    const mensajeRespta = {remitente: "gemini", texto: response}
    setConversacion((prev) => { return [...prev, mensajeRespta] });
    setLoader(false);
    console.log(conversacion);
  }

  const geminiResponse = async (prompt)=>{
    const response = await chatHistorialRef.sendMessage({
      message: prompt,
    });
    console.log(response);
    return response.text;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header/>

      <div className="flex flex-1 overflow-hidden">

        <ListaPersonajes personajes={personajes}/>

        <section className="flex flex-col flex-1 py-4 text-gray-700 space-y-2 ">

          <article className="flex justify-between p-4 bg-blue-200">
            <p>Conversa con {personajeActivo?.name}</p>
            <img src={personajeActivo?.image} className="w-[30px] rounded-full"></img>
          </article>

          <section className="flex flex-col flex-1 p-4 bg-white rounded-lg shadow-md overflow-y-auto">
            {conversacion.map( (mensaje, index)=> 
              <p key={index} className={`p-2 m-1 rounded-lg w-3/4 ${mensaje.remitente === "yo" ? 
                    "bg-blue-500 text-white self-end" : 
                    "bg-gray-200 text-gray-800 self-start"}`} //estilos condicionales segun remitente
                    >
                {mensaje.texto}
              </p>
            )}
            { loader && <p id="endchatref" ref={chatWindowRef}>Escribiendo...</p>}
          </section>

          <div className="flex gap-6 px-4 py-1">
            <input 
              id="texto"
              type="text"
              placeholder="escribe un mensaje"
              className="border border-blue-300 w-full bg-white rounded-sm p-2 hover:border-blue-600"
              value={textoInput}
              onChange={ (e)=>setTextoInput(e.target.value) }
              onKeyDown={(e)=>e.key==="Enter" && enviarMensaje()} //evento de tecla enter
              />
            <button
              className="bg-blue-300 border px-4 py-2 rounded-md hover:cursor-pointer hover:-translate-y-0.5"
              onClick={enviarMensaje} >
                Enviar
            </button>
          </div>        

        </section>

      </div>

      <Footer/>
    </div>
  );
}
