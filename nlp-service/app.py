from flask import Flask, jsonify, request
import json

# Cargar los datos del archivo JSON
with open('esp_verbos.json', 'r', encoding='utf-8') as file:
    verbos = json.load(file)

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify({"message": "Bienvenido a la API de conjugaciones de verbos"})

# Ruta para obtener las conjugaciones de un verbo específico
@app.route('/verbo/<string:verbo>', methods=['GET'])
def obtener_conjugaciones(verbo):
    # Buscar el verbo en el archivo JSON
    for v in verbos:
        if v['verbo'] == verbo:
            return jsonify(v)
    
    # Si no se encuentra el verbo
    return jsonify({"error": "Verbo no encontrado"}), 404

if __name__ == '__main__':
    app.run(debug=True)
