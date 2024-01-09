const express = require("express");
const app = express();
app.set('view engine', 'ejs');//dizendo ao express para usar o ejs como motor de engine ou template
app.use(express.static('public'));//dizendo ao express para usar arquivos estáticos na pasta public

app.get("/", function(req, res){
    res.render("index");
}); //o metódo render irá converter os comandos html e apresentar o desenho da tela para o usuário passando como parâmetro o arquivo da view

app.get("/perfil/usuario", function(req, res){
    res.render("principal/perfil");//só será necessário especificar o caminho do arquivo quando este estiver dentro de uma pasta dentro da pasta views
});

app.listen(3000,()=>{
    console.log("servidor rodando");
});