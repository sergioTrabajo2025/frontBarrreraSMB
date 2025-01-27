import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../data/Iconos/user_bn.png';
import TAO from '../data/tao_bn.png';

const Navbar = ({ loggedIn, onLogout }) => { // Añade onLogout como prop
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsDropdownOpen(false); // Cierra el menú desplegable al hacer logout
        onLogout(); // Llama a la función de logout pasada como prop
        navigate('/login');
    };

    return (
        <nav className="bg-main-bg text-white py-3 px-6">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center gap-4 relative">
                    <img 
                        src={User} 
                        className="hover-bg-green cursor-pointer"
                        width={40} 
                        alt="User Icon" 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                    />
                    {user && user.email && (
                        <span className="text-sm font-roboto">{user.email}</span>
                    )}

                    {/* Menú desplegable solo si el usuario está autenticado */}
                    {loggedIn && isDropdownOpen && (
                        <div className="absolute right-0 bg-white text-black shadow-lg rounded mt-2">
                            <button 
                                onClick={handleLogout} 
                                className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-4">
                    Gerencia de Ingeniería
                    <img src={TAO} className="hover-bg-green" width={150} alt="TAO Logo" />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
