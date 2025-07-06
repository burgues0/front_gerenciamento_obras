# Usa a imagem base Node.js 18 Alpine
FROM node:18-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de configuração do projeto (package.json e package-lock.json)
# Assumimos que você usa npm, então copiamos package-lock.json
COPY package.json package-lock.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todo o código-fonte da aplicação
COPY . .

# Expõe a porta padrão do Next.js (3000)
# Esta é a porta onde o servidor de desenvolvimento do Next.js vai escutar
EXPOSE 3001

# Comando para iniciar o servidor Next.js em modo de desenvolvimento
# O Next.js por padrão escuta em 0.0.0.0 em contêineres quando rodado com 'npm run dev'
CMD ["npm", "run", "dev"]