# Catalogo de Jogos SPODWEB2

Aplicacao React para exibir e gerenciar um catalogo de jogos. O app possui paginas por categoria, pagina de detalhes, tabela de gerenciamento, cadastro, alteracao e exclusao de jogos.

O projeto esta preparado para consumir uma API REST que futuramente pode ser conectada ao banco SQL `projeto_catalogo_jogos`. Enquanto essa API nao estiver disponivel, os dados continuam funcionando pelo fallback local com JSON e `localStorage`.

## Tecnologias

- React
- React Router DOM
- Axios
- Create React App
- JSON local em `public/api/jogos.json`
- `localStorage` para simular persistencia temporaria

## Como Rodar

Instale as dependencias:

```bash
npm install
```

Inicie o projeto:

```bash
npm start
```

Por padrao, o app abre em:

```txt
http://localhost:3000
```

## Scripts

```bash
npm start
```

Roda o app em modo de desenvolvimento.

```bash
npm run build
```

Gera a versao de producao na pasta `build`.

```bash
npm test
```

Executa os testes configurados no projeto.

## Estrutura Principal

```txt
src/App.js
```

Define as rotas principais da aplicacao.

```txt
src/pages
```

Contem as paginas do app: home, categorias, catalogo, detalhes, alteracao e pagina 404.

```txt
src/components
```

Contem componentes reutilizaveis como cards, tabela, formulario, topo, menu e rodape.

```txt
src/services
```

Centraliza a comunicacao com dados externos. Essa pasta prepara o app para consumir a futura API conectada ao SQL.

```txt
public/api/jogos.json
```

Fonte inicial de dados usada como fallback.

## Fluxo de Dados Atual

O acesso aos jogos esta centralizado em:

```txt
src/services/jogosService.js
```

Esse service tenta usar a API configurada por `REACT_APP_API_URL`. Se a API nao estiver configurada ou falhar, o app usa:

```txt
public/api/jogos.json
localStorage
```

Esse fallback permite cadastrar, alterar e excluir jogos temporariamente no navegador, sem depender ainda de um backend real.

## Configuracao da API

Crie um arquivo `.env` na raiz da pasta `spodweb2` seguindo o exemplo de `.env.example`:

```env
REACT_APP_API_URL=http://localhost:3001/api
```

Com essa variavel definida, o frontend passa a tentar consumir a API antes de cair no fallback local.

## Banco SQL

O frontend nao deve conectar diretamente ao banco SQL. A conexao com `projeto_catalogo_jogos` deve ser feita por um backend, por exemplo em Node.js, PHP, Java, Python ou outra tecnologia.

O frontend espera que esse backend exponha endpoints REST para a entidade de jogos.

## Contrato Esperado da API

```txt
GET    /jogos
GET    /jogos/:id
GET    /jogos/slug/:slug
POST   /jogos
PUT    /jogos/:id
DELETE /jogos/:id
```

## Campos de Jogo

Os nomes dos campos esperados pelo frontend sao:

```txt
id
slug
nome
genero
preco
descricao
capa
```

Exemplo de objeto:

```json
{
  "id": 1,
  "slug": "elden-ring",
  "nome": "Elden Ring",
  "genero": "RPG",
  "preco": 249.9,
  "descricao": "Um RPG de acao em mundo aberto desenvolvido pela FromSoftware.",
  "capa": "./imgs/eldenring.webp"
}
```

## Rotas do App

```txt
/              Home com jogos em destaque
/acao          Jogos de acao
/rpg           Jogos de RPG
/terror        Jogos de terror
/corrida       Jogos de corrida
/catalogo      Gerenciamento do catalogo
/jogo/:slug    Detalhes de um jogo
/alterar/:id   Alteracao de um jogo
```

## Observacoes

- O fallback com `localStorage` e temporario.
- Quando o backend SQL estiver pronto, a maior parte da integracao deve acontecer em `src/services/jogosService.js`.
- Os campos da API devem manter os mesmos nomes usados hoje pelo JSON.
- Imagens cadastradas localmente usam caminhos compativeis com as capas existentes em `src/assets/imgs`.
