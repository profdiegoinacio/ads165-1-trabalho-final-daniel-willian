This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Projeto de reclamações sobre falta de água

Primeiro, carregar o gradle e rodar no backend/main/java/BackendApplication a class BackendApplication para subir o Backend.
#É necessário estar com java 17 ou superior instalado.

Segundo, rode o npm run dev para iniciar o frontend :
#É necessário rodar no terminal o npm install react-icons e npm install axios;

```bash
npm run dev #Também encontrado no package.json
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para ver a página carregada.

A estrutura de pastas do backend consiste em diretórios separados para manter uma certa organuização e ficar fácil de se achar:
Controller
Model
Repository
Security
Service

O projeto usa conexão com banco de dados H2 por se tratar de algo simples e fácil de configurar para um projeto de apresentação, as conexões com o banco são mantidas em resources/ApplicationProperties.

Endereços da API e exemplos de uso:

POST Criar Usuarios: http://localhost:8080/usuarios

{
"nome": "Willian",
"endereco": "Av brasil, 123",
"email": "willian@upf.com",
"telefone": "54981427121",
"senha": "1234567"
}

GET Listar Usuarios: http://localhost:8080/usuarios

PUT Atualizar Usuarios: http://localhost:8080/usuarios/1

{
"nome": "Daniel",
"endereco": "Av brasil, 123",
"email": "daniel@upf.com",
"telefone": "54981427120",
"senha": "123456"
}

DELETE Deletar usuario: http://localhost:8080/usuarios/1

#RECLAMAÇÕES

POST Inserir Reclamação: http://localhost:8080/reclamacoes

{
"endereco": "Av brasil, 111",
"detalhes": "Falta de agua ha 3 horas",
"usuario": {
"id": 1
 }
}

GET Listar Reclamações: http://localhost:8080/reclamacoes

PUT Atualizar Reclamação: http://localhost:8080/reclamacoes/1

RESOLVIDO

#ADMIN

POST Criar Admins: http://localhost:8080/admins

{
"nome": "Daniel ALBUQUERQUE",
"endereco": "Av brasil, 123",
"email": "ALBUQUERQUE@upf.com",
"telefone": "54981427122",
"senha": "admin"
}

GET Listar Admins: http://localhost:8080/admins

PUT Atualizar Admins: http://localhost:8080/admins/1

{
"id": 1,
"nome": "ALBUQUERQUE",
"email": "ALBUQUERQUE@upf.com",
"senha": "admin"
}

DELETE Deletar Admins: http://localhost:8080/admins/1




