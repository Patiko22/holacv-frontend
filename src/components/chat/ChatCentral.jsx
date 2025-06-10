import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const descripcionesPersonalidad = {
  "Estratega": "Visión de futuro y pensamiento analítico.",
  "Comunicador": "Expresivo, empático y claro en sus ideas.",
  "Líder Colaborativo": "Motiva y genera compromiso en los equipos.",
  "Creador": "Imaginativo, original y con mentalidad abierta.",
  "Ejecutivo": "Orientado a resultados, decisiones rápidas y claras."
};

export default function ChatCentral() {
  const [input, setInput] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [perfil, setPerfil] = useState(null);
  const chatRef = useRef(null);

  const uid = "usuario124";

  useEffect(() => {
    axios
      .get(`http://localhost:3000/data/${uid}/usuario124_config.json`)
      .then((res) => setPerfil(res.data))
      .catch(() => console.warn("⚠️ No se pudo cargar el perfil del usuario."));
  }, []);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [mensajes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMensajes((prev) => [...prev, { role: "user", content: input }]);
    setCargando(true);

    try {
      const { data } = await axios.post("http://localhost:3000/consultar-central", {
        uid,
        pregunta: input,
      });
      setMensajes((prev) => [...prev, { role: "assistant", content: data.respuesta || "Sin respuesta." }]);
    } catch (error) {
      console.error("❌ Error:", error);
      setMensajes((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Error al consultar al Asistente Central." },
      ]);
    } finally {
      setInput("");
      setCargando(false);
    }
  };

  const personalidad = perfil?.personalidad?.perfil_personalidad;
  const descripcion = personalidad && descripcionesPersonalidad[personalidad];
  const estilo = perfil?.estilo?.estilo_usuario;
  const tono = perfil?.estilo?.tono_usuario;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Cabecera */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xl">
          {perfil?.nombre?.charAt(0) || "P"}
        </div>
        <div>
          <h2 className="text-xl font-semibold">
            {perfil?.nombre || "Perfil Profesional"}
          </h2>
          {perfil?.experiencia_ultima_empresa && (
            <p className="text-sm text-gray-600">{perfil.experiencia_ultima_empresa}</p>
          )}
          {(tono || estilo) && (
            <p className="text-sm text-gray-500 italic">
              Estilo: {tono || "—"} · {estilo || "—"}
            </p>
          )}
          {personalidad && (
            <>
              <p className="text-sm text-blue-600 font-medium">{personalidad}</p>
              {descripcion && (
                <p className="text-sm text-gray-500 italic">{descripcion}</p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Chat */}
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

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          placeholder="Preguntá algo al perfil..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit" disabled={cargando}>
          Enviar
        </Button>
      </form>
    </div>
  );
}



