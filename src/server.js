// Criar servidor
const express = require("express");
const server = express();

// Pegar o banco de dados
const db = require("./database/db.js");

//configurar a pasta publica para buscar as estilizações CSS, JavaScript, etc...
server.use(express.static("public"));

// Habilitar o uso do req.body na nossa aplicação, ai conseguimos ver os dados salvos do formulário.
server.use(express.urlencoded({ extended: true }));

// utilizando template engine com o nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

// Configurar caminhos(ROTAS) da minha aplicação
// Página inicial
// req: requisição
// res: Resposta
server.get("/", (req, res) => {
  return res.render("index.html", {
    title: "NOVO TÍTULO",
  });
});

server.get("/create-point", (req, res) => {
  console.log(req.query);

  return res.render("create-point.html");
});

server.post("/savepoint", (req, res) => {
  // req.body : o corpo do nosso formulário
  // console.log(req.body)

  // Inserir dados no banco de dados
  db.run(` 
        CREATE TABLE IF NOT EXISTS places (
            id  INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `);

  //  Inserir dados na tabela
  const query = `
            INSERT INTO places (
                image,
                name,
                address,
                address2,
                state,
                city,
                items
            ) VALUES (?,?,?,?,?,?,?);
    `;
  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items,
  ];

  function afterInsertData(err) {
    if (err) {
      console.log(err);
      return res.send("Erro no cadastro!");
    }
    console.log("Cadastro com Sucesso");
    console.log(this);

    return res.render("create-point.html", { saved: true });
  }
  db.run(query, values, afterInsertData);
});

server.get("/search-results", (req, res) => {
  const search = req.query.search;

  if (search == "") {
    // Pesquisa vazia
    return res.render("search-results.html", { total: 0 });
  }
  // Pegar os dados di banco de dados, deixando a página search dinâmica
  db.all(
    `SELECT * FROM   places WHERE city LIKE  "%${search}%"`,
    function (err, rows) {
      if (err) {
        return console.log(err);
      }
      console.log(rows);
      const total = rows.length;

      return res.render("search-results.html", { places: rows, total: total });
    }
  );
});

// Ligar o servidor
server.listen(3000);
