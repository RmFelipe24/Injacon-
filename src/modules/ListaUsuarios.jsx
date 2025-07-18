import React, { useEffect, useState } from "react";
import axios from "axios";
import TarjetaUsuario from "../components/TarjetaUsuario";
import imagenRespaldo from "../images/images.png";

const ITEMS_PER_PAGE = 8;

const ListaUsuarios = ({ filtro, impresora }) => {
  const [users, setUsers] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 useEffect(() => {
  if (!impresora) return;

  setLoading(true);
  setError(null);

  axios
    .get("/package-lock.json")
    .then((response) => {
      setUsers(response.data.items || []);
      setLoading(false);
      setPaginaActual(1);
    })
    .catch(() => {
      setError("Error cargando datos");
      setLoading(false);
    });
}, [impresora]);

const usuariosFiltrados = users.filter((user) => {
  const nombre = user.name?.toLowerCase() || "";

  const cumpleFiltro = filtro
    ? nombre.includes(filtro.toLowerCase())
    : true;

  const cumpleImpresora = impresora
    ? user.compatible_printers?.some((p) =>
        p.toLowerCase().includes(impresora.toLowerCase())
      )
    : true;

  return cumpleFiltro && cumpleImpresora;
});

  const totalPaginas = Math.ceil(usuariosFiltrados.length / ITEMS_PER_PAGE);
  const inicio = (paginaActual - 1) * ITEMS_PER_PAGE;
  const usuariosPagina = usuariosFiltrados.slice(inicio, inicio + ITEMS_PER_PAGE);

  if (loading) return <div className="text-center mt-5">Cargando...</div>;
  if (error) return <div className="text-danger text-center mt-5">{error}</div>;

  return (
    <div className="lista-usuarios-container">
      <h1 className="mb-4 text-primary fw-bold text-center">Lista de Ítems</h1>
      <div className="lista-usuarios-list d-flex flex-wrap justify-content-center">
        {usuariosPagina.length === 0 ? (
          <p className="text-center">No se encontraron ítems.</p>
        ) : (
          usuariosPagina.map((user) => (
            <div
              key={user.item_id}
              className="card shadow-sm"
              style={{ width: "calc(25% - 1rem)", marginBottom: "1rem" }}
            >
              <img
                src={`http://localhost:4000/items/${user.item_id}/image`}
                alt={user.name}
                className="card-img-top p-3"
                style={{ height: "180px", objectFit: "contain" }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = imagenRespaldo;
                }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">
                  <strong>Precio:</strong> ${user.rate}
                </p>
                <p className="card-text">
                  <strong>Código:</strong> {user.sku}
                </p>
                <p className="card-text">
                  <strong>Existencia:</strong> {user.available_stock}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Paginación */}
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-outline-primary me-2"
          onClick={() => setPaginaActual((p) => Math.max(1, p - 1))}
          disabled={paginaActual === 1}
        >
          Anterior
        </button>
        <span className="align-middle mx-2">
          Página {paginaActual} de {totalPaginas}
        </span>
        <button
          className="btn btn-outline-primary ms-2"
          onClick={() => setPaginaActual((p) => Math.min(totalPaginas, p + 1))}
          disabled={paginaActual === totalPaginas}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ListaUsuarios;
