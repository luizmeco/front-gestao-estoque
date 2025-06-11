import React, { useState, useEffect } from "react";
import api from "../../services/api.js";

// Bootstrap
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Ícones
import { FaCheck, FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const RegistroProducao = () => {
  const [dados, setDados] = useState([]);
  const [show, setShow] = useState(false);
  const [editItem, setEditItem] = useState({
    data: "",
    situacao: "",
    produto: "",
    peso: "",
    valor: "",
  });

  useEffect(() => {
    async function getDados() {
      try {
        const dadosFromApi = (await api.get("/consulta")).data;
        setDados(dadosFromApi);
      } catch (error) {
        alert("Erro ao consultar, tente novamente");
        console.error("Erro ao consultar os dados:", error);
      }
    }
    getDados();
  }, [dados]);

  const tabelaSaidas = dados.filter((item) => item.situacao === "saida");
  const tabelaEntradas = dados.filter((item) => item.situacao === "entrada");

  const formatoReal = (valor) =>
    valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const formatoData = (data) => {
    const partes = data.split("-");
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  };

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    setEditItem((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(editItem);
    await api.put(`/atualizar/${editItem.id}`, editItem)
  };

  const handleClose = () => {
    setShow(false);
    
  }
  const handleShow = () => setShow(true);

  return (
    <div className="container">
      Teste
    </div>
  );
};

export default RegistroProducao;
