# [ChamaControl](https://2024-2-chama-control.vercel.app/)

O [ChamaControl](https://2024-2-chama-control.vercel.app/) é um software produzido na disciplina **Métodos de Desenvolvimento de Software** com o propósito de criar uma plataforma intuitiva, onde cidadãos possam ter acesso e monitorar informações sobre focos de incêndio registrados no Brasil. A ideia central é facilitar o acesso e a transparência aos dados sobre incêndios do [INPE](https://terrabrasilis.dpi.inpe.br/queimadas/portal/), permitindo que usuários, por meio de um site intuitivo, possam:

- **Visualizar Informações Sobre Focos de Incêndios Anuais:** Consultar facilmente focos registrados por satélite com base em região, estado, município, ano e mês. Os focos registrados se iniciam em 2003 e vão até 2024.

- **Visualizar Focos Diários dos Últimos 30 Dias:** Permite aos usuários acompanhar os focos de incêndio registrados diariamente, pelo satélite ``AQUA_M-T``, nos últimos 30 dias, fornecendo uma visão atualizada e detalhada sobre a situação recente dos incêndios em diferentes regiões do Brasil.

## 🔗 Link do Deploy

Você pode acessar o ChamaControl [aqui](https://2024-2-chama-control.vercel.app/)

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

## ▶️ Execução do Projeto

### 🛠 Pré-requisitos

- [Docker](https://www.docker.com/get-started) instalado na sua máquina.
- [Docker Compose](https://docs.docker.com/compose/install/) instalado.

### Passos para Executar

1. **Clone o repositório:**

```
git clone https://github.com/unb-mds/2024-2-ChamaControl.git
cd 2024-2-ChamaControl
````
2. **Execute o Docker Compose:**

````sh
docker-compose up -d
````

Isso irá iniciar os contêineres do backend, frontend e banco de dados.

3. **Acesse a aplicação:**

- O backend estará disponível em: http://localhost:3000
- O frontend estará disponível em: http://localhost:5173

4. **Crie as tabelas no banco de dados:**

````
docker-compose exec backend npm run criarTabelas
````

5. **Popule o banco de dados:**

````
docker-compose exec backend npm run populaFocosAnual

docker-compose exec backend npm run populaFocos30Dias
````

Pronto! Agora você deve ser capaz de acessar e utilizar o projeto ChamaControl em seu ambiente Dockerizado.

6. **Para encerrar o projeto execute**

````
docker-compose down
````

### Configure a página de notícias

1. **Acesse o site [GNews](https://gnews.io/), crie uma conta e copie a sua API key**

2. **Crie o arquivo `.env` dentro de `/web`**

````
VITE_NEWS_API_KEY=sua_API_Key_aqui
````

Assim você terá acesso à página de notícias.

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
