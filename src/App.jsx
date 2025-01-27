import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Navbar, Footer, Sidebar } from './components';
import { TiempoReal, AlarmaDeEventos, Ubicacion, GrillaPrincipal, AnalisisFalla } from './pages';
import IdBarrera from './pages/AlarmaDeEvento/IdBarrera';
import IdAnalisis from './pages/AnalisisFalla/IdAnalisis';
import IdTiempoReal from './pages/TiempoReal/IdTiempoReal';
import IdUbicacion from './pages/Ubicacion/IdUbicacion';
import Login from './pages/Login';

import './App.css';
import { useStateContext } from './contexts/ContextProvider';

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode } = useStateContext();
  const [loggedIn, setLoggedIn] = useState(false); // Estado para controlar si el usuario está autenticado

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, [setCurrentColor, setCurrentMode]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user'); // Elimina el usuario de localStorage
    setLoggedIn(false); // Actualiza el estado de loggedIn a false
  };

  const handleLogin = () => {
    setLoggedIn(true); // Establece el estado de loggedIn a true
  };

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative bg-main-dark-bg">
          {loggedIn && (
            <div className="w-72 fixed sidebar bg-main-bg z-10">
              <Sidebar />
            </div>
          )}
          <div
            className={
              loggedIn
                ? "bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full"
                : "bg-main-bg bg-main-dark-bg w-full min-h-screen flex-2"
            }
          >
            {loggedIn && (
              <div className="fixed md:static bg-main-dark-bg navbar w-full">
                <Navbar loggedIn={loggedIn} onLogout={handleLogout} />
              </div>
            )}
            <div>
              {loggedIn ? (
                // Mostrar el contenido de la aplicación si el usuario está logueado
                <Routes>
                  <Route path="/" element={<GrillaPrincipal />} />
                  <Route path="/Estado Barreras" element={<GrillaPrincipal />} />
                  <Route path="/Tiempo Real" element={<TiempoReal />} />
                  <Route path="/Alarma y Eventos" element={<AlarmaDeEventos />} />
                  <Route path="/Análisis De Falla" element={<AnalisisFalla />} />
                  <Route path="/AlarmaDeEvento/:idBarrera" element={<IdBarrera />} />
                  <Route path="/Ubicacion/:idBarrera" element={<IdUbicacion />} />
                  <Route path="/TiempoReal/:idBarrera" element={<IdTiempoReal />} />
                  <Route path="/Análisis De Falla/:idBarrera" element={<IdAnalisis />} />
                  <Route path="/Ubicación" element={<Ubicacion />} />
                </Routes>
              ) : (
                // Si el usuario no está logueado, mostrar el formulario de login
                <Login onLogin={handleLogin} />
              )}
            </div>
            {loggedIn && <Footer />}
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
