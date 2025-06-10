import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CargaCVInicial({ onFinalizar }) {
  const [cvCargado, setCvCargado] = useState(false);
  const [linkedin, setLinkedin] = useState("");
  const [pdf, setPdf] = useState(null);

  const uid = "usuario124";

  useEffect(() => {
    axios.get(`http://localhost:3000/data/${uid}/${uid}_config.json`)
      .then(() => setCvCargado(true))
      .catch(() => setCvCargado(false));
  }, []);

  const handleGuardarLinkedin = async () => {
    if (!linkedin.trim()) return;

    try {
      await axios.post("http://localhost:3000/subir-experiencia", {
        uid,
        textoExtraido: `LinkedIn: ${linkedin}`
      });
      setCvCargado(true);
      onFinalizar();
    } catch (err) {
      console.error("Error guardando LinkedIn:", err);
    }
  };

  const handleSubirCV = async () => {
    if (!pdf) return;

    try {
      const formData = new FormData();
      formData.append("cv", pdf);
      formData.append("uid", uid);

      await axios.post("http://localhost:3000/subir-experiencia", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setCvCargado(true);
      onFinalizar();
    } catch (err) {
      console.error("Error subiendo el CV:", err);
    }
  };

  const handleOmitir = () => {
    onFinalizar();
  };

  if (cvCargado) {
    onFinalizar();
    return null;
  }

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Comencemos por tu CV</h1>
      <p className="mb-6 text-muted-foreground">
        Antes de iniciar, podés subir tu CV o conectar tu perfil de LinkedIn para completar tu experiencia automáticamente.
      </p>

      <div className="flex flex-col gap-4 mb-6">
        <Input
          type="file"
          accept=".pdf"
          onChange={(e) => setPdf(e.target.files[0])}
        />
        <Button onClick={handleSubirCV}>Subir CV</Button>

        <Input
          type="text"
          placeholder="Pega aquí tu URL de LinkedIn"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />
        <Button onClick={handleGuardarLinkedin}>Guardar y continuar</Button>

        <Button variant="outline" onClick={handleOmitir}>
          Prefiero completarlo manualmente
        </Button>
      </div>
    </div>
  );
}
