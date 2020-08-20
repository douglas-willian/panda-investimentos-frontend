import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { ToastContainer, notify } from '../../services/notification';

import api from "../../services/api";
import "./styles.css";

import logoImg from "../../assets/logo.svg";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      await api.post("register", data);

      notify(`Cadastro Realizado com Sucesso!`);

      history.push("/");
    } catch (err) {
      notify('error', 'Erro no cadastro, tente novamente.');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="" />

          <h1>Cadastro</h1>
          <p>Invista com tranquilidade.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Já tenho cadastro
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}
