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
    cliente: "",
    produto: "",
    tipo: "",
    qtd: "",
    valor: ""
  })

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // Para inputs numéricos, converte para número; caso contrário, mantém a string
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    setClassSpinner('');
    setClassRegistrar('visually-hidden');
    setBtnRegistrar(true);

    const dataParaEnvio = {
      data: formData.data,
      cliente: formData.cliente,
      produto: formData.produto,
      tipo: formData.tipo,
      qtd: formData.qtd,
      valor_unitario: formData.valor
    };
    
    await api.post('/registroVendas', dataParaEnvio)
    console.log(dataParaEnvio);
    handleShow()
    console.log("dados enviados com sucesso");
  }

  //configs modal
  const [show, setShow] = useState(false);

  const handleClose = () => {

    setClassSpinner('visually-hidden');
    setClassRegistrar('');
    setBtnRegistrar(false);

    setShow(false)
    setFormData({
      data: "",
      cliente: "",
      qtd: "",
      valor: ""

    })
  };
  const handleShow = () => setShow(true);

  const [classSpinner, setClassSpinner] = useState('visually-hidden');
  const [classRegistrar, setClassRegistrar] = useState('');
  const [btnRegistrar, setBtnRegistrar] = useState(false);

  return (
    <>
      <div className='card-header bg-primary rounded-4'>
        <div className='d-flex align-items-center justify-content-center gap-2'>
          <LuClipboardPlus />
          <h1>Registrar nova Venda</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit} className='row g-3 justify-content-center mt-3'>

        {/*Registrar data*/}
        <div className="row justify-content-center mb-5 col-md-4">
            <label htmlFor="input-data" className='form-label'>
              Data:
            </label>
            <input id='input-data' className='form-control' type="date" name='data' value={formData.data} onChange={handleChange} required />
        </div>
        
        
        
        <div className='justify-content-center row'>

            {/*Registrar o tipo da venda (morango ou tomate)*/}
            <div className='col-md-6 mb-5'>
              <label className='fs-2'>
                Produto da Venda:
              </label>
              <div className='d-flex justify-content-center mt-2'>
                <div className='form-check'>
                  <input className='form-check-input' type="radio" name="produto" id="radio-tomate" value="Tomate" onChange={handleChange} required/>
                  <label className='form-check-label' htmlFor="radio-tomate">
                    Tomate
                  </label>
                </div>
                <div className='form-check mx-2'>
                  <input className='form-check-input' type="radio" name="produto" id="radio-morango" value="Morango" onChange={handleChange} required/>
                  <label className='form-check-label' htmlFor="radio-morango">
                    Morango
                  </label>
                </div>
              </div>
            </div>

            {/*Registrar o tipo d (bandeja ou kg)*/} 
            <div className='col-md-6 mb-5'>
              <label className='fs-2'>
                Tipo de Venda:
              </label>
              <div className='d-flex justify-content-center mt-2'>
                <div className='form-check '>
                  <input className='form-check-input' type="radio" name="tipo" id="radio-bandeja" value="Bdj" required onChange={handleChange} />
                  <label className='form-check-label' htmlFor="radio-bandeja">
                    Bandeja
                  </label>
                </div>
                <div className='form-check mx-2'>
                  <input className='form-check-input' type="radio" name="tipo" id="radio-kg" value="Kg" required onChange={handleChange} />
                  <label className='form-check-label' htmlFor="radio-bandeja">
                    Kg
                  </label>
                </div>
              </div>
            </div>
        </div>

        

        
        {/*Registrar Cliente, Quantidade e Valor*/}
        <div className="row mb-3">
          <div className='col-md-4'>
            <label htmlFor="input-gasto" className='form-label'>
              Cliente:
            </label>
            <input id='input-cliente' placeholder='Ex: Cotripal' className='form-control' name='cliente' value={formData.cliente} onChange={handleChange} required />
          </div>

            <div className='col-md-4'>
            <label htmlFor="input-peso" className='form-label'>
              Quantidade:
            </label>
            <input id='input-peso' type='number' placeholder='Ex: 50' className='form-control' name='qtd' value={formData.qtd} onChange={handleChange} min={0} required />
          </div>

          <div className='col-md-4'>
            <label htmlFor="input-valor" className='form-label'>
              Valor Unitário:
            </label>
            <input id='input-valor' type='number' placeholder='Ex: 500,00' className='form-control' name='valor' value={formData.valor} onChange={handleChange} min={0} required />
          </div>
        </div>
        
        <div className='row justify-content-center mt-5 mb-5'>
          <button className='btn btn-rg btn-red col-md-6' type='submit' disabled={btnRegistrar}>
            <div className='fs-2 fw-medium d-flex justify-content-center gap-2 align-items-center'>
            <HiOutlineSave className={classRegistrar}/>
              <span className={classRegistrar}>Registrar</span>
              <span className={classSpinner + 'spinner-border'}></span>
            </div>
            </button>
        </div>
      </form>

      <Modal centered show={show} onHide={handleClose}>
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
              <h4 className='text-black'>Cliente</h4>
              <h5 className='text-black'>{formData.cliente}</h5>
            </div>
            <div className="col-md-6">
              <h4 className='text-black'>Valor</h4>
              <h5 className='text-black'>R$ {formData.valor}</h5>
            </div>
            <div className="col-md-6">
              <h4 className='text-black'>Quantidade</h4>
              <h5 className='text-black'>{formData.qtd} {formData.tipo}</h5>
            </div>

            <div className="col-md-6">
              <h4 className='text-black'>Produto</h4>
              <h5 className='text-black'>{formData.produto}</h5>
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

export default App;
