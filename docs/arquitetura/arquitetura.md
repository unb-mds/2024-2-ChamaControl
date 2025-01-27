# Documentação do Projeto ChamaControl

## Visão Geral

O **ChamaControl** é um sistema desenvolvido para visualização de queimadas pelo terrotório brasileiro, fornecendo uma interface interativa para visualização e gestão de dados relacionados a focos de incêndio. O projeto é estruturado em uma arquitetura baseada em **backend e frontend**, garantindo escalabilidade e modularidade.


## Componentes Principais
O sistema é dividido em três camadas principais:

- Front-end
- Back-end
- Banco de Dados


## 1. Front-end
### Cliente (Web)
O front-end do ChamaControl é responsável pela interface do usuário (UI), permitindo interações intuitivas e responsivas. O desenvolvimento utiliza **Vite**, que oferece um ambiente rápido para desenvolvimento moderno de JavaScript.

#### Tecnologias
- **Framework**: React
- **Gerenciador de Pacotes**: npm
- **Estilização**: CSS
- **Build Tool**: Vite

#### Como rodar o front-end
```sh
cd web
npm install
npm run dev
```
Isso iniciará o servidor de desenvolvimento. 
### O front-end ficará disponível em: ```http://localhost:5173/```

---

## 2. Back-end
O back-end é desenvolvido em **Node.js** utilizando **Express**, responsável por gerenciar a lógica de negócio e as requisições do sistema.

### Estrutura do Back-end
- **API**: Expõe endpoints para o front-end consumir.
- **Users**: Gerencia autenticação e dados dos usuários.
- **Routes**: Define as rotas do sistema.
- **Scraper**: Contém scripts para [extração/manipulação de dados].

#### Como rodar o back-end

Primeiro, rode o arquivo `script-db.sql` em seu **MySql** para criar as tabelas.

Dentro de `/backend`

```shell
# Crie um arquivo .env com as seguintes variáveis
SECRET_KEY=seu_segredo
TOKEN_EXPIRATION=10m
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_do_banco_de_dados
DB_NAME=mdschama
```
Dentro de `/web`

```shell
# Crie um arquivo .env com a seguinte variável
VITE_BACKEND_URL=http://localhost:3000
```
Depois:
```shell
# Para popular o banco de dados execute (isso deve ser feito apenas uma vez)
npm run populaFocosAnual

# Para iniciar a API execute
npm run app
```

### O back-end ficará disponível em: ```http://localhost:3000```

E para testar abra ```http://localhost:3000/api/hello```

Isso iniciará o servidor na porta definida no arquivo de configuração.


## 3. Banco de Dados
O sistema utiliza **MySQL** para armazenar informações dos usuários e demais entidades.

### Configuração do Banco de Dados
- O esquema do banco pode ser encontrado em `backend/script-db.sql`.
- Para rodar o banco localmente:
  ```sh
  docker-compose up -d
  ```


## Tecnologias Utilizadas:

### 1. **Node.js** *(Backend)*
- O backend do projeto é desenvolvido utilizando **Node.js**, que permite a criação de uma API REST responsável pelo processamento dos dados e fornecimento das informações para o frontend.
- Utiliza o **Express.js** (framework minimalista para Node.js) para gerenciar as rotas e requisições HTTP.
- O backend está sendo hospedado no **[Heroku](https://www.heroku.com/)**.

**Conexão com outras tecnologias:**
- O **Node.js** se comunica com o banco de dados para armazenar e recuperar informações.
- Serve como interface para que o frontend possa consumir os dados.


### 2. **React.js** *(Frontend)*

- O frontend da aplicação foi desenvolvido utilizando **React.js**, permitindo uma interface responsiva e dinâmica para os usuários.
- Utiliza bibliotecas como **React Router** para navegação e **Axios** para chamadas de API.
- O frontend está sendo hospedado no **[Vercel App](https://2024-2-chama-control.vercel.app/)**.

**Conexão com outras tecnologias:**

- O frontend consome a API do backend hospedado no **Heroku** para exibir os dados de queimadas e usuários.
- Utiliza autenticação para segurança e controle de acessos.



### 3. **MkDocs** *(Documentação)*

- O **MkDocs** é utilizado para gerar e hospedar a documentação do projeto.
- A estrutura de documentação é definida no arquivo `mkdocs.yml`, permitindo a geração de uma documentação navegável e responsiva.

**Conexão com outras tecnologias:**

- Armazena a documentação do backend e instruções para os desenvolvedores sobre o uso da API.


## Estrutura do Banco de Dados

O sistema utiliza um **banco de dados relacional** para armazenar informações sobre os focos de incêndio cadastrados no [INPE](https://www.gov.br/inpe/pt-br).

### Principal Tabela:
   
1. **Focos_Incendio**
   - `id` (int, PK)
   - `latitude` (float)
   - `longitude` (float)
   - `data_registro` (timestamp)
   - `nivel_severidade` (int)
   - `descricao` (text)

### Conexão com outras tecnologias:
- O **backend (Node.js)** faz requisições SQL ao banco de dados para armazenar e recuperar informações.
- O **frontend** consome essas informações para exibir os dados de maneira visual.


## Fluxo de Conexão entre Tecnologias

1. **Frontend** envia uma requisição HTTP para o backend.
2. **Node.js** processa a requisição e, se necessário, consulta o banco de dados.
3. **Banco de Dados** retorna os dados solicitados ao backend.
4. **Backend** formata e envia a resposta ao frontend.
5. **Frontend** exibe os dados para o usuário final.
6. **MkDocs** armazena documentação para consulta dos desenvolvedores.

Esse fluxo garante um sistema modular e escalável, permitindo futuras expansões e otimizações.



