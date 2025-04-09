# Estágio de build
FROM node:18-alpine AS build

# Definir diretório de trabalho
WORKDIR /app

# Copiar os arquivos de package.json e instalar dependências
COPY package*.json ./
RUN npm ci

# Copiar o restante dos arquivos do projeto
COPY . .

# Construir a aplicação
RUN npm run build

# Estágio de produção
FROM nginx:1.23-alpine AS production

# Copiar configuração personalizada do nginx
COPY --from=build /app/build /usr/share/nginx/html

# Configuração para SPA React (tratamento de rotas)
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# Expor porta 80
EXPOSE 80

# Comando para iniciar o nginx
CMD ["nginx", "-g", "daemon off;"]
