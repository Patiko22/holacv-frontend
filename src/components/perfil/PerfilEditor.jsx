import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PerfilEditor() {
  const [perfil, setPerfil] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [guardado, setGuardado] = useState(false);

  const uid = "usuario124";

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/data/${uid}/configUsuario.json`);
        setPerfil(data);
      } catch (err) {
        console.error("Error al cargar el perfil:", err);
      } finally {
        setCargando(false);
      }
    };
    fetchPerfil();
  }, []);

  const handleChange = (seccion, campo, valor) => {
    setPerfil((prev) => ({
      ...prev,
      [seccion]: {
        ...prev[seccion],
        [campo]: valor,
      },
    }));
  };

  const guardarCambios = async () => {
    try {
      await axios.post("http://localhost:3000/guardar-etapa", {
        uid,
        datos: perfil,
      });
      setGuardado(true);
      setTimeout(() => setGuardado(false), 2000);
    } catch (err) {
      console.error("Error al guardar perfil:", err);
    }
  };

  if (cargando) return <p className="text-center py-10">Cargando perfil...</p>;

  if (!perfil) return <p className="text-center text-red-500">No se pudo cargar el perfil.</p>;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Editar Perfil Profesional</h1>

      {/* Estilo y tono */}
      <div className="mb-6">
        <label className="block font-semibold mb-1">Tono de comunicación</label>
        <Input
          value={perfil.estilo?.tono_usuario || ""}
          onChange={(e) => handleChange("estilo", "tono_usuario", e.target.value)}
          placeholder="formal, relajado, motivacional..."
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-1">Estilo preferido</label>
        <Input
          value={perfil.estilo?.estilo_usuario || ""}
          onChange={(e) => handleChange("estilo", "estilo_usuario", e.target.value)}
          placeholder="concreto, empático, ejecutivo..."
        />
      </div>

      {/* Personalidad */}
      <div className="mb-6">
        <label className="block font-semibold mb-1">Perfil de personalidad</label>
        <Input
          value={perfil.personalidad?.perfil_personalidad || ""}
          onChange={(e) => handleChange("personalidad", "perfil_personalidad", e.target.value)}
          placeholder="Estratega, Comunicador, Investigador..."
        />
      </div>

      <Button onClick={guardarCambios} disabled={guardado}>
        {guardado ? "✔️ Guardado" : "Guardar Cambios"}
      </Button>
    </div>
  );
}
