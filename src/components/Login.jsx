import React, { useState } from 'react';
import injacomLogo from '../assets/INJACOM png.png';
import loginBackground from '../assets/fondo1.jpg';

const Login = ({ onLogin }) => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usuario && clave) {
      onLogin(usuario); // Mismo comportamiento que log1
    } else {
      setError('Por favor, completa ambos campos');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>
      {/* Imagen izquierda */}
      <div style={{ flex: 1, position: 'relative' }}>
        <img
          src={loginBackground}
          alt="Fondo"
          style={{
            width: '100%',
            height: '100vh',
            objectFit: 'cover',
            display: 'block'
          }}
        />
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)'
        }}></div>
      </div>

      {/* Formulario */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        background: 'linear-gradient(135deg, #091337 0%, #00699e 50%, #47b648 100%)',
        minHeight: '100vh'
      }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '1rem 1.5rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}>
                <img
                  src={injacomLogo}
                  alt="Injacom Logo"
                  style={{ height: '48px', width: 'auto' }}
                />
              </div>
            </div>
          </div>

          {/* Título */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem'
            }}>
              Iniciar Sesión - Administrador
            </h1>
            <p style={{
              color: '#dbeafe',
              fontSize: '0.875rem'
            }}>
              Acceso exclusivo para administradores
            </p>
          </div>

          {/* Formulario login */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            {error && (
              <div style={{
                marginBottom: '1rem',
                padding: '1rem',
                backgroundColor: 'rgba(239, 68, 68, 0.3)',
                borderRadius: '8px',
                border: '1px solid rgba(239, 68, 68, 0.4)'
              }}>
                <p style={{
                  color: '#fecaca',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  margin: 0
                }}>
                  {error}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  display: 'block'
                }}>
                  Usuario
                </label>
                <input
                  type="text"
                  name="usuario"
                  value={usuario}
                  onChange={(e) => {
                    setUsuario(e.target.value);
                    setError('');
                  }}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: '500',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Ingresa tu nombre de usuario"
                  required
                />
              </div>

              <div>
                <label style={{
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  display: 'block'
                }}>
                  Contraseña
                </label>
                <input
                  type="password"
                  name="clave"
                  value={clave}
                  onChange={(e) => {
                    setClave(e.target.value);
                    setError('');
                  }}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: '500',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Ingresa tu contraseña"
                  required
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'white',
                  color: '#1e3a8a',
                  fontWeight: '600',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  marginTop: '1rem'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#f1f5f9';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'white';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;