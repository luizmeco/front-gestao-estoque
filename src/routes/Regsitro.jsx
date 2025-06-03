import { useState } from 'react'
import api from '../../services/api.js'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { FaCheck } from "react-icons/fa";
import { LuClipboardPlus } from "react-icons/lu";
import { TbArrowsLeftRight } from "react-icons/tb";
import { BsBasket } from "react-icons/bs";
import { FaRegCalendarAlt } from "react-icons/fa";
import { HiOutlineSave } from "react-icons/hi";






function App() {

  //Formatação e envio de dados do form para o banco de dados
  const [formData, setFormData] = useState({
    data: "",
    situacao: "",
    produto: "",
    peso: "",
    valor: ""
  })

  const handleChange = (event) => {
    const { name, value, type } = event.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "number" ? Number(value) : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData);
    await api.post('/cadastrar', formData)
    handleShow()
    console.log("dados enviados com sucesso");

  }

  //configs modal
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
    setFormData({
      data: "",
      situacao: "",
      produto: "",
      peso: "",
      valor: ""
    })
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <div className='card-header bg-primary rounded-4'>
        <div className='d-flex align-items-center justify-content-center gap-2'>
          <LuClipboardPlus />
          <h1>Novo Registro</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit} className='row g-3 justify-content-center mt-3'>
        <div className="row justify-content-center mb-3">
          <div className='col-md-6'>
            <div className='d-flex justify-content-center'>
              <label htmlFor="input-data" className='form-label d-flex align-items-center gap-2'>
                <FaRegCalendarAlt />
                <span>Data</span>
              </label>
            </div>
            <input id='input-data' className='form-control' type="date" name='data' value={formData.data} onChange={handleChange} required />
          </div>
        </div>
        <div className="row mb-3">
          <fieldset className='col-md-6 fs-4'>
            <div className='fs-2 d-flex justify-content-start gap-2 align-items-center fw-medium'>
              <span>Situação</span>
              <TbArrowsLeftRight />
            </div>
            <div className='row d-flex justify-content-center mt-3'>
              <div className='d-flex justify-content-start gap-5'>
                <div className='d-flex justify-content-center gap-2'>
                  <label htmlFor='input-entrada' className=''>
                    Entrada
                  </label>
                  <input className='form-check-input' id='input-entrada' type="radio" name="situacao" value="entrada" checked={formData.situacao === "entrada"} onChange={handleChange} required />
                </div>

                <div className='d-flex justify-content-start gap-2'>
                  <label htmlFor='input-saida' className=''>
                    Saída
                  </label>
                  <input className='form-check-input' id='input-saida' type="radio" name="situacao" value="saida" checked={formData.situacao === "saida"} onChange={handleChange} required />
                </div>
              </div>
              <p className='fs-5 fw-light text-white text-opacity-75 text-start'>Selecione a data da movimentação</p>
            </div>
          </fieldset>
          <fieldset className='col-md-6 fs-4'>
            <div className='fs-2 fw-medium d-flex justify-content-start gap-2 align-items-center'>
              <span>Produto</span>
              <BsBasket />
            </div>
            <div className='row d-flex justify-content-center mt-3'>
              <div className='d-flex justify-content-start gap-5'>
                <div className='d-flex justify-content-center gap-2'>
                  <label htmlFor='input-morango'>
                    Morango
                  </label>
                  <input className='form-check-input' id='input-morango' type="radio" name="produto" value="morango" checked={formData.produto === "morango"} onChange={handleChange} required />
                </div>
                <div className='d-flex justify-content-center gap-2'>
                  <label htmlFor="input-tomate">Tomate</label>
                  <input className='form-check-input' id='input-tomate' type="radio" name="produto" value="tomate" checked={formData.produto === "tomate"} onChange={handleChange} required />
                </div>
              </div>
              <p className='fs-5 fw-light text-white text-opacity-75 text-start'>Selecione o tipo de produto</p>
            </div>
          </fieldset>
        </div>
        <div className="row">
          <div className='col-md-6'>
            <label htmlFor="input-peso" className='form-label fs-2 fw-medium'>
              Peso(Kg)
            </label>
            <input id='input-peso' className='form-control' type="number" name='peso' value={formData.peso} onChange={handleChange} required />
            <p className='fs-5 fw-light text-white text-opacity-75 text-center'>Insira o peso em quilogramas</p>
          </div>
          <div className='col-md-6'>
            <label htmlFor="input-valor" className='form-label fs-2 fw-medium'>
              Valor(R$)
            </label>
            <input id='input-valor' className='form-control' type="number" name='valor' value={formData.valor} onChange={handleChange} required />
            <p className='fs-5 fw-light text-white text-opacity-75 text-center'>Insira o valor em reais</p>
          </div>
        </div>
        <div className='row justify-content-center mt-5 mb-5'>
          <button className='btn btn-rg btn-red col-md-6' type='submit'>
            <div className='fs-2 fw-medium d-flex justify-content-center gap-2 align-items-center'>
              <HiOutlineSave />
              <span className=''>Registrar</span>
            </div>
            </button>
        </div>
      </form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className='text-success'>Registro Efetuado!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <h4 className='text-black'>Data</h4>
              <h5 className='text-black'>{formData.data}</h5>
            </div>

            <div className="col-md-6">
              <h4 className='text-black'>Situação</h4>
              <h5 className='text-black'>{formData.situacao}</h5>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-6">
              <h4 className='text-black'>Peso</h4>
              <h5 className='text-black'>{formData.peso} Kg</h5>
            </div>
            <div className="col-md-6">
              <h4 className='text-black'>Valor</h4>
              <h5 className='text-black'>R$ {formData.valor}</h5>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose} className='d-flex p-2 fs-4'>
            <FaCheck />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default App
