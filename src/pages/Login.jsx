import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import mainLogo from "../data/logomonitor.png";
import TAO from "../data/tao_bn.png";

const LoginForm = ({ onLogin }) => { // Asegúrate de que onLogin se pasa como prop
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Crea la instancia de useNavigate

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = {
            email: email,
            contraseña: password
        };
    
        try {
            const response = await fetch('http://18.231.246.38:9000/api/Usuario/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
                throw new Error('Error al enviar los datos');
            }
            const data = await response.json();
            console.log('Respuesta del servidor:', data);
    
            // Verifica si el email y la contraseña coinciden
            if (data.email === email && data.contraseña === password) {
                // Guarda el usuario en sessionStorage
                localStorage.setItem('user', JSON.stringify(data));
                onLogin(); // Llama a la función de inicio de sesión
                console.log('Login exitoso!');
                
                // Redirige a la página principal
            } else {
                setError('Credenciales incorrectas');
            }
    
        } catch (error) {
            console.error('Error al enviar el formulario:', error.message);
            setError('Error al enviar el formulario');
        }
    };
    
    return (
        <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto mt-40 p-8 md:p-10 2xl:p-12 3xl:p-14 bg-light-gray rounded-2xl shadow-xl">
            <div className="flex flex-row gap-3 pb-4">
                <div>
                    <img src={mainLogo} className="hover-bg-green" width={180} alt="Main Logo"></img>
                </div>
                <div>
                    <img src={TAO} className="hover-bg-green" height={20} width={400} alt="Trenes Argentinos Operaciones"></img>
                </div>
            </div>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="pb-2">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Usuario</label>
                    <div className="relative text-gray-400">
                        <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-mail"
                            >
                                <rect width="20" height="16" x="2" y="4" rx="2" />
                                <path d="M22 7L12 13L2 7" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            name="Usuario"
                            id="email"
                            className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
                            placeholder="Usuario"
                            autoComplete="off"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>
                </div>
                <div className="pb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Contraseña</label>
                    <div className="relative text-gray-400">
                        <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-square-asterisk"
                            >
                                <rect width="18" height="18" x="3" y="3" rx="2" />
                                <path d="M12 8v8" />
                                <path d="M8.5 14l7-4" />
                                <path d="M8.5 10l7 4" />
                            </svg>
                        </span>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
                            placeholder="••••••••••"
                            autoComplete="current-password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <button
                    type="submit"
                    className="w-full text-white bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
                >
                    Login
                </button>
                
            </form>
        </div>
    );
};

export default LoginForm;
