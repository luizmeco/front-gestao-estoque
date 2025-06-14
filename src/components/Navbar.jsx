import React from "react";
import './Navbar.css'
import { Link } from "react-router-dom";
import logo from '../assets/img/logo.png';

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg bg-primary mh-100 text-center slide-down">
            <div className="container-fluid w-75 p-1">
                <Link to={"/"}>
                    <img src={logo} alt="logo" className="logo" />
                </Link>
                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end slide-down" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0 gap-3">
                        <li className="nav-item btn-nb btn btn-primary mx-auto px-4">
                            <Link className="nav-link text-white" aria-current="page" to={"/registroVenda"}>Registrar Venda</Link>
                        </li>
                        <li className="nav-item btn-nb btn btn-primary mx-auto px-4">
                            <Link className="nav-link text-white" aria-current="page" to={"/registroGasto"}>Registrar Gasto</Link>
                        </li>
                        <button className="nav-item btn-nb btn btn-primary mx-auto px-4">
                            <Link className="nav-link text-white" aria-current="page" to={"/Producao"}>Registrar Produção</Link>
                        </button>
                        <li className="nav-item btn-nb btn btn-primary mx-auto px-4">
                            <Link className="nav-link text-white" aria-current="page" to={"/movimentacoes"}>Movimentações</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar