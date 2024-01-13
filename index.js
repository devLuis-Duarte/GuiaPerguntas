const express = require("express");
const app = express();
const bodyParser = require("body-parser");//incluindo o modeulo bodyparser que traduz os dados enviados pelo usuário em comandos javascript e permite a utilização destes dentro do projeto

app.set('view engine', 'ejs');//dizendo ao express para usar o ejs como motor de engine ou template
app.use(express.static('public'));//dizendo ao express para usar arquivos estáticos na pasta public

app.use(bodyParser.urlencoded({extended: false}));//decodifica os dados enviados pelo formulário em comandos javascript
//app.use(bodyParser.json);//permite a leitura de dados de formulário via json, bem usado para API

app.get("/", (req, res)=>{
    res.render("index");
}); //o metódo render irá converter os comandos html e apresentar o desenho da tela para o usuário passando como parâmetro o arquivo da view

//Rotas
app.get("/perguntar", (req, res)=>{
    res.render("perguntar");
});

app.post("/salvarPergunta", (req, res)=>{ //passando a rota do tipo post
    var titulo = req.body.titulo;//acessando o titulo pelo objeto 'body' do modulo body-parser
    var descricao = req.body.descricao;//acessando a descrição pelo objeto 'body' do modulo body-parser
    res.send("Formulario enviado com sucesso" + " " + `Titulo: ${titulo} e descricao: ${descricao}`);
});

app.listen(3000,()=>{
    console.log("servidor rodando");
});