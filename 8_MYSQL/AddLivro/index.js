import express from "express" 
import exphbs from "express-handlebars"
import db from './db/conn.js'

// Importa as bibliotecas necessárias: express para criar o servidor, express-handlebars para usar templates handlebars, e a conexão com o banco de dados.

const app = express()
// Cria uma instância do servidor Express.

app.use(express.json())
// Configura o servidor para interpretar requisições com conteúdo JSON.

app.engine('handlebars', exphbs.engine());
// Configura o motor de template Handlebars.

app.set('view engine', 'handlebars');
// Define o Handlebars como o motor de visualização padrão.

app.set('views', './views');
// Define o diretório onde estão os arquivos de visualização.

app.use(express.static('public'))
// Configura o diretório 'public' para servir arquivos estáticos como CSS, JS e imagens.

app.use(express.urlencoded({extended: true}))
// Configura o servidor para interpretar dados de formulários enviados via POST.

app.get("/books", (req, res)=> {
    const sql = 'SELECT * FROM books2'
    // Define a rota '/books' para listar todos os livros. A consulta SQL seleciona todos os registros da tabela 'books2'.

    db.query(sql, (err, data)=> {
        if(err){
            console.log(`Erro ao regastar: ${err}`)
            return
        }
        const books = data
        res.render("books", {books})
        // Executa a consulta no banco de dados e renderiza a view 'books', passando os dados dos livros para o template.
    })
})

app.get("/", (req, res) => {
    res.render("home")
    // Define a rota raiz '/' para renderizar a view 'home'.
})

app.get("/book/:id", (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM books2 WHERE id = ${id}`
    // Define a rota '/book/:id' para exibir os detalhes de um livro específico. A consulta SQL seleciona o livro com o ID correspondente.

    db.query(sql, (err, data) => {
        if(err){
            console.log(`Erro ao regastar: ${err}`)
            return
        }
        const book = data[0]
        res.render("book", {book})
        // Executa a consulta e renderiza a view 'book', passando os dados do livro específico para o template.
    })
})

app.get("/book/edit/:id", (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM books2 WHERE id = ${id}`
    // Define a rota '/book/edit/:id' para editar um livro específico. A consulta SQL seleciona o livro com o ID correspondente.

    db.query(sql, (err, data) => {
        if(err){
            console.log(`Erro ao regastar: ${err}`)
            return
        }
        const book = data[0]
        res.render("editbook", {book})
        // Executa a consulta e renderiza a view 'editbook', passando os dados do livro específico para o template.
    })
})

app.post("/books/updatebook", (req, res)=> {
    const id = req.body.id
    const title = req.body.title
    const page = req.body.page
    const dc = req.body.dc
    // Captura os dados enviados pelo formulário para atualizar o livro.

    const sql = `UPDATE books2 SET title='${title}', page='${page}', dc='${dc}' WHERE id = ${id}`
    // Monta a consulta SQL para atualizar o livro com o ID correspondente no banco de dados.

    db.query(sql, (err)=> {
        if(err){
            console.log(`Erro ao atualizar: ${err}`)
            return
        }

        res.redirect("/books")
        // Executa a consulta e, em caso de sucesso, redireciona o usuário para a página de listagem de livros.
    })
})

app.post("/books/insertbook", (req, res)=> {
    const title = req.body.title 
    const page = req.body.page 
    const dc = req.body.dc
    // Captura os dados enviados pelo formulário para inserir um novo livro.

    const sql = `INSERT INTO books2 (title,page,dc) VALUES ('${title}','${page}','${dc}')`
    // Monta a consulta SQL para inserir um novo livro na tabela 'books2'.

    db.query(sql, (err)=> {
        if(err){
            console.log(`Erro ao cadastrar: ${err}`)
            return
        }
        res.redirect("/books")
        // Executa a consulta e, em caso de sucesso, redireciona o usuário para a página de listagem de livros.
    })
})

app.post("/book/remove/:id", (req, res)=> {
    const id = req.params.id
    // Captura o ID do livro a ser removido, passado como parâmetro na URL.

    const sql = `DELETE FROM books2 WHERE id = ${id}`
    // Monta a consulta SQL para deletar o livro com o ID correspondente.

    db.query(sql, (err)=> {
        if(err){
            console.log(`Erro ao deletar: ${err}`)
            return
        }
        res.redirect("/books")
        // Executa a consulta e, em caso de sucesso, redireciona o usuário para a página de listagem de livros.
    })
})

db.connect((err)=> {
    if(err){
        console.log("Error:" + err)
        return
    }
    
    console.log("Banco de dados on")
    app.listen(3000)
    // Conecta ao banco de dados e, em caso de sucesso, inicia o servidor na porta 3000.
})
