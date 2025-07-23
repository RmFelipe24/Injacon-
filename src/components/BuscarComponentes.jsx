import React from "react";

const BuscarComponentes = ({ value, onChange, onBuscar }) => (
  
  <div className="d-flex align-items-center">
    <input
    
      type="text"
      className="form-control"
      placeholder="Buscar"
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}

    />
    
    <button className="btn btn-success ms-2" onClick={onBuscar}>
      Buscar
    </button>
  </div>
);

export default BuscarComponentes;