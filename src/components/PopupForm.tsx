
import React, { useState } from "react";
import InputMask from "react-input-mask";
import "../styles/Formulario.css";

const Formulario = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = {
      nome,
      email,
      whatsapp
    };

    try {
      const response = await fetch("https://www.geneseez.com/webhook/formulario-site", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar dados");
      }

      setEnviado(true);
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
    }
  };

  return (
    <div className="formulario-container">
      <h2>Solicite seu site gratuito</h2>
      {enviado ? (
        <p>Obrigado! Seus dados foram enviados com sucesso.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="nome">Nome completo:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="whatsapp">WhatsApp com DDD:</label>
          <InputMask
            mask="(99) 99999-9999"
            id="whatsapp"
            name="whatsapp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            required
          />

          <button type="submit">Quero meu site grátis</button>
        </form>
      )}
    </div>
  );
};

export default Formulario;
