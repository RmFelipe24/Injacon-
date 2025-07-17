import React, { useState } from "react";
import ListaUsuarios from "./modules/ListaUsuarios";
import BuscarComponentes from "./components/BuscarComponentes";
import Login from "./components/Login";
import CrearUsuario from "./components/CrearUsuario";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./style/App.css";

function App() {
  const [currentView, setCurrentView] = useState("login"); 
  const [user, setUser] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("");
  const [impresora, setImpresora] = useState("");

  const handleLogin = (usuario) => {
    console.log("Usuario autenticado:", usuario);
    setUser(usuario);
    setCurrentView("home");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView("login");
    setBusqueda("");
    setFiltro("");
    setImpresora("");
  };

  const handleBuscar = () => {
    setFiltro(busqueda);
    setImpresora("");
  };

  const handleSeleccionImpresora = (nombre) => {
    if (nombre === "Tinta") {
      setFiltro("tinta");
    } else {
      setImpresora(nombre);
    }
    setBusqueda("");
  };

  if (currentView === "login") {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="body-bg d-flex flex-column min-vh-100">
      <header className="header-injacom">
        <div className="logo">
          <span className="verde">inja</span>
          <span className="blanco">c</span>
          <span className="verde">om</span>
        </div>
        <div className="search-bar d-flex align-items-center">
          <BuscarComponentes
            value={busqueda}
            onChange={setBusqueda}
            onBuscar={handleBuscar}
          />
          <span className="ms-4 text-primary" style={{ cursor: "pointer" }} onClick={() => setCurrentView("diagramas")}>
            Diagramas
          </span>
          <span className="ms-4 text-primary" style={{ cursor: "pointer" }} onClick={() => setCurrentView("crearUsuario")}>
            Crear Usuario
          </span>
          <div className="ms-auto d-flex align-items-center">
            <span className="me-3">Hola, {user?.username}</span>
            <button className="btn btn-sm btn-danger" onClick={handleLogout}>Cerrar sesión</button>
          </div>
        </div>
      </header>

      <div className="d-flex flex-grow-1" style={{ minHeight: 0 }}>
        <aside className="sidebar-injacom">
          <div className="sidebar-title">Impresora</div>
          <ul>
            <li onClick={() => handleSeleccionImpresora("Impresora 1")}>Impresora 1</li>
            <li onClick={() => handleSeleccionImpresora("Impresora 2")}>Impresora 2</li>
            <li onClick={() => handleSeleccionImpresora("Impresora 3")}>Impresora 3</li>
            <li onClick={() => handleSeleccionImpresora("Impresora 4")}>Impresora 4</li>
            <li
              onClick={() => handleSeleccionImpresora("Tinta")}
              style={{ cursor: "pointer", fontWeight: "bold", color: "blue" }}
            >
              Tinta
            </li>
          </ul>
        </aside>

        <main className="main-content-injacom flex-grow-1">
          {currentView === "home" && <ListaUsuarios filtro={filtro} impresora={impresora} />}
          {currentView === "crearUsuario" && <CrearUsuario onVolver={() => setCurrentView("home")} />}
          {currentView === "diagramas" && <div>Contenido de diagramas aquí...</div>}
        </main>
      </div>

      <footer className="footer-injacom">
        Copyright © 2021. Todos los derechos reservados a nombre de INJACOM
      </footer>
    </div>
  );
}

export default App;

