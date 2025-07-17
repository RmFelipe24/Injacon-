import React from "react";
import imagenRespaldo from "../images/images.png"; // Imagen local de respaldo
import "../style/TarjetaUsuario.css"; // si tienes estilos propios opcionales

const TarjetaUsuario = ({ user }) => {
  return (
    <div
      className="card shadow-sm"
      style={{ width: 'calc(25% - 1rem)', marginBottom: '1rem' }}
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
        <h5 className="card-title">{user.name || "Sin nombre"}</h5>
        <p className="card-text"><strong>Precio:</strong> ${user.rate || "No disponible"}</p>
        <p className="card-text"><strong>Código:</strong> {user.sku || "No disponible"}</p>
        <p className="card-text"><strong>Existencia:</strong> {user.available_stock || "No disponible"}</p>
        <p className="card-text text-muted">
          Categoría: {user.item_category?.name || "No disponible"}
        </p>
      </div>
    </div>
  );
};

export default TarjetaUsuario;