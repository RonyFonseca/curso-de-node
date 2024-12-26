import express from 'express';
import { engine } from 'express-handlebars';

const app = express();

app.use(express.static("public"))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


app.get('/', (req, res) => {
    const auth = true
    res.render('home', {auth});
});

app.get('/contact', (req, res)=> {
    res.render('contact')
})

app.listen(3000, () => {
    console.log('Servidor está rodando na porta 3000');
});