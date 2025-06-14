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

function RegistroProducao() {

  //Formatação e envio de dados do form para o banco de dados
  const [formData, setFormData] = useState({
    data: "",
    estufa: "",
    peso: ""
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
    console.log(formData);
    await api.post('/registroProducao', formData)
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
      estufa: "",
      peso: ""
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
          <h1>Registrar Produção</h1>
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
          <div className='col-md-6'>
            <label htmlFor="input-gasto" className='form-label'>
              Estufa
            </label>
            <select className='form-select text-black' aria-label="Default select example" name='estufa' value={FormData.estufa} onChange={handleChange}>
              <option className='text-black' value="estufa_1">1 Estufa</option>
              <option className='text-black' value="estufa_2-4">2-4 Estufa</option>
              <option className='text-black' value="estufa_6">6 Estufa</option>
              <option className='text-black' value="estufa_7">7 Estufa</option>
              <option className='text-black' value="estufa_8">8 Estufa</option>
              <option className='text-black' value="estufa_9">9 Estufa</option>
              <option className='text-black' value="estufa_10">10 Estufa</option>
              <option className='text-black' value="estufa_12">12 Estufa</option>
              <option className='text-black' value="estufa_15-16">15-16 Estufa</option>
            </select>
          </div>

          <div className='col-md-6'>
            <label htmlFor="input-peso" className='form-label'>
              Quantidade:
            </label>
            <input id='input-peso' type='number' placeholder='Ex: 50' className='form-control' name='qtd' value={formData.qtd} onChange={handleChange} min={0} required />
          </div>
        </div>

        <div className='row justify-content-center mt-5 mb-5'>
          <button className='btn btn-rg btn-red col-md-6' type='submit' disabled={btnRegistrar}>
            <div className='fs-2 fw-medium d-flex justify-content-center gap-2 align-items-center'>
              <HiOutlineSave className={classRegistrar} />
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

export default RegistroProducao;
