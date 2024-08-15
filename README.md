
  
  ## 🎯 Overview
  
   Este proyecto es un curso de fernando herrera [React: De cero a experto ( Hooks y MERN )](https://www.udemy.com/course/react-cero-experto/)

   - Se instalaron las librerias para pruebas unitarias del [gist](https://gist.github.com/Klerith/b2eafa2a5fb9f09d6d043781be976e06)
  
  - Para más información de librerias y recurso descargables del curso de react, visitar la [Sección 30: Fin del curso](https://www.udemy.com/course/react-cero-experto/learn/lecture/21751844)
  
  ## 🚀 Getting Started
  
  Para tener una copia local en funcionamiento, siga estos pasos:
  
  ### Requisitos
  
  Asegúrese de tener lo siguiente instalado:
  
  - Node.js version >=  v20.11.0
  - yarn (package manager)
  - Git
  
  ### Instalación
  1. Renombrar el archivo `.env.template` por `.env`
  2. Hacer los cambios respectivos a las variables de entrono de el `.env`

  1. Clonar repositorio:
  
     ```bash
     git clone https://github.com/neo-zero98-2/Secci-n-22-MERN-Calendar.git
     cd Secci-n-22-MERN-Calendar
     ```
  
  2. Instalar dependencias:
  
     ```bash
     yarn
     ```
  
  3. Iniciar el servidor de desarrollo:
     ```bash
     yarn dev
     ```
  ### Integracion con el backend

  1. Compilar la aplicacion
  
      ```bash
         yarn build
      ```
   - se creara un nuevo directorio `dist`
      ```bash
         ├── dist
         │   ├── assets
         │   │   ├── index-0ZVVFFgB.css
         │   │   └── index-BSRZ2PXA.js
         │   ├── index.html
         │   └── vite.svg
      ```

   2. Clonar el repositorio [Seccion-23-CalendarApp-Backend](https://github.com/neo-zero98-2/Seccion-23-CalendarApp-Backend)
      ```bash
      git clone https://github.com/neo-zero98-2/Seccion-23-CalendarApp-Backend.git
      ```

   3. Copiar el contenido del directorio `dist` y pegarlo en el directorio public del backend [Seccion-23-CalendarApp-Backend](https://github.com/neo-zero98-2/Seccion-23-CalendarApp-Backend) 

      - Estructura del directorio public ``antes`` de pegar el `dist`
         ```bash
            .
            ├── README.md
            ├── controllers
            │   ├── auth.js
            │   └── events.js
            ├── database
            │   └── config.js
            ├── helpers
            │   ├── isDate.js
            │   └── jwt.js
            ├── index.js
            ├── middlewares
            │   ├── validador-campos.js
            │   └── validar-jwt.js
            ├── models
            │   ├── Evento.model.js
            │   └── Usuario.model.js
            ├── package-lock.json
            ├── package.json
            ├── public
            └── routes
                ├── auth.js
                └── events.js
         ```
      - Estructura del directorio public ``después`` de pegar el `dist`
         ```bash
            .
            ├── README.md
            ├── controllers
            │   ├── auth.js
            │   └── events.js
            ├── database
            │   └── config.js
            ├── helpers
            │   ├── isDate.js
            │   └── jwt.js
            ├── index.js
            ├── middlewares
            │   ├── validador-campos.js
            │   └── validar-jwt.js
            ├── models
            │   ├── Evento.model.js
            │   └── Usuario.model.js
            ├── package-lock.json
            ├── package.json
            ├── public
            │   ├── assets
            │   │   ├── index-0ZVVFFgB.css
            │   │   └── index-BSRZ2PXA.js
            │   ├── index.html
            │   └── vite.svg
            └── routes
                ├── auth.js
                └── events.js
         ```

   4. Instalar dependencias de [Seccion-23-CalendarApp-Backend](https://github.com/neo-zero98-2/Seccion-23-CalendarApp-Backend):
  
      ```bash
      npm install
      ```
   5. Iniciar el servidor de desarrollo

      ```bash
      npm start
      ```
   6. Navegar al `http://localhost:4000` y se visualizará la aplicación