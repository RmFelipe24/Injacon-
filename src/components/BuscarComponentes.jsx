import React, { useState } from "react";

const BuscarComponentes = ({ value, onChange }) => (
  <div className="d-flex align-items-center">
    <input
      type="text"
      className="form-control"
      placeholder="Buscar"
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ width: "100%" }}
    />
  </div>
);

const App = () => {
  const lista = [
    { id: 1, nombre: "Camisa Roja" },
    { id: 2, nombre: "Camisa Azul" },
    { id: 3, nombre: "Pantalón Negro" },
    { id: 4, nombre: "Zapatos Deportivos" },
    { id: 5, nombre: "Camiseta Blanca" },
  ];

  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState(lista);

  const manejarCambio = (texto) => {
    setBusqueda(texto);
    const filtrados = lista.filter(item =>
      item.nombre.toLowerCase().includes(texto.toLowerCase())
    );
    setResultados(filtrados);
  };

  return (
    <div className="container mt-4">
      <h2>Buscar Productos</h2>
      <BuscarComponentes value={busqueda} onChange={manejarCambio} />

      <ul className="mt-3 list-group">
        {resultados.length > 0 ? (
          resultados.map(item => (
            <li key={item.id} className="list-group-item">
              {item.nombre}
            </li>
          ))
        ) : (
          <li className="list-group-item text-danger">No se encontraron resultados.</li>
        )}
      </ul>
    </div>
  );
};

export default App;
