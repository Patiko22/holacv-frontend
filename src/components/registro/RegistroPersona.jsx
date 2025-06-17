import React, { useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export default function RegistroPersona() {
  const handleLoginSuccess = async (response) => {
    try {
      const jwt = response.credential;
      const decoded = JSON.parse(atob(jwt.split(".")[1]));

      const uid = decoded.sub;
      const nombre = decoded.given_name || decoded.name || "Usuario";
      const email = decoded.email;

      const payload = {
        uid,
        nombre,
        email,
        tipoUsuario: "persona"
      };

      console.log("Payload enviado al backend:", payload);

      await axios.post(`${API}/configurar-bot`, payload);

      localStorage.setItem("uid", uid);
      window.location.href = "/guia";
    } catch (error) {
      console.error("❌ Error al registrar usuario:", error);
    }
  };

  useEffect(() => {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleLoginSuccess
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleBtn"),
        { theme: "outline", size: "large" }
      );
    } else {
      console.warn("⚠️ Google Identity Services aún no cargado.");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-muted">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Iniciá sesión</h2>

        <div id="googleBtn" className="flex justify-center mb-6"></div>

        <div className="relative flex justify-center items-center my-6">
          <span className="absolute bg-white px-2 text-muted-foreground text-sm">o</span>
          <div className="border-t w-full"></div>
        </div>

        <div className="space-y-4 text-muted-foreground text-sm text-center">
          <p>Dirección de email</p>
          <Button variant="outline" disabled className="w-full">No habilitado por ahora</Button>

          <p>Contraseña</p>
          <Button variant="outline" disabled className="w-full">No habilitado por ahora</Button>

          <Button disabled className="w-full bg-muted">Iniciá sesión</Button>
        </div>

        <p className="text-center mt-6 text-sm text-muted-foreground">
          ¿No tenés una cuenta? <span className="underline cursor-pointer">Registrarse</span>
        </p>
      </div>
    </div>
  );
}
