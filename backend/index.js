// backend/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios'); // Para hacer peticiones al servicio de verbos

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Ruta para procesar la oración y devolver conjugaciones
app.post('/analizar-oracion', async (req, res) => {
    const { oracion } = req.body; // Oración enviada desde el frontend

    if (!oracion) {
        return res.status(400).json({ error: 'No se proporcionó una oración' });
    }

    const palabras = oracion.split(' '); // Dividir la oración en palabras
    let resultados = [];

    try {
        // Usar Promise.all para hacer todas las solicitudes en paralelo
        const promises = palabras.map(async (palabra) => {
            try {
                // Hacer la solicitud a la API de Python
                const response = await axios.get(`http://localhost:5000/verbo/${palabra}`);
                
                // Si la palabra tiene un verbo reconocido
                if (response.data && response.data.verbo) {
                    return response.data;
                } else {
                    // Si no se encuentra el verbo, devolver un error
                    return { verbo: palabra, error: 'Verbo no encontrado' };
                }
            } catch (error) {
                // Si hay un error en la solicitud, devolver un error
                return { verbo: palabra, error: 'Error en la solicitud' };
            }
        });

        // Esperar a que todas las promesas se resuelvan
        resultados = await Promise.all(promises);

        // Enviar los resultados
        res.json(resultados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hubo un error al procesar la oración' });
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Backend corriendo en el puerto ${PORT}`);
});
