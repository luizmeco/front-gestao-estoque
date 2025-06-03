import React, { useState, useEffect } from "react";
import api from "../../services/api.js";

// Bootstrap
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Ícones
import { FaCheck, FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Movimentacoes = () => {
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
  }, []);

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
    e.preventDefault();
    await api.put(`/atualizar/${editItem.id}`, editItem);
    setShow(false);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="container">
      <h1 className="mb-4">Movimentações</h1>
      <div className="row">
        {/* Entradas */}
        <div className="col-12 col-lg-6 mb-4">
          <div className="table-responsive">
            <table className="table border mt-3">
              <thead className="fs-4 text-center">
                <tr>
                  <th colSpan={6}>Entradas</th>
                </tr>
                <tr>
                  <th>#</th>
                  <th>Data</th>
                  <th>Produto</th>
                  <th>Peso</th>
                  <th>Valor</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody className="fs-5">
                {tabelaEntradas.map((item, i) => (
                  <tr key={`entrada-${item.id}`}>
                    <td>{i}</td>
                    <td>{formatoData(item.data)}</td>
                    <td>{item.produto}</td>
                    <td>{item.peso} Kg</td>
                    <td>{formatoReal(item.valor)}</td>
                    <td className="d-flex gap-2">
                      <button
                        onClick={() => {
                          setEditItem(item);
                          handleShow();
                        }}
                        className="btn btn-primary"
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        onClick={() => api.delete(`/deletar/${item.id}`)}
                        className="btn btn-danger"
                      >
                        <MdDeleteForever />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Saídas */}
        <div className="col-12 col-lg-6 mb-4">
          <div className="table-responsive">
            <table className="table border mt-3">
              <thead className="fs-4 text-center">
                <tr>
                  <th colSpan={6}>Saídas</th>
                </tr>
                <tr>
                  <th>#</th>
                  <th>Data</th>
                  <th>Produto</th>
                  <th>Peso</th>
                  <th>Valor</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody className="fs-5">
                {tabelaSaidas.map((item, i) => (
                  <tr key={`saida-${item.id}`}>
                    <td>{i}</td>
                    <td>{formatoData(item.data)}</td>
                    <td>{item.produto}</td>
                    <td>{item.peso} Kg</td>
                    <td>{formatoReal(item.valor)}</td>
                    <td className="d-flex gap-2">
                      <button
                        onClick={() => {
                          setEditItem(item);
                          handleShow();
                        }}
                        className="btn btn-primary"
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        onClick={() => api.delete(`/deletar/${item.id}`)}
                        className="btn btn-danger"
                      >
                        <MdDeleteForever />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de edição */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="text-primary">Editar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} className="fs-4">
            <div className="row mb-3">
              <div className="col-md-6 mx-auto">
                <label htmlFor="input-data" className="form-label text-black">
                  Data
                </label>
                <input
                  id="input-data"
                  className="form-control"
                  type="date"
                  name="data"
                  value={editItem.data}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row mb-4">
              <fieldset className="col-md-6 text-center">
                <legend className="text-black">Situação:</legend>
                <div className="d-flex justify-content-center gap-3">
                  <label htmlFor="input-entrada" className="text-black">
                    Entrada
                  </label>
                  <input
                    id="input-entrada"
                    type="radio"
                    name="situacao"
                    value="entrada"
                    checked={editItem.situacao === "entrada"}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="d-flex justify-content-center gap-3">
                  <label htmlFor="input-saida" className="text-black">
                    Saída
                  </label>
                  <input
                    id="input-saida"
                    type="radio"
                    name="situacao"
                    value="saida"
                    checked={editItem.situacao === "saida"}
                    onChange={handleChange}
                    required
                  />
                </div>
              </fieldset>

              <fieldset className="col-md-6 text-center">
                <legend className="text-black">Produto:</legend>
                <div className="d-flex justify-content-center gap-3">
                  <label htmlFor="input-morango" className="text-black">
                    Morango
                  </label>
                  <input
                    id="input-morango"
                    type="radio"
                    name="produto"
                    value="morango"
                    checked={editItem.produto === "morango"}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="d-flex justify-content-center gap-3">
                  <label htmlFor="input-tomate" className="text-black">
                    Tomate
                  </label>
                  <input
                    id="input-tomate"
                    type="radio"
                    name="produto"
                    value="tomate"
                    checked={editItem.produto === "tomate"}
                    onChange={handleChange}
                    required
                  />
                </div>
              </fieldset>
            </div>

            <div className="row">
              <div className="col-md-6">
                <label htmlFor="input-peso" className="form-label text-black">
                  Peso (Kg)
                </label>
                <input
                  id="input-peso"
                  className="form-control"
                  type="number"
                  name="peso"
                  value={editItem.peso}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="input-valor" className="form-label text-black">
                  Valor (R$)
                </label>
                <input
                  id="input-valor"
                  className="form-control"
                  type="number"
                  name="valor"
                  value={editItem.valor}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row mt-4">
              <Button
                type="submit"
                variant="primary"
                className="d-flex p-2 fs-4 mx-auto col-md-4 justify-content-center align-items-center gap-3"
              >
                <span>Editar</span>
                <FaRegEdit />
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Movimentacoes;
