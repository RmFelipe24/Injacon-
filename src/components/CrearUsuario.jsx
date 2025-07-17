import React, { useState } from 'react';
import injacomLogo from '../assets/INJACOM png.png';
import loginBackground from '../assets/fondo1.jpg';
import CustomAlert from './CustomAlert'; 

const CrearUsuario = ({ onBack, onUserCreated }) => {
  const [formData, setFormData] = useState({
    username: ''
  });

  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({
    title: '',
    message: '',
    type: 'success'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulación de creación de usuario
    try {
      // Aquí iría la lógica real de creación de usuario
      // Por ahora es solo una simulación
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mostrar alert personalizado de éxito
      setAlertData({
        title: '¡Usuario Creado!',
        message: `El usuario "${formData.username}" ha sido creado exitosamente y ya puede acceder al sistema.`,
        type: 'success'
      });
      setShowAlert(true);
      
      // Limpiar formulario
      setFormData({ username: '' });
      
      // Callback para notificar que se creó el usuario
      if (onUserCreated) {
        onUserCreated(formData.username);
      }
      
    } catch (error) {
      // Mostrar alert de error
      setAlertData({
        title: 'Error',
        message: 'No se pudo crear el usuario. Por favor, intente nuevamente.',
        type: 'error'
      });
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    // Redirigir al home después de cerrar el alert
    if (alertData.type === 'success') {
      setTimeout(() => {
        onBack();
      }, 300); // Pequeña pausa para la animación
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>
      {/* Sección izquierda - Imagen de fondo */}
      <div style={{ flex: 1, position: 'relative' }}>
        <img 
          src={loginBackground}
          alt="Persona trabajando en computadora"
          style={{
            width: '100%',
            height: '100vh',
            objectFit: 'cover',
            display: 'block'
          }}
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)'
        }}></div>
      </div>
    
      {/* Sección derecha - Formulario */}
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
                  style={{ height: '48px', width: 'auto', margin: '0 auto' }}
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
              Crear Nuevo Usuario
            </h1>
            <p style={{ 
              color: '#dbeafe', 
              fontSize: '0.875rem' 
            }}>
              Panel de administración - Creación de usuarios
            </p>
          </div>

          {/* Formulario */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h2 style={{
              color: 'white',
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              Datos del Usuario
            </h2>
            <p style={{
              color: '#dbeafe',
              fontSize: '0.875rem',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              Ingrese el nombre de usuario para la nueva cuenta
            </p>

            {/* Información para el administrador */}
            <div style={{
              marginBottom: '1.5rem',
              padding: '1rem',
              backgroundColor: 'rgba(34, 197, 94, 0.3)',
              borderRadius: '8px',
              border: '1px solid rgba(34, 197, 94, 0.4)'
            }}>
              <p style={{ color: '#bbf7d0', fontSize: '0.875rem', margin: 0 }}>
                <strong style={{ color: 'white' }}>Información:</strong><br/>
                El usuario creado tendrá permisos básicos del sistema.<br/>
              </p>
            </div>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                }}>
                  Nombre de usuario
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
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
                  placeholder="Ingresa el nombre de usuario"
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  backgroundColor: loading ? '#6b7280' : 'white',
                  color: loading ? '#d1d5db' : '#1e3a8a',
                  fontWeight: '600',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '1rem',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  marginTop: '1rem'
                }}
                onMouseOver={(e) => {
                  if (!loading) {
                    e.target.style.backgroundColor = '#f1f5f9';
                    e.target.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!loading) {
                    e.target.style.backgroundColor = 'white';
                    e.target.style.transform = 'translateY(0)';
                  }
                }}
              >
                {loading ? 'Creando Usuario...' : 'Crear Usuario'}
              </button>
            </form>
          </div>

          {/* Botón de navegación */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem'
          }}>
            <button 
              onClick={onBack}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.color = '#93c5fd';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.color = 'white';
              }}
            >
              <span>←</span>
              <span>Volver al Panel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Alert personalizado */}
      <CustomAlert
        isOpen={showAlert}
        onClose={handleAlertClose}
        title={alertData.title}
        message={alertData.message}
        type={alertData.type}
      />
    </div>
  );
};

export default CrearUsuario;
