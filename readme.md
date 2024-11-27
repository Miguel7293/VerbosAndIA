pasos para la instalacion para

Frontend: Next.js + Tailwind CSS
Backend: Node.js con Express para la API REST.
Procesamiento NLP: Microservicio en Python usando spaCy o NLTK.
Base de Datos: PostgreSQL .

-----------------------frontend---------------------------
npx create-next-app@latest frontend
cd frontend
npm install tailwindcss postcss autoprefixer
npx tailwindcss init
npm run dev

-----------------------Backend---------------------------

mkdir backend
cd backend
npm init -y
npm install express body-parser cors pg dotenv
node index.js

npm install axios

-----------------------NPL---------------------------

mkdir nlp-service
cd nlp-service
python3 -m venv venv
venv/bin/activate 
pip install flask spacy
python -m spacy download es_core_news_sm
