import React from "react";
import './Navbar.css'
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg bg-primary mh-100 text-center slide-down">
            <div className="container-fluid w-75 p-1">
                <a className="navbar-brand text-white" href="#">Gestão de estoque</a>
                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end slide-down" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0 gap-3">
                        <li className="nav-item btn btn-primary mx-auto px-4">
                            <Link className="nav-link text-white" aria-current="page" to={"/registros"}>Registros</Link>
                        </li>
                        <li className="nav-item btn btn-primary mx-auto px-4">
                            <Link className="nav-link text-white" aria-current="page" to={"/movimentacoes"}>Movimentacoes</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar