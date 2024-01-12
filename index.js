const express = require("express");
const app = express();
app.set('view engine', 'ejs');//dizendo ao express para usar o ejs como motor de engine ou template
app.use(express.static('public'));//dizendo ao express para usar arquivos estáticos na pasta public

app.get("/", (req, res)=>{
    res.render("index");
}); //o metódo render irá converter os comandos html e apresentar o desenho da tela para o usuário passando como parâmetro o arquivo da view

app.get("/perguntar", (req, res)=>{
    res.render("perguntar");
});

app.post("/salvarPergunta", (req, res)=>{ //passando a rota do tipo post
    res.send("Formulario enviado com sucesso");
});

app.listen(3000,()=>{
    console.log("servidor rodando");
});