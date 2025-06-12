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
    produto: "",
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
      produto: formData.produto,
      qtd: formData.qtd,
      valor_unitario: formData.valor
    };
    console.log(dataParaEnvio);
    await api.post('/registroGastos', dataParaEnvio)
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
      gasto: "",
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
          <h1>Registrar novo Gasto</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit} className='row g-3 justify-content-center mt-3'>
        <div className="row justify-content-center mb-3 col-md-4">
            <label htmlFor="input-data" className='form-label'>
              Data:
            </label>
            <input id='input-data' className='form-control' type="date" name='data' value={formData.data} onChange={handleChange} required />
        </div>
        <div className="row mb-3">
          <div className='col-md-4'>
            <label htmlFor="input-gasto" className='form-label'>
              Descrição do Gasto:
            </label>
            <input id='input-gasto' placeholder='Ex: Veneno' className='form-control' name='produto' value={formData.produto} onChange={handleChange} required />
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

      <Modal
      centered 
      show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className='text-success'>Registro Efetuado!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row text-center">
            <div className="col-md-6">
              <h4 className='text-black'>Data</h4>
              <h5 className='text-black'>{formData.data}</h5>
            </div>
            <div className="col-md-6">
              <h4 className='text-black'>Gasto</h4>
              <h5 className='text-black'>{formData.produto}</h5>
            </div>

            <div className="col-md-12 text-center">
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

export default App;
