FROM node:22

WORKDIR /app

# Copia configs do projeto
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

EXPOSE 8085

CMD ["npm", "run", "dev", "--", "--host"]
