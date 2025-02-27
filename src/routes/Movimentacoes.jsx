import React from "react";
import { useState, useEffect } from "react";
import api from "../../services/api.js"

//bootstrap
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


//import icons
import { FaCheck } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Movimentacoes = () => {
    //get movimentacoes
    const [dados, setDados] = useState([])
    async function getDados() {

        try {
            const dadosFromApi = (await api.get('/consulta')).data
            setDados(dadosFromApi)
        } catch (error) {
            alert("Erro ao consultar, tente novamente")
            console.error("Erro ao consultar os dados:", error);
        }
    }

    useEffect(() => {
        getDados()
    })
    function formatoReal(valor) {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
    function formatoData(data) {
        const partes = data.split('-');
        return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }

    //configs modal e do put
    const [show, setShow] = useState(false);
    const [editItem, setEditItem] = useState({
        data: "",
        situacao: "",
        produto: "",
        peso: "",
        valor: ""
    });

    const handleChange = (event) => {
        const { name, value, type } = event.target

        setEditItem((prevData) => ({
            ...prevData,
            [name]: type === "number" ? Number(value) : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(editItem);
        await api.put(`/atualizar/${editItem.id}`, editItem)
        
    }

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <div>
            <h1>Movimentações</h1>
            <div className="table-responsive-xl">
                <table className="table mt-3" border="1">
                    <thead className="fs-4">
                        <tr>
                            <th className="col">#</th>
                            <th className="col">Data</th>
                            <th className="col">Situação</th>
                            <th className="col">Produto</th>
                            <th className="col">Peso</th>
                            <th className="col">Valor</th>
                            <th className="col" colSpan={3}></th>
                        </tr>
                    </thead>
                    <tbody className="fs-4">
                        {dados.map((item, index) => (
                            <tr key={item.id}>
                                <th>{index}</th>
                                <td>{formatoData(item.data)}</td>
                                <td>{item.situacao}</td>
                                <td>{item.produto}</td>
                                <td>{item.peso} Kg</td>
                                <td>{formatoReal(item.valor)}</td>
                                <td><button onClick={() => {
                                    setEditItem(item)
                                    handleShow()
                                }} className="btn btn-primary fs-4 p-2 d-flex"><FaRegEdit /></button></td>
                                <td><button onClick={() => { api.delete(`/deletar/${item.id}`) }} className="btn btn-danger fs-4 p-2 d-flex"><MdDeleteForever /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className='text-primary'>Editar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit} className="fs-4">
                        <div className="row mb-3">
                            <div className='col-md-6 mx-auto'>
                                <label htmlFor="input-data" className='form-label text-black'>
                                    Data
                                </label>
                                <input id='input-data' className='form-control' type="date" name='data' value={editItem.data} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="row mb-4">
                            <fieldset className='col-md-6 text-center'>
                                <legend className='text-black'>Situação:</legend>
                                <div className='d-flex justify-content-center gap-3'>
                                    <label htmlFor='input-entrada' className='text-black'>
                                        Entrada
                                    </label>
                                    <input id='input-entrada' type="radio" name="situacao" value="entrada" checked={editItem.situacao === "entrada"} onChange={handleChange} required />
                                </div>
                                <div className='d-flex justify-content-center gap-3'>
                                    <label htmlFor='input-saida' className='text-black'>
                                        Saída
                                    </label>
                                    <input id='input-saida' type="radio" name="situacao" value="saida" checked={editItem.situacao === "saida"} onChange={handleChange} required />
                                </div>
                            </fieldset>
                            <fieldset className='col-md-6 text-center'>
                                <legend className='text-black'>Produto:</legend>
                                <div className='d-flex justify-content-center gap-3'>
                                    <label htmlFor='input-morango' className="text-black">
                                        Morango
                                    </label>
                                    <input id='input-morango' type="radio" name="produto" value="morango" checked={editItem.produto === "morango"} onChange={handleChange} required />
                                </div>
                                <div className='d-flex justify-content-center gap-3'>
                                    <label htmlFor="input-tomate" className="text-black">Tomate</label>
                                    <input id='input-tomate' type="radio" name="produto" value="tomate" checked={editItem.produto === "tomate"} onChange={handleChange} required />
                                </div>
                            </fieldset>
                        </div>
                        <div className="row">
                            <div className='col-md-6'>
                                <label htmlFor="input-peso" className='form-label text-black'>
                                    Peso(Kg)
                                </label>
                                <input id='input-peso' className='form-control' type="number" name='peso' value={editItem.peso} onChange={handleChange} required />
                            </div>
                            <div className='col-md-6'>
                                <label htmlFor="input-valor" className='form-label text-black'>
                                    Valor(R$)
                                </label>
                                <input id='input-valor' className='form-control' type="number" name='valor' value={editItem.valor} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="row mt-4">
                        <Button 
                        type="submit" 
                        variant="primary" 
                        onClick={() => handleClose()} 
                        className='d-flex p-2 fs-4 mx-auto col-md-4 d-flex justify-content-center align-items-center gap-4'>
                            <span>
                            Editar
                            </span>
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