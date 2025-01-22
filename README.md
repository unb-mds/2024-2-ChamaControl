# [ChamaControl](https://github.com/unb-mds/2024-2-ChamaControl)

O [ChamaControl](https://github.com/unb-mds/2024-2-ChamaControl) é uma iniciativa da disciplina **Métodos de Desenvolvimento de Software** com o propósito de criar uma plataforma intuitiva, onde cidadãos possam ter acesso e monitorar informações sobre queimadas que possam estar acontecendo pelo território brasileiro. A ideia central é facilitar o acesso e a transparência, permitindo que usuários possam:

- **Visualizar Informações sobre Focos de incêndios:** Consultar facilmente focos registrados por satélite com base em região, estado, município, ano e mês. Os focos registrados se iniciam em 2003 e vão até 2024.
- **Receber alertas personalizados:** Usuários podem filtrar determinada área do território, como estado ou região, para receber alertas.

## 📑 Índice

- [ChamaControl](#chamacontrol)
  - [📑 Índice](#-índice)
  - [👤 Equipe](#-equipe)
  - [🚀 Primeiros Passos](#-primeiros-passos)
    - [🛠 Pré-requisitos](#-pré-requisitos)
    - [📦 Instalação das Dependências](#-instalação-das-dependências)
    - [▶️ Execução do Projeto](#️-execução-do-projeto)
  - [📖 Documentação](#-documentação)
  - [🔗 Links Úteis](#-links-úteis)
    - [Diagrama de Arquitetura](#diagrama-de-arquitetura)
    - [Protótipo Visual](#protótipo-visual)

## 👤 Equipe

| <img src="https://github.com/Arturhk05.png" width="150">  <br> [**Artur Handow Krauspenhar**](https://github.com/Arturhk05) | <img src="https://github.com/Diaxiz.png" width="150">  <br> [**Diassis Bezerra Nascimento**](https://github.com/Diaxiz) | <img src="https://github.com/Edumorais08.png" width="150">  <br> [**Eduardo de Almeida Morais**](https://github.com/Edumorais08) |
| :---------: | :---------: | :---------: |
| <img src="https://github.com/fbressa.png" width="150">  <br> [**Filipe Bressanelli Azevedo Filho**](https://github.com/fbressa) | <img src="https://github.com/Guga301104.png" width="150">  <br> [**Gustavo Gontijo Lima**](https://github.com/Guga301104) | <img src="https://github.com/leohssjr.png" width="150">  <br> [**Leonardo Henrique Sobral Sauma Junior**](https://github.com/leohssjr) |

## 🚀 Primeiros Passos

Para clonar este repositório, execute:

```bash
git clone https://github.com/unb-mds/2024-2-ChamaControl.git
```

### 🛠 Pré-requisitos

Antes de rodar o projeto, instale as seguintes ferramentas:

- **Node** 22.12 ou superior
- **MySql** 8.0 ou superior

### 📦 Instalação das Dependências

Execute os seguintes comandos para instalar as dependências:

```bash
# Execute o seguinte comando dentro das pasta /web e /backend
npm install
```

### ▶️ Execução do Projeto

#### Front-end

Dentro de `/web`
```shell
# Na pasta /web execute os comandos
npm run dev
```

O front-end ficara disponivel em: http://localhost:5173/

#### Back-end

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

Depois:
```shell
# Para popular o banco de dados execute (isso deve ser feito apenas uma vez)
npm run populaFocosAnual

# Para iniciar a API execute
npm run app
```

O back-end ficara disponivel em: http://localhost:3000

E para testar abra http://localhost:3000/api/hello

## 📖 Documentação

Acesse a documentação completa do projeto [aqui](https://unb-mds.github.io/2024-2-ChamaControl/).

## 🔗 Links Úteis

### Story Map

- Para acessar o Story Map, clique [aqui](https://miro.com/app/board/uXjVL-P6Y-c=/?share_link_id=434250135699).

### Arquitetura

- Visualize o diagrama de arquitetura do projeto, clique [aqui](https://www.figma.com/design/4eVXq7dgs2j8SpdVHSLbB1/Arquitetura---ChamaControl?node-id=0-1&t=rv9rNCBxhKdR6XxI-1).

### Protótipo Visual

- Para visualizar o protótipo do projeto, clique [aqui](https://www.figma.com/design/mPqnz5g1fNN7PVtIgwt0ln/Queimadas-UnB?node-id=0-1&node-type=canvas&t=oHqySMJ71eFv4Tow-0).

---

Este projeto é distribuído como software livre, sob a licença [MIT](https://github.com/unb-mds/2024-2-ChamaControl/blob/main/LICENSE).
