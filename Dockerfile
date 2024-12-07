# Usa la versión LTS de Node.js
FROM node:lts

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y el package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la API
COPY . .

# Expone el puerto 3000 en el contenedor
EXPOSE 3000

# Comando para correr la aplicación
CMD ["node", "server.js"]
