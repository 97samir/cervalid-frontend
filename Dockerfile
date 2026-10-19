
# Etapa 1: construir el frontend
FROM node:22-alpine AS build

WORKDIR /app

# Copiar los archivos de dependencias
COPY frontend/package*.json ./

# Instalar dependencias reproducibles
RUN npm ci

# Copiar el código del frontend
COPY frontend/ ./

# URL del backend accesible desde el navegador
ARG VITE_API_URL=http://localhost:8081
ENV VITE_API_URL=${VITE_API_URL}

# Generar la versión de producción
RUN npm run build

# Etapa 2: servir el frontend
FROM nginx:alpine

# Eliminar la página predeterminada de Nginx
RUN rm -f /etc/nginx/conf.d/default.conf \
    && rm -rf /usr/share/nginx/html/*

# Copiar la configuración de Nginx
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos generados por Vite
COPY --from=build /app/dist/ /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
