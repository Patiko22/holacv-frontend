import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CargaCVInicial from "./CargaCVInicial";

const BASE_URL = "https://holacv-backend.onrender.com";

export default function AsistenteGuia() {
  const [input, setInput] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mostrarAsistente, setMostrarAsistente] = useState(false);
  const [etapaActual, setEtapaActual] = useState(null);
  const yaSaludo = useRef(false);
  const chatRef = useRef(null);

  const uid = localStorage.getItem("uid");

useEffect(() => {
  const verificarYClonar = async () => {
    try {
      const { data: config } = await axios.get(`${BASE_URL}/data/${uid}/configUsuario.json`);
      const yaExiste = await axios.get(`${BASE_URL}/data/${uid}/asistentes.json`).then(() => true).catch(() => false);
      if (!yaExiste && config?.nombre) {
        await axios.post(`${BASE_URL}/clonar-asistentes`, { uid, nombreUsuario: config.nombre });
      }
    } catch (err) {
      console.warn("⚠️ Error en verificación inicial:", err);
    }
  };
  verificarYClonar();
}, []);

const enviarMensaje = async (mensaje) => {
  const nuevoMensaje = { role: "user", content: mensaje };
  setMensajes((prev) => [...prev, nuevoMensaje]);
  setCargando(true);

  try {
    console.log("📤 Payload enviado a consultar-guia:", { uid, pregunta: mensaje });
    const { data } = await axios.post(`${BASE_URL}/consultar-guia`, {
      uid,
      pregunta: mensaje,
    });

    console.log("📥 Respuesta del backend:", data.respuesta);

    const match = data.respuesta.match(/```json\n([\s\S]*?)\n```/);
    if (match) {
      const jsonStr = match[1];
      const etapaDetectada = Object.keys(JSON.parse(jsonStr))[0];
      if (etapaDetectada) setEtapaActual(etapaDetectada);

      await axios.post(`${BASE_URL}/guardar-etapa`, {
        uid,
        datos: JSON.parse(jsonStr),
      });
    }

    setMensajes((prev) => [...prev, { role: "assistant", content: data.respuesta }]);
  } catch (error) {
    console.error("❌ Error al consultar al asistente guía:", error);
    setMensajes((prev) => [
      ...prev,
      { role: "assistant", content: "⚠️ Error al consultar al asistente guía." },
    ]);
  } finally {
    setCargando(false);
    setInput("");
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    enviarMensaje(input);
  };

  if (!mostrarAsistente) {
    return <CargaCVInicial onFinalizar={() => setMostrarAsistente(true)} />;
  }

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Asistente Guía</h1>
      <div ref={chatRef} className="border rounded-lg p-4 mb-4 h-96 overflow-y-auto bg-white">
        {mensajes.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
            <span className={`inline-block px-3 py-2 rounded-lg ${msg.role === "user" ? "bg-blue-100" : "bg-gray-100"}`}>
              {msg.content}
            </span>
          </div>
        ))}
        {cargando && <p className="text-gray-500 italic">Escribiendo...</p>}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          placeholder="Escribí tu respuesta..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit" disabled={cargando}>Enviar</Button>
      </form>
    </div>
  );
}
