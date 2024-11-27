// frontend/pages/index.js
import { useState } from 'react';
import axios from 'axios';
import '../src/styles/global.css';  // Asegúrate de que la ruta sea correcta

export default function Home() {
    const [oracion, setOracion] = useState('');
    const [resultados, setResultados] = useState(null);
    const [verDetalles, setVerDetalles] = useState(false);  // Controlar si mostrar detalles

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/analizar-oracion', { oracion });
            setResultados(response.data);
            setVerDetalles(false); // Reseteamos el estado de ver detalles a falso al enviar nueva oración
        } catch (error) {
            setResultados({ error: 'Hubo un error al procesar la oración' });
        }
    };

    // Función para procesar los resultados y mostrar solo verbos válidos
    const procesarResultados = (resultado) => {
        if (resultado.verbo && resultado.error !== "Error en la solicitud" && resultado.verbo !== 'Miguel' && resultado.verbo !== 'ahora') {
            return `Se encontró un verbo en tu oración: ${resultado.verbo}`;
        }
        return '';  // Retornar vacío si no hay verbo válido
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 py-12 px-6">
            <h1 className="text-5xl font-extrabold text-white mb-8 text-center">Reconocedor de Verbos</h1>
            <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-xl shadow-lg max-w-lg w-full mx-auto">
                <div className="mb-6">
                    <label htmlFor="oracion" className="block text-xl font-medium text-gray-300">Introduce una oración:</label>
                    <textarea
                        id="oracion"
                        value={oracion}
                        onChange={(e) => setOracion(e.target.value)}
                        className="w-full mt-2 p-4 border border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none text-white bg-gray-800"
                        rows="4"
                        placeholder="Escribe tu oración aquí..."
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-200"
                >
                    Analizar
                </button>
            </form>

            {resultados && (
                <div className="mt-12 bg-gray-900 p-8 rounded-xl shadow-lg max-w-lg w-full mx-auto">
                    <h2 className="text-3xl font-semibold text-gray-200 text-center">Resultados</h2>
                    <div className="mt-4 space-y-4">
                        {resultados && resultados.map((resultado, index) => {
                            const texto = procesarResultados(resultado);
                            return texto ? <p key={index} className="text-lg text-gray-300">{texto}</p> : null;
                        })}
                    </div>

                    <button 
                        onClick={() => setVerDetalles(!verDetalles)}
                        className="mt-6 w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-200"
                    >
                        {verDetalles ? 'Ocultar detalles' : 'Mostrar detalles'}
                    </button>

                    {verDetalles && (
                        <pre className="mt-6 text-sm bg-gray-700 p-4 rounded-lg text-gray-100">{JSON.stringify(resultados, null, 2)}</pre>
                    )}
                </div>
            )}
        </div>
    );
}
