import React, { useState, useEffect, useMemo } from "react";
import api from "../../services/api.js";

// Bootstrap
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Ícones
import { FaCheck, FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import "./Movimentacoes.css";

const Movimentacoes = () => {
  const [dadosVendas, setDadosVendas] = useState([]);
  const [dadosGastos, setDadosGastos] = useState([]);

  async function getDados() {
    try {
      const dadosFromGastos = (await api.get("/gastos")).data;
      setDadosGastos(dadosFromGastos);
      console.log(dadosFromGastos);
      const dadosFromVendas = (await api.get("/vendas")).data;
      setDadosVendas(dadosFromVendas);
      console.log(dadosFromVendas);
    } catch (error) {
      alert("Erro ao consultar, tente novamente");
      console.error("Erro ao consultar os dados:", error);
    }
  }

  useEffect(() => {
    getDados();
  }, []);
  const formatoReal = (valor) =>
    valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const formatoData = (data) => {
    const dataFormatada = new Date(data);
    const dia = dataFormatada.getDate().toString().padStart(2, '0');
    const mes = (dataFormatada.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataFormatada.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  function dataIsoToDate(data) {
    const dataFormatada = new Date(data);
    const ano = dataFormatada.getFullYear();
    const mes = (dataFormatada.getMonth() + 1).toString().padStart(2, '0');
    const dia = dataFormatada.getDate().toString().padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }

  const handleChangeVenda = (event) => {
    const { name, value, type } = event.target;
    setEditVenda((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleChangeGasto = (event) => {
    const { name, value, type } = event.target;
    setEditGasto((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  // Mostrar Modal

  const [editVenda, setEditVenda] = useState({
    data: "",
    cliente: "",
    produto: "",
    qtd: "",
    tipo: "",
    valor_unitario: "",
  });

  const [editGasto, setEditGasto] = useState({
    data: "",
    produto: "",
    qtd: "",
    valor: "",
  });

  const [modalVenda, setModalVenda] = useState(false);
  const [modalGasto, setModalGasto] = useState(false);

  const submitModalVenda = async (e) => {
    e.preventDefault();

    setClassSpinner('');
    setClassRegistrar('visually-hidden');
    setBtnRegistrar(true);

    console.log(editVenda);
    await api.put(`/atualizarVenda/${editVenda.id}`, editVenda);
    closeModalVenda();
  };

  const submitModalGasto = async (e) => {
    e.preventDefault();

    setClassSpinner('');
    setClassRegistrar('visually-hidden');
    setBtnRegistrar(true);

    console.log(editGasto);
    await api.put(`/atualizarGasto/${editGasto.id}`, editGasto);
    closeModalGasto();
  };

  const closeModalVenda = async () => {
    await getDados();

    setClassSpinner('visually-hidden');
    setClassRegistrar('');
    setBtnRegistrar(false);

    setModalVenda(false);
  };
  const closeModalGasto = async () => {
    await getDados();

    setClassSpinner('visually-hidden');
    setClassRegistrar('');
    setBtnRegistrar(false);
    
    setModalGasto(false);
  };

  const showModalVenda = () => setModalVenda(true);
  const showModalGasto = () => setModalGasto(true);

  // Filtros das tabelas

  const [classeGastos, setClasseGastos] = useState("hide");
  const [classeVendas, setClasseVendas] = useState("");

  const [btnGastos, setBtnGastos] = useState(true);
  const [btnVendas, setBtnVendas] = useState(false);

  const hideVendas = () => {
    setClasseVendas("hide");
    setClasseGastos("");

    setBtnGastos(false);
    setBtnVendas(true);
  };
  const hideGastos = () => {
    setClasseVendas("");
    setClasseGastos("hide");

    setBtnGastos(true);
    setBtnVendas(false);
  };

  // const [totalGastos, setTotalGastos] = useState([0]);
  // const [totalVendas, setTotalVendas] = useState([0]);

  const totalGastos = useMemo(() => {
    return dadosGastos.reduce((acc, item) => acc + parseFloat(item.total), 0);
  }, [dadosGastos]);

  const totalVendas = useMemo(() => {
    return dadosVendas.reduce((acc, item) => acc + parseFloat(item.valor_total), 0);
  }, [dadosVendas]);

  // carregamento
  const [classSpinner, setClassSpinner] = useState('visually-hidden');
  const [classRegistrar, setClassRegistrar] = useState('');
  const [btnRegistrar, setBtnRegistrar] = useState(false);

  return (
    <div className="container">
      <h1 className="mb-4">Movimentações</h1>
      <div className="row">
        <div className="row">
          
          <button disabled={btnGastos} className="btn btn-red col-3 col-md-3 me-3" onClick={hideGastos}>
            Vendas
          </button>

          <button disabled={btnVendas} className="btn btn-red col-3" onClick={hideVendas}>
            Gastos
          </button>
        </div>

        {/* Gastos */}
        <div className={classeGastos} id="gastos">
          <div className="table-responsive mt-3" style={{ maxHeight: '600px', overflowY: 'auto' }}>
            <table className="table table-hover">
              <thead className="fs-4">
                <tr>
                  <th colSpan={8}>Gastos</th>
                </tr>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Data</th>
                  <th scope="col">Desc.</th>
                  <th scope="col">Qtd</th>
                  <th scope="col">Valor Unit.</th>
                  <th scope="col">Valor Total</th>
                  <th scope="col">Apagar</th>
                </tr>
              </thead>
              <tbody className="fs-5">
                {dadosGastos.map((item, i) => (
                    <tr className="rows" key={item.id} onClick={() => {
                      showModalGasto() 
                      setEditGasto(item)
                      }}>
                    <th>{i}</th>
                    <td>{formatoData(item.data)}</td>
                    <td>{item.produto}</td>
                    <td>{item.qtd}</td>
                    <td>{item.valor_unitario}</td>
                    <td>{item.total}</td>
                    <td>
                      <button
                        onClick={async () => {
                          setDadosGastos(dadosGastos.filter(gasto => gasto.id !== item.id));
                          await api.delete(`/deletarGasto/${item.id}`);
                          getDados();
                        }}
                        className="btn btn-danger"
                      >
                        <MdDeleteForever />
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <th>Total:</th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{formatoReal(totalGastos)}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Vendas */}
        <div className={classeVendas} id="vendas">
          <div className="table-responsive mt-3" style={{ maxHeight: '600px', overflowY: 'auto' }}>
            <table className="table table-hover">
              <thead className="fs-4 text-center">
                <tr>
                  <th colSpan={9}>Vendas</th>
                </tr>
                <tr>
                  <th>#</th>
                  <th>Data</th>
                  <th>Cliente</th>
                  <th>Produto</th>
                  <th>Qtd</th>
                  <th>Valor Un.</th>
                  <th>Valor Total</th>
                  <th>Apagar</th>
                </tr>
              </thead>
              <tbody className="fs-5">
                {dadosVendas.map((item, i) => (
                  <tr className="rows" key={item.id} onClick={() => {
                    showModalVenda() 
                    setEditVenda(item)
                    }}>
                    <td>{i}</td>
                    <td>{formatoData(item.data)}</td>
                    <td>{item.cliente}</td>
                    <td>{item.produto}</td>
                    <td>{item.qtd} {item.tipo}</td>
                    <td>{item.valor_unitario}</td>
                    <td>{item.valor_total}</td>
                    <td>
                      <button
                        onClick={async () => {
                          setDadosVendas(dadosVendas.filter(venda => venda.id !== item.id));
                          await api.delete(`/deletarVenda/${item.id}`);
                          getDados();
                        }}
                        className="btn btn-danger"
                      >
                        <MdDeleteForever />
                      </button>
                    </td>
                  </tr>
                ))}
                 <tr>
                  <th>Total:</th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{formatoReal(totalVendas)}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de edição Vendas */}
      <Modal centered show={modalVenda} onHide={closeModalVenda}>
        <Modal.Header closeButton className="d-flex justify-content-center">
          <Modal.Title className="text-primary">Editar Venda</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitModalVenda} className="fs-4">
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
                  value={dataIsoToDate(editVenda.data)}
                  onChange={handleChangeVenda}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6 mx-auto">
                <label htmlFor="input-cliente" className="form-label text-black">
                  Cliente
                </label>
                <input
                  id="input-data"
                  className="form-control"
                  type="text"
                  name="cliente"
                  value={editVenda.cliente}
                  onChange={handleChangeVenda}
                  required
                />
              </div>
            </div>

            <div className="row mb-4">
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
                    value="Morango"
                    onChange={handleChangeVenda}
                    checked={editVenda.produto === "morango" || editVenda.produto === "Morango"}
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
                    value="Tomate"
                    onChange={handleChangeVenda}
                    checked={editVenda.produto === "tomate" || editVenda.produto === "Tomate"}
                    required
                  />
                </div>
              </fieldset>

              <fieldset className="col-md-6 text-center">
                <legend className="text-black">Tipo:</legend>
                <div className="d-flex justify-content-center gap-3">
                  <label htmlFor="input-bdj" className="text-black">
                    Bdj
                  </label>
                  <input
                    id="input-entrada"
                    type="radio"
                    name="tipo"
                    value="Bdj"
                    checked={editVenda.tipo === "Bdj" || editVenda.tipo === "bdj"}
                    onChange={handleChangeVenda}
                    required
                  />
                </div>
                <div className="d-flex justify-content-center gap-3">
                  <label htmlFor="input-kg" className="text-black">
                    Kg
                  </label>
                  <input
                    id="input-saida"
                    type="radio"
                    name="tipo"
                    value="Kg"
                    checked={editVenda.tipo === "Kg" || editVenda.tipo === "kg"}
                    onChange={handleChangeVenda}
                    required
                  />
                </div>
              </fieldset>

              
            </div>

            <div className="row">
              <div className="col-md-6">
                <label htmlFor="input-peso" className="form-label text-black">
                  Qtd (Bdj ou Kg)
                </label>
                <input
                  id="input-peso"
                  className="form-control"
                  type="number"
                  name="qtd"
                  value={editVenda.qtd}
                  onChange={handleChangeVenda}
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
                  name="valor_unitario"
                  value={editVenda.valor_unitario}
                  onChange={handleChangeVenda}
                  required
                />
              </div>
            </div>

            <div className="row mt-4">
              <Button
                disabled={btnRegistrar}
                type="submit"
                variant="primary"
                className="d-flex p-2 fs-4 mx-auto col-md-4 justify-content-center align-items-center gap-3"
              >
                <span className={classRegistrar}>Editar</span>
                <FaRegEdit className={classRegistrar}/>
                <span className={classSpinner + 'spinner-border'}></span>
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal de edição Gastos */}
      <Modal centered show={modalGasto} onHide={closeModalGasto}>
        <Modal.Header closeButton className="d-flex justify-content-center">
          <Modal.Title className="text-primary">Editar Gastos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitModalGasto} className="fs-4">
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
                  value={dataIsoToDate(editGasto.data)}
                  onChange={handleChangeGasto}
                  required
                />
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-6 mx-auto">
                <label htmlFor="input-produto" className="form-label text-black">
                  Produto
                </label>
                <input
                  id="input-produto"
                  className="form-control"
                  type="text"
                  name="produto"
                  value={editGasto.produto}
                  onChange={handleChangeGasto}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <label htmlFor="input-qtd" className="form-label text-black">
                  Qtd
                </label>
                <input
                  id="input-qtd"
                  className="form-control"
                  type="number"
                  name="qtd"
                  value={editGasto.qtd}
                  onChange={handleChangeGasto}
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
                  value={editGasto.valor_unitario}
                  onChange={handleChangeGasto}
                  required
                />
              </div>
            </div>

            <div className="row mt-4">
              <Button
                disabled={btnRegistrar}
                type="submit"
                variant="primary"
                className="d-flex p-2 fs-4 mx-auto col-md-4 justify-content-center align-items-center gap-3"
              >
                <span className={classRegistrar}>Editar</span>
                <FaRegEdit className={classRegistrar}/>
                <span className={classSpinner + 'spinner-border'}></span>
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Movimentacoes;
