const express = require("express");
const app = express();
app.set('view engine', 'ejs');//dizendo ao express para usar o ejs como motor de engine ou template

app.get("/:nome/:lang", function(req, res){
    var nome = req.params.nome;
    var lang = req.params.lang;
    var exibirMsg = false;
    var produtos = [
        {nome: "Coca-cola", preco: 10.00},
        {nome: "Leite", preco: 5.00}
    ]

    res.render("index", {
        nome: nome,
        lang: lang,
        empresa: "Guia do programador",
        msg: exibirMsg,
        produtos: produtos,
    }); //o metódo render irá converter os comandos html e apresentar o desenho da tela para o usuário passando como parâmetro o arquivo da view
});

app.get("/perfil/usuario", function(req, res){
    res.render("principal/perfil");//só será necessário especificar o caminho do arquivo quando este estiver dentro de uma pasta dentro da pasta views
});

app.listen(3000,()=>{
    console.log("servidor rodando");
});