// Importar o sqlite3
const sqlite3 = require('sqlite3').verbose() // com o verbose pedimos que mostre mais informaççoes no terminal.

// Criar o objeto que ira fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db") // o new criamos o objeto, se chama constructor.

// No terminal rodamos node src/database/db.js para criar p aquivo database.db

// Utilizar a objeto de banco de dados para nossas operações
// db.serialize( () => {
//     //Com comandos SQL eu vou:
// 1 Criar uma tabela
// db.run( ` 
//     CREATE TABLE IF NOT EXISTS places (
//         id  INTEGER PRIMARY KEY AUTOINCREMENT,
//         image TEXT,
//         name TEXT,
//         address TEXT,
//         address2 TEXT,
//         state TEXT,
//         city TEXT,
//         items TEXT
//     );
// ` )

// // 2 Inserir dados na tabela 
// const query = `
//         INSERT INTO places (
//             image,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES (?,?,?,?,?,?,?);
// `
// const values = [
//     "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHJlY3ljbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
//     "Colectoria Grama",
//     "Avenida Juiz de Fora",
//     "Nº 600",
//     "Minas Gerais",
//     "Juiz de Fora",
//     "Resíduos Eletrónicos, Lâmpadas"
// ]

// function afterInsertData(err){
//     if(err){
//         return console.log(err)
//     }
//     console.log("Cadastro com Sucesso")
//     console.log(this)
// }
// db.run(query, values, afterInsertData)

//     // 3 Consultar dados da tabela
db.all(`SELECT * FROM   places`, function(err, rows){
    if(err){
        return console.log(err)
    }
        console.log("Aqui estão seus resgistros: ")
        console.log(rows)
})

//     // 4 Deletar dados da tabela
//     db.run(`DELETE FROM places WHERE id = ?`, [6], function(err){
//         if(err){
//             console.log(err)
//         }
//         console.log("Registros deletados com sucesso!")
//     })



// } )

// Exportar o banco de dados
module.exports = db
